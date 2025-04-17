function getSubHierarchy() {
    if (currentlySelected.length != 1) {
        errorAlert("Error! Please select only one Node to show sub-hierarchy for.");
        return;
    }

    const node = currentlySelected[0]

    nodeChildren = chart.getNodeChildren(node, []);

    console.log(nodeChildren);
    console.log(node);

    const filteredNodeChildren = nodeChildren.map((child) => {
        return {
            id: child.id,
            parentId: child.parentId,
            image: child.image,
            salary: child.salary,
            name: child.name,
            position: child.position,
        };
    });

    // console.log(filteredNodeChildren);
    filteredNodeChildren[0].parentId = null;

    chart.data(filteredNodeChildren).render();

}

function getLineage() {
    if (currentlySelected.length != 1) {
        errorAlert("Error! Please select only one Node to show lineage for.");
        return;
    }

    const nodeId = currentlySelected[0].id;

    const attrs = chart.getChartState();
    const root = attrs.generateRoot(attrs.data);
    const descendants = root.descendants();
    const node = descendants.filter(d => attrs.nodeId(d.data).toString() === nodeId.toString())[0];
    if (!node) {
        console.log(`ORG CHART - HIGHLIGHTROOT - Node with id (${nodeId}) not found in the tree`);
        return;
    }
    const ancestors = node.ancestors().map((ancestor) => {
        return {
            id: ancestor.data.id,
            parentId: ancestor.data.parentId,
            image: ancestor.data.image,
            salary: ancestor.data.salary,
            name: ancestor.data.name,
            position: ancestor.data.position,
        };
    });

    const nodeDescendants = node.descendants().map((descendant) => {
        return {
            id: descendant.data.id,
            parentId: descendant.data.parentId,
            image: descendant.data.image,
            salary: descendant.data.salary,
            name: descendant.data.name,
            position: descendant.data.position,
        };
    });

    const combined = [...ancestors, ...nodeDescendants];

    const lineage = Array.from(
        new Map(combined.map(item => [item.id, item])).values()
    );

    chart.data(lineage).render();
    return;
}
