function exportSVG() {
	setTimeout(function () {
		chart.exportSvg();
	}, 2000);
}

function exportPNG() {
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