let chart;
let currentlySelected = [];
let index = 0;
let compact = 0;
let new_node_counter = 0;

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

function highlightroot() {
  chart.setUpToTheRootHighlighted(currentlySelected.slice(-1)[0]).render().fit()
}

function checkSelection() {
  if (currentlySelected.length === 0) {
    alert("Please select a node first");
    return false;
  }
}

function removeSelected() {
  for (id in currentlySelected) {
    chart.removeNode(currentlySelected[id])
  }

  currentlySelected = []
}


function UpdateInfo() {
  let fname = document.getElementById('edit_first_name').value;
  let lname = document.getElementById('edit_last_name').value;
  let new_position = document.getElementById('edit_position').value;

  let currentData = chart.data();

  const nodeIdToUpdate = currentlySelected[0];
  const nodeIndex = currentData.findIndex(node => node.id === nodeIdToUpdate);

  // Update the node properties
  if (nodeIndex !== -1) {
    currentData[nodeIndex].name = fname;
    currentData[nodeIndex].lastName = lname;
    currentData[nodeIndex].position = new_position;
  }

  chart.data(currentData);

  chart.updateNodesState();

}

function addPerson(relation = 'child') {
  let fname = document.getElementById('add_first_name').value;
  let lname = document.getElementById('add_last_name').value;
  let new_position = document.getElementById('add_position').value;

  // Define a new person object
  const newPerson = {
    id: 'temp' + new_node_counter++,
    image: 'https://robohash.org/robot?bgset=bg2',
    name: fname,
    lastName: lname,
    position: new_position
  };

  let currentData = chart.data();

  if (relation === 'parent') {
    // Find the existing node
    const existingNodeIndex = currentData.findIndex(node => node.id === currentlySelected[0]);
    if (existingNodeIndex !== -1) {
      newPerson.parentId = currentData[existingNodeIndex].parentId; // Set the new person's parentId to the parent of the existing node
      currentData[existingNodeIndex].parentId = newPerson.id; // Update the existing node's parentId to the new person's id
    }
  } else {
    // Default to adding a subordinate
    newPerson.parentId = currentlySelected[0];
  }

  currentData.push(newPerson);

  // Set the updated data back to the chart
  chart.data(currentData);

  // Update the nodes state to reflect changes
  chart.updateNodesState();

}