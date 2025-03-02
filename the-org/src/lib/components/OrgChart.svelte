<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import data from '../../routes/data/org-data.json';
	import { setChartInstance, currentlySelected } from './org-chart-functions';

	let OrgChart;
	let chartContainer;

	onMount(async () => {
		const module = await import('d3-org-chart');
		OrgChart = module.OrgChart;

		const chart = new OrgChart()
			.container(chartContainer)
			.data(data)
			.svgHeight(window.innerHeight - 10)
			.nodeHeight((d) => 100 + 25)
			.nodeWidth((d) => 220 + 2)
			.childrenMargin((d) => 50)
			.compactMarginBetween((d) => 35)
			.compactMarginPair((d) => 30)
			.neighbourMargin((a, b) => 20)
			.siblingsMargin((d) => 100)
			.initialZoom(0.7)
			.nodeContent(function (d, i, arr, state) {
				const color = '#FFFFFF';
				const imageDiffVert = 25 + 2;
				return `
              <div style='width:${
								d.width
							}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                      <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396"' : '1px solid #E4E2E9"'} >
                          <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
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
                          <div class="node-salaries hidden" style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${new Intl.NumberFormat(
														'en-US',
														{ style: 'currency', currency: 'USD' }
													).format(d.data.salary)} </div>
						   <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
								<div style="position: absolute; bottom: 10px; left: 15px;" class="node-direct-reports">Directs: ${d.data._directSubordinates} </div>  
								<div style="position: absolute; bottom: 10px; right: 15px;" class="node-total-reports">Total: ${d.data._totalSubordinates} </div>
						    </div>

                      </div>
                  </div>
                          `;
			})
			.nodeUpdate(function () {
				// Needed to disable default highlight behavior
				d3.select(this).select('.node-rect').attr('stroke', 'none');
			})
			//  .linkUpdate(function (d, i, arr) {
			//   d3.select(this)
			//     .attr('stroke', (d) =>
			//       d.data._upToTheRootHighlighted ? '#E27396' : '#000000'
			//     )
			//     .attr('stroke-width', (d) =>
			//       d.data._upToTheRootHighlighted ? 5 : 3
			//     );

			//   if (d.data._upToTheRootHighlighted) {
			//     d3.select(this).raise();
			//   }
			// })
			.onNodeClick(function (d) {
				d.data._highlighted = !d.data._highlighted;
				chart.updateNodesState();
				if (d.data._highlighted === true) {
					if (!currentlySelected.map((item) => item.id).includes(d.id)) {
						currentlySelected.push(d);
						chart.setHighlighted(d.id).render();
					}
				} else {
					const index = currentlySelected.findIndex((item) => item.id === d.id);
					if (index > -1) {
						currentlySelected.splice(index, 1);
					}
				}
				console.log(currentlySelected);
			})

			.render();

		setChartInstance(chart);
	});
</script>

<div
	bind:this={chartContainer}
	class="chart-container h-full w-full bg-gray-100 dark:bg-gray-700"
></div>
