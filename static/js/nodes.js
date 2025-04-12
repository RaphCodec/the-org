nodeCounter = 0;

function deselectNodes() {
    chart.clearHighlighting();
    currentlySelected = [];
}

function errorAlert(message = "Error! Please select only one Node.") {
    const error = document.getElementById('errorAlert');
    const body = document.body;

    error.querySelector('span').textContent = message; 
    if (error.classList.contains('hidden')) {
        error.classList.remove('hidden');
        body.style.pointerEvents = 'none'; 
        setTimeout(() => {
            error.classList.add('hidden');
            body.style.pointerEvents = 'auto'; 
        }, 2000); 
    } else {
        error.classList.add('hidden');
        body.style.pointerEvents = 'auto'; 
    }
}

function successAlert(message = "Success! Operation completed successfully.") {
    const successAlert = document.getElementById('successAlert');
    successAlert.querySelector('span').textContent = message;
    if (successAlert.classList.contains('hidden')) {
        successAlert.classList.remove('hidden');
        setTimeout(() => {
            successAlert.classList.add('hidden');
        }, 2000);
    }
}

function warningAlert(message = "Warning! Please check your input.") {
    const warningAlert = document.getElementById('warningAlert');
    warningAlert.querySelector('span').textContent = message;
    if (warningAlert.classList.contains('hidden')) {
        warningAlert.classList.remove('hidden');
        setTimeout(() => {
            warningAlert.classList.add('hidden');
        }, 2000);
    }
}

function removeSelected() {
    if (currentlySelected.length == 0) {
        errorAlert("Error! Please select at least one Node to remove.");
        return;
    }

    const data = chart.data();

    for (let nodeid of currentlySelected) {
        chart.removeNode(nodeid);

        const nodeIndex = data.findIndex((n) => n.id === nodeid);
        if (nodeIndex > -1) {
            const nodeName = data[nodeIndex].name;
            const nameIndex = names.indexOf(nodeName);
            if (nameIndex > -1) {
                names.splice(nameIndex, 1);
            }
        }
    }

    currentlySelected = [];
    successAlert("Node(s) removed from the chart.");
}

function showEdit() {
    if (currentlySelected.length != 1) {
        errorAlert("Error! Please select only one Node to edit.");
        return;
    }
    const formUpdate = document.getElementById('updateForm');
    if (formUpdate.classList.contains('hidden')) {
        formUpdate.classList.remove('hidden');
    } 
}

function formatCurrency(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    if (value) {
        value = parseFloat(value).toFixed(2);
        input.value = `$${Number(value).toLocaleString()}`;
    } else {
        input.value = '';
    }
}

function updateNode() {
    if (currentlySelected.length != 1) {
        errorAlert("Error! Please select only one Node to update.");
        return;
    }

    const formUpdate = document.getElementById('updateForm');
    const nameInput = document.getElementById('nameInput');
    const positionInput = document.getElementById('positionInput');
    const salaryInput = document.getElementById('salaryInput');

    const name = nameInput.value;
    const position = positionInput.value;
    const salary = salaryInput.value; 

    formUpdate.classList.add('hidden');

    let data = chart.data();
    const nodeToUpdate = data.find((node) => node.id === currentlySelected[0]);
    if (nodeToUpdate) {
        const oldName = nodeToUpdate.name;

        if (name) nodeToUpdate.name = name;
        if (position) nodeToUpdate.position = position;
        if (salary) nodeToUpdate.salary = salary; 

        chart.data(data);
        chart.render();

        const nameIndex = names.indexOf(oldName);
        if (nameIndex > -1 && name) {
            names[nameIndex] = name;
        }

        deselectNodes();

        nameInput.value = '';
        positionInput.value = '';
        salaryInput.value = '';

        successAlert("Success! Node information updated.");
    } else {
        errorAlert("Error! Node not found in data.");
    }
}

function addNewNode() {
    if (currentlySelected.length != 1) {
        errorAlert("Error! Please select only one Node to add a new node to.");
        return;
    }
    nodeCounter++;
    const newNode = {
        id: `newNode${nodeCounter}`,
        parentId: currentlySelected[0],
        name: `Vacancy ${nodeCounter}`,
        position: 'Vacancy',
        image: 'https://robohash.org/robot?bgset=bg2',
        salary: '$0.00',
        _highlighted: false
    };

    chart.addNode(newNode).setCentered(newNode.id).render();

    if (!names.includes(newNode.name)) {
        names.push(newNode.name);
    }

    successAlert("Success! New node added.");
}
