let chart;
let currentlySelected = [];
let index = 0;
let compact = 0;
let new_node_counter = 0;

export { currentlySelected, chart };

export function setChartInstance(chartInstance) {
  chart = chartInstance;
}

export function filterChart(e) {
  const value = e.srcElement.value;
  chart.clearHighlighting();
  const data = chart.data();
  data.forEach((d) => (d._expanded = false));
  data.forEach((d) => {
    if (value != "" && d.name.toLowerCase().includes(value.toLowerCase())) {
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
  chart.layout(["right", "bottom", "left", "top"][index++ % 4]).render().fit();
}

export function compactChart() {
  chart.compact(!!(compact++ % 2)).render().fit();
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

export function removeSelected() {
  if (!chart) {
    console.error('Chart instance is not set');
    return;
  }
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

  // new person values
  const newPerson = {
    id: 'temp' + new_node_counter++,
    name: 'John Doe',
    position: 'Job Title',
    salary: 0,
    image: 'https://robohash.org/robot?bgset=bg2',
    parentId: undefined as string | undefined,
  };

  let currentData = chart.data();

  console.log('currentData', currentData);

  if (relation === 'parent') {
    const selectedNode = currentData.find(node => node.id === currentlySelected[0].id);
    if (selectedNode) {
        let oldParentId = selectedNode.parentId;
        selectedNode.parentId = newPerson.id;
        newPerson.parentId = oldParentId;
    }

  } else {
    // set parentId to who is currently selected
    newPerson.parentId = currentlySelected[0].id;
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

    console.log('newName', newName);
    console.log('newPosition', newPosition);
    console.log('newSalary', newSalary);

    let currentData = chart.data();

    console.log('currentData', currentData);
    console.log();
    if (currentlySelected.length > 0) {
        const nodeToUpdate = currentData.find(node => node.id === currentlySelected[0].id);
        if (nodeToUpdate) {
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