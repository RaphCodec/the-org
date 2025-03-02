let chart;
let currentlySelected = [];
let index = 0;
let compact = 0;
let new_node_counter = 0;

let undoActions = [];
let redoActions = [];

export { currentlySelected, undoActions, redoActions };

export function setChartInstance(chartInstance) {
	chart = chartInstance;
}

export function filterChart(e) {
	const value = e.srcElement.value;
	chart.clearHighlighting();
	const data = chart.data();
	data.forEach((d) => (d._expanded = false));
	data.forEach((d) => {
		if (value != '' && d.name.toLowerCase().includes(value.toLowerCase())) {
			d._highlighted = true;
			d._expanded = true;
		}
	});
	chart.data(data).render().fit();
}

export function expandAll() {
	const data = chart.data();
	data.forEach((d) => (d._expanded = true));
	chart.data(data).render().fit();
}

export function collapseAll() {
	const data = chart.data();
	data.forEach((d) => (d._expanded = false));
	chart.data(data).render().fit();
}

export function fitChart() {
	chart.fit();
}

export function rotateChart() {
	chart
		.layout(['right', 'bottom', 'left', 'top'][index++ % 4])
		.render()
		.fit();
}

export function compactChart() {
	chart
		.compact(!!(compact++ % 2))
		.render()
		.fit();
}

export function zoomInChart() {
	chart.zoomIn();
}

export function zoomOutChart() {
	chart.zoomOut();
}

export function clearHighlights() {
	chart.clearHighlighting();
	currentlySelected = [];
}

export function exportSVG() {
	let reportElements = document.querySelectorAll('.nodeButtons');
	reportElements.forEach(function (element) {
		if (element.style.display !== 'none') {
			element.style.display = 'none';
		} else {
			element.style.display = 'block';
		}
	});
	chart.fit();
	setTimeout(function () {
		chart.exportSvg();
	}, 2000);
}

export function exportPNG() {
	let reportElements = document.querySelectorAll('.nodeButtons');
	reportElements.forEach(function (element) {
		if (element.style.display !== 'none') {
			element.style.display = 'none';
		} else {
			element.style.display = 'block';
		}
	});
	chart.exportImg({ full: true });
}

function recordAction(actionType, data) {
	undoActions.push({ actionType, data });
	redoActions = []; // Clear redo actions on new action
}

export function removeSelected() {
    if (!chart) {
        console.error('Chart instance is not set');
        return;
    }

    const removedNodeTrees = [];
    for (let item of currentlySelected) {
        const nodeTree = chart.getNodeChildren(item, []);
        removedNodeTrees.push(nodeTree);
        chart.removeNode(item.id);
    }
    recordAction('removeSelected', removedNodeTrees);
    currentlySelected = [];
}

export function addToSelected(relation = 'child') {
    if (!chart) {
        console.error('Chart instance is not set');
        return;
    }

    // new person values
    const newPerson = {
        id: 'temp' + new_node_counter++,
        name: 'John Doe',
        position: 'Job Title',
        salary: 0,
        image: 'https://robohash.org/robot?bgset=bg2',
        parentId: undefined as string | undefined
    };

    let currentData = chart.data();

    console.log('currentData', currentData);

    let oldParentId;
    if (relation === 'parent') {
        const selectedNode = currentData.find((node) => node.id === currentlySelected[0].id);
        if (selectedNode) {
            oldParentId = selectedNode.parentId;
            selectedNode.parentId = newPerson.id;
            newPerson.parentId = oldParentId;
        }
    } else {
        // set parentId to who is currently selected
        const selectedNode = currentData.find((node) => node.id === currentlySelected[0].id);
        if (selectedNode) {
            oldParentId = selectedNode.parentId;
            newPerson.parentId = selectedNode.id;
        }
    }

    currentData.push(newPerson);

    // update the chart data
    chart.data(currentData);

    // show the changes in the chart
    chart.updateNodesState();

    recordAction('addToSelected', { newPerson, oldParentId });
}

export function updateInfo() {
	let newName = document.getElementById('update-Name').value;
	let newPosition = document.getElementById('update-title').value;
	let newSalary = document.getElementById('update-salary').value;

	let currentData = getCurrentChartData();


	if (currentlySelected.length > 0) {
		const nodeToUpdate = currentData.find((node) => node.id === currentlySelected[0].id);
		if (nodeToUpdate) {
			const oldName = nodeToUpdate.name;
			const oldPosition = nodeToUpdate.position;
			const oldSalary = nodeToUpdate.salary;

			if (newName) nodeToUpdate.name = newName;
			if (newPosition) nodeToUpdate.position = newPosition;
			if (newSalary) nodeToUpdate.salary = Number(newSalary);

			recordAction('updateInfo', {
				id: nodeToUpdate.id,
				oldName,
				oldPosition,
				oldSalary,
				newName,
				newPosition,
				newSalary: Number(newSalary)
			});
		}
	}

	chart.data(currentData);
	chart.updateNodesState();

	clearHighlights();
}

export function toggleSalaries() {
	const salaries = document.querySelectorAll('.node-salaries');
	salaries.forEach((salary) => {
		salary.classList.toggle('hidden');
	});
}

export function toggleReports() {
	const directReports = document.querySelectorAll('.node-direct-reports');
	const totalReports = document.querySelectorAll('.node-total-reports');
	directReports.forEach((report) => {
		report.classList.toggle('hidden');
	});
	totalReports.forEach((report) => {
		report.classList.toggle('hidden');
	});
}

export function getCurrentChartData() {
  if (!chart) {
    console.error('Chart instance is not set');
    return [];
  }
  return chart.data();
}

export function undo() {
    const action = undoActions.pop();
    if (action) {
        switch (action.actionType) {
            case 'removeSelected':
                // Iterate over each node tree and sort nodes by depth to ensure parents are added before children
                action.data.forEach(nodeTree => {
                    const sortedNodes = nodeTree.sort((a, b) => (a.depth || 0) - (b.depth || 0));
                    sortedNodes.forEach(node => {
                        chart.addNode(node);
                    });
                });
                currentlySelected = action.data.map(nodeTree => nodeTree[0]); // Select the root nodes of restored trees
                break;
            case 'addToSelected':
                chart.removeNode(action.data.newPerson.id);
                break;
            case 'updateInfo':
                const nodeToUpdate = chart.data().find(node => node.id === action.data.id);
                if (nodeToUpdate) {
                    nodeToUpdate.name = action.data.oldName;
                    nodeToUpdate.position = action.data.oldPosition;
                    nodeToUpdate.salary = action.data.oldSalary;
                }
                break;
            default:
                break;
        }
        redoActions.push(action);
        chart.render();
    }
}

export function redo() {
	const action = redoActions.pop();
	if (action) {
		switch (action.actionType) {
			case 'removeSelected':
				action.data.forEach(node => chart.removeNode(node.id));
				currentlySelected = [];
				break;
			case 'addToSelected':
				chart.addNode(action.data.newPerson);
				break;
			case 'updateInfo':
				const nodeToUpdate = chart.data().find(node => node.id === action.data.id);
				if (nodeToUpdate) {
					nodeToUpdate.name = action.data.newName;
					nodeToUpdate.position = action.data.newPosition;
					nodeToUpdate.salary = action.data.newSalary;
				}
				break;
			default:
				break;
		}
		undoActions.push(action);
		chart.render();
	}
}


