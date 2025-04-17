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
	const salaries = document.querySelectorAll('.node-salaries');
	salaries.forEach((salary) => {
		salary.classList.toggle('hidden');
	});
}

function toggleReports() {
	const directReports = document.querySelectorAll('.node-direct-reports');
	const totalReports = document.querySelectorAll('.node-total-reports');
	directReports.forEach((report) => {
		report.classList.toggle('hidden');
	});
	totalReports.forEach((report) => {
		report.classList.toggle('hidden');
	});
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
