names = [];

fetch("/names")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((namesArr) => {
        names = namesArr;
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

function highlightNode(name) {
    const nodeId = chart.data().find((n) => n.name === name).id;
    chart.setUpToTheRootHighlighted(nodeId).render();
}

function searchNames() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (searchInput.length > 0) {
        const filteredNames = names.filter((name) =>
            name.toLowerCase().includes(searchInput)
        );

        if (filteredNames.length > 0) {
            resultsDiv.classList.remove("hidden");
            filteredNames.forEach((name) => {
                const resultItem = document.createElement("div");
                resultItem.textContent = name;
                resultItem.className = "result-item p-2 hover:bg-base-200 cursor-pointer";
                resultItem.onclick = () => {
                    highlightNode(name);
                    document.getElementById("searchInput").value = "";
                    resultsDiv.classList.add("hidden");
                };
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.classList.add("hidden");
        }
    } else {
        resultsDiv.classList.add("hidden");
    }
}
