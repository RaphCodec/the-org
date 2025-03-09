import jsPDF from 'jspdf';

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

export function exportPDF() {
    chart.exportImg({
        save: false,
        onLoad: (base64) => {
            var pdf = new jsPDF('landscape', 'pt', 'a4');
            var img = new Image();
            img.src = base64;
            img.onload = function () {
                const margin = 18; // .25 inch margin in points
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (img.height / img.width) * imgWidth;
                const x = (pageWidth - imgWidth) / 2;
                const y = (pageHeight - imgHeight) / 2;

                pdf.addImage(
                    img,
                    "JPEG",
                    x,
                    y,
                    imgWidth,
                    imgHeight
                );
                pdf.save("chart.pdf");
            };
        },
    });
}

export function removeSelected() {
    if (!chart) {
        console.error('Chart instance is not set');
        return;
    }

	recordAction('Remove Node(s)')

    for (let item of currentlySelected) {
        chart.removeNode(item.id);
    }
    currentlySelected = [];
}

export function addToSelected(relation = 'child') {
    if (!chart) {
        console.error('Chart instance is not set');
        return;
    }

	recordAction('Add Node(s)')

    // new person values
    const newPerson = {
        id: 'temp' + new_node_counter++,
        name: 'John Doe',
        position: 'Job Title',
        salary: 0,
        image: 'https://robohash.org/robot?bgset=bg2',
        parentId: undefined as string | undefined
    };

    let currentData = getCurrentChartData();

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

function recordAction(action, undo= true) {
	const data = flattenHierarchy(getCurrentChartData());
	if (undo && action === 'Add Node(s)') {
		data.pop(); // TODO: this is a workaround to remove the last added node becuase otherwise it is saved and won't undo
		undoActions.push({ action, data });
		console.log('undoActions', undoActions);
	} else if (undo) {
		undoActions.push({ action, data });
		console.log('undoActions', undoActions);
	} else {
		redoActions.push({ action, data });
	}
}

export function undo() {
	const lastAction = undoActions.pop();
	recordAction(lastAction.action, false);
	chart.data(lastAction.data).render();
	clearHighlights(); // this prevents an selection error when the chart data is resotred
}

export function redo() {
	const lastAction = redoActions.pop();
	recordAction(lastAction.action);
	chart.data(lastAction.data).render();
	clearHighlights(); // this prevents an selection error when the chart data is resotred
}


export function displayLineage() {
	if (!chart) {
		console.error('Chart instance is not set');
		return;
	}
	const nodeId = currentlySelected[0].id;
    const attrs = chart.getChartState();

    const targetNode = attrs.allNodes.find(({ data }) => attrs.nodeId(data) === nodeId);
    if (!targetNode) {
        console.log(`Node with ID ${nodeId} not found.`);
        return null;
    }

    const descendants = chart.getNodeChildren(targetNode, []);

    let parent = targetNode.parent;
    const parentLineage = [];

    while (parent) {
        const nodeCopy = { ...parent };
        nodeCopy.children = [parentLineage.length > 0 ? parentLineage[parentLineage.length - 1] : targetNode];
        parentLineage.push(nodeCopy);
        parent = parent.parent;
    }


	const lineage = [...parentLineage, ...descendants];

	// render a flattened hierachy
	// trying to render the hierachy causes node id errors
	chart.data(flattenHierarchy(lineage)).render().fit();
}


function flattenHierarchy(nodes) {
	const flatData = [];
	const seenIds = new Set();

	function traverse(node, parentId = null) {
		const nodeId = node.data ? node.data.id : node.id;
		
		// skip node ids that have already been processed
		// this takes care of the duplicate target nodes caused by combining parent lineage with descendants
		if (seenIds.has(nodeId)) return;
		
		seenIds.add(nodeId);
		const nodeData = {
			id: nodeId,
			parentId: parentId || (node.data ? node.data.parentId : node.parentId),
			name: node.data ? node.data.name : node.name,
			position: node.data ? node.data.position : node.position,
			salary: node.data ? node.data.salary : node.salary,
			image: node.data ? node.data.image : node.image
		};
		flatData.push(nodeData);

		const children = node.children || (Array.isArray(node) ? node : []);
		if (children.length > 0) {
			children.forEach(child => traverse(child, nodeData.id));
		}
	}

	if (Array.isArray(nodes)) {
		nodes.forEach(node => traverse(node));
	} else {
		traverse(nodes);
	}
	
	return flatData;
}

export function exportNodeData () {
	const data = chart.data();
	const nodeData = data.map(node => {
		return {
			id: node.id,
			parentId: node.parentId,
			name: node.name,
			position: node.position,
			salary: node.salary,
			image: node.image
		};
	});

	const blob = new Blob([JSON.stringify(nodeData, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'chart-data.json';
	a.click();
	URL.revokeObjectURL(url);
}