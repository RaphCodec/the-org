function fitChart() {
    chart.fit();
}
function rotateChart() {
	chart
		.layout(['right', 'bottom', 'left', 'top'][index++ % 4])
		.render()
		.fit();
}

function compactChart() {
	chart
		.compact(!!(compact++ % 2))
		.render()
		.fit();
}

function zoomInChart() {
	chart.zoomIn();
}

function zoomOutChart() {
	chart.zoomOut();
}

function clearHighlights() {
	chart.clearHighlighting();
	currentlySelected = [];
}

function filterChart(e) {
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