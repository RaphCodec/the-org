nodeCounter = 0;

function removeSelected() {
    for (let nodeid of currentlySelected) {
        chart.removeNode(nodeid);
    }
    currentlySelected = [];
}


function addNewNode() {
    nodeCounter++;
    const newNode = {
        id: `newNode${nodeCounter}`,
        parentId: currentlySelected[0],
        name: `Vacany ${nodeCounter}`,
        position: 'Vacancy',
        image: 'https://robohash.org/robot?bgset=bg2',
        salary: 0,
        _highlighted: false
    };
    chart.addNode(newNode);
    chart.setHighlighted(newNode.id).render();
}