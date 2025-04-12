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