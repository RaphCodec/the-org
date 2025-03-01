let index = 0;
let compact = 0;
let actNdCent = 0;
let dragNode;
let dropNode;
let dragEnabled = false;
let dragStartX;
let dragStartY;
let isDragStarting = false;
let reorganizeEnabled = false;
let new_node_counter = 0;

let undoActions = [];
let redoActions = [];


function filterChart(e) {
  // Get input value
  const value = e.srcElement.value;

  // Clear previous higlighting
  chart.clearHighlighting();

  // Get chart nodes
  const data = chart.data();

  // Mark all previously expanded nodes for collapse
  data.forEach((d) => (d._expanded = false));

  // Loop over data and check if input value matches any name
  data.forEach((d) => {
    if (value != "" && d.name.toLowerCase().includes(value.toLowerCase())) {
      // If matches, mark node as highlighted
      d._highlighted = true;
      d._expanded = true;
    }
  });

  // Update data and rerender graph
  chart.data(data).render().fit();

  console.log("filtering chart", e.srcElement.value);
}

function expandAll() {
  const data = chart.data();
  data.forEach((d) => (d._expanded = true));
  chart.data(data).render().fit();
}

function collapseAll() {
  const data = chart.data();
  data.forEach((d) => (d._expanded = false));
  chart.data(data).render().fit();
}

function fitChart() {
  chart.fit();
}

function rotateChart() {
  chart
    .layout(["right", "bottom", "left", "top"][index++ % 4])
    .render()
    .fit();
}

function compactChart() {
  chart
    .compact(!!(compact++ % 2))
    .render()
    .fit();
}

function ZoomInChart() {
  chart.zoomIn();
}

function ZoomOutChart() {
  chart.zoomOut();
}

function highlightroot() {
  chart.setUpToTheRootHighlighted(currentlySelected.slice(-1)[0]).render().fit()
}

function clearHighlights() {
  chart.clearHighlighting();
  currentlySelected = [];
}

function exportSVG() {
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
  }, 2000); // 2000 milliseconds = 2 seconds

}

function exportPNG() {
  let reportElements = document.querySelectorAll('.nodeButtons');
  reportElements.forEach(function (element) {
    if (element.style.display !== 'none') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  });
  chart.exportImg({ full: true })
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
