var index = 0;
var compact = 0;
var actNdCent = 0;
let dragNode;
let dropNode;
let dragEnabled = false;
let dragStartX;
let dragStartY;
let isDragStarting = false;
let reorganizeEnabled = false;

let undoActions = [];
let redoActions = [];


// This toggles the collabsible sections of the sidebar
function openSection(sectionId) {
  const sections = document.querySelectorAll('.flex-col.items-center.mt-2');
  sections.forEach(section => {
    if (section.id !== sectionId && !section.classList.contains('hidden')) {
      alert(`The current section "${section.id}" has to be closed first.`);
      return;
    }
  });
  document.getElementById(sectionId).classList.toggle('hidden');
}

function closeSection(sectionId) {
  document.getElementById(sectionId).classList.add('hidden');
}

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
  var reportElements = document.querySelectorAll('.nodeButtons');
  reportElements.forEach(function (element) {
      if (element.style.display !== 'none') {
          element.style.display = 'none';
      } else {
          element.style.display = 'block';
      }
  });
  chart.fit();

  setTimeout(function() {
      chart.exportSvg();
  }, 2000); // 2000 milliseconds = 2 seconds

}

function exportPNG() {
  var reportElements = document.querySelectorAll('.nodeButtons');
  reportElements.forEach(function (element) {
      if (element.style.display !== 'none') {
          element.style.display = 'none';
      } else {
          element.style.display = 'block';
      }
  });
  chart.exportImg({full:true})
}

function removeSelected() {
    for ( id in currentlySelected) {
      chart.removeNode(currentlySelected[id])
    }

    currentlySelected = []
}


function UpdateInfo (closeBtn) {
  var fname = document.getElementById('edit_first_name').value;
  var lname = document.getElementById('edit_last_name').value;
  var new_position = document.getElementById('edit_position').value;
  console.log(fname, lname, new_position)
  console.log(currentlySelected)
  console.log(chart.data())

  let currentData = chart.data();

  const nodeIdToUpdate = currentlySelected[0];
  const nodeIndex = currentData.findIndex(node => node.id === nodeIdToUpdate);

  // Update the node properties
  if (nodeIndex !== -1) {
    currentData[nodeIndex].name = fname; // update properties as needed
    currentData[nodeIndex].position = new_position;
  }

  // Set the updated data back to the chart
  chart.data(currentData);

  // Update the nodes state to reflect changes
  chart.updateNodesState();
}
