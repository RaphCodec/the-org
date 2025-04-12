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
	}, 2000);
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
	chart.exportImg({ full: true });
}


function exportNodeData () {
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