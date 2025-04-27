let salaryHidden = true; 

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

function toggleSalaries() {
    salaryHidden = !salaryHidden;
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
              new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d.data.salary)
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
}

function getLevels() {
	const attrs = chart.getChartState();
	const root = attrs.generateRoot(attrs.data);
	const levels = new Set(root.descendants().map(node => node.depth));
	return levels
}

function showLevels() {
    const levels = getLevels();
    const levelsList = document.getElementById('levelsList');

    levelsList.innerHTML = `
        <li class="p-4 pb-2 text-xs tracking-wide text-center">Pick a level to expand
		<button class="btn btn-ghost btn-secondary btn-circle btn-sm bg-transparent text-secondary" onclick="hideLevels()"> <i class="bx bx-x"></i></button>
		</li>
    `;

    levels.forEach(level => {
        const listItem = document.createElement('li');
        listItem.className = 'list-row flex flex-col items-center gap-2';

        const link = document.createElement('span');
        link.className = 'text-4xl font-thin opacity-30 tabular-nums hover:opacity-100 hover:text-primary transition cursor-pointer';
        link.textContent = level.toString().padStart(2, '0');
        link.onclick = () => expandLevel(level);

        listItem.appendChild(link);
        levelsList.appendChild(listItem);
    });

    if (levelsList.classList.contains('hidden')) {
        levelsList.classList.remove('hidden');
    }
}

function hideLevels() {
    document.getElementById('levelsList')?.classList.add('hidden');
}

function expandLevel(level, select = true) {
    const { generateRoot, data, allNodes, nodeId } = chart.getChartState();
    const nodes = generateRoot(data).descendants()
        .filter(node => node.depth === level)
        .map(node => node.id);

    if (select) {
        nodes.forEach(id => {
            const node = allNodes.find(({ data }) => nodeId(data) == id);
            if (node) Object.assign(node.data, { _expanded: true, _highlighted: true });
            currentlySelected.push(id);
        });

        chart.updateNodesState();
        hideLevels();
        successAlert("Showing level " + level + " nodes.");
    } else {
        nodes.forEach(id => {
            const node = allNodes.find(({ data }) => nodeId(data) == id);
            if (node) Object.assign(node.data, { _expanded: true });
        });
        chart.updateNodesState();
    }

}
