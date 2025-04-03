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

// function exportPDF() {
//     chart.exportImg({
//         save: false,
//         onLoad: (base64) => {
//             var pdf = new jsPDF('landscape', 'pt', 'a4');
//             var img = new Image();
//             img.src = base64;
//             img.onload = function () {
//                 const margin = 18; // .25 inch margin in points
//                 const pageWidth = pdf.internal.pageSize.getWidth();
//                 const pageHeight = pdf.internal.pageSize.getHeight();
//                 const imgWidth = pageWidth - 2 * margin;
//                 const imgHeight = (img.height / img.width) * imgWidth;
//                 const x = (pageWidth - imgWidth) / 2;
//                 const y = (pageHeight - imgHeight) / 2;

//                 pdf.addImage(
//                     img,
//                     "JPEG",
//                     x,
//                     y,
//                     imgWidth,
//                     imgHeight
//                 );
//                 pdf.save("chart.pdf");
//             };
//         },
//     });
// }


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