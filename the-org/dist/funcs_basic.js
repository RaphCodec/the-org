var index = 0;
var compact = 0;
var actNdCent = 0;

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

function clearHighlights() {
  chart.clearHighlighting();
  currentlySelected = [];
}
