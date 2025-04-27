function exportSVG() {
	chart.nodeContent(function (d, i, arr, state) {
		const color = "#FFFFFF";
		const imageDiffVert = 25 + 2;
		return `
			<div style='width:${
		d.width
			}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
			  <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #FA3C3C"' : '1px solid #E4E2E9"'} >
			<div style="color:#08011E;display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
			  d.data.id
			}</div>
			<div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
			<div style="margin-top:${
			  -imageDiffVert - 20
			}px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
			<div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
			  d.data.name
			} </div>
			<div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
			  d.data.position
			} </div>
			<div class="node-salaries ${salaryHidden ? 'hidden' : ''}" style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
			  salaryHidden ? '' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d.data.salary)
			} </div>
			 <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
			<div style="color:#08011E; position: absolute; bottom: 10px; left: 15px;" class="node-direct-reports">Directs: ${
			  d.data._directSubordinates
			} </div>  
			<div style="color:#08011E; position: absolute; bottom: 10px; right: 15px;" class="node-total-reports">Total: ${
			  d.data._totalSubordinates
			} </div>
			  </div>
		  </div>
			`;
	  })
	  .render();

	setTimeout(function () {
		chart.exportSvg();
	}, 2000);
}

function exportPNG() {
	chart.nodeContent(function (d, i, arr, state) {
		const color = "#FFFFFF";
		const imageDiffVert = 25 + 2;
		return `
			<div style='width:${
		d.width
			}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
			  <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #FA3C3C"' : '1px solid #E4E2E9"'} >
			<div style="color:#08011E;display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
			  d.data.id
			}</div>
			<div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
			<div style="margin-top:${
			  -imageDiffVert - 20
			}px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
			<div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
			  d.data.name
			} </div>
			<div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
			  d.data.position
			} </div>
			<div class="node-salaries ${salaryHidden ? 'hidden' : ''}" style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
			  salaryHidden ? '' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d.data.salary)
			} </div>
			 <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
			<div style="color:#08011E; position: absolute; bottom: 10px; left: 15px;" class="node-direct-reports">Directs: ${
			  d.data._directSubordinates
			} </div>  
			<div style="color:#08011E; position: absolute; bottom: 10px; right: 15px;" class="node-total-reports">Total: ${
			  d.data._totalSubordinates
			} </div>
			  </div>
		  </div>
			`;
	  })
	  .render()
	  .exportImg({ full: true });
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