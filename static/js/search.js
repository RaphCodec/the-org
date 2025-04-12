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
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();

    if (searchValue.length > 0) {
        const filteredNames = names.filter((name) =>
            name.toLowerCase().includes(searchValue)
        );

        if (filteredNames.length > 0) {
            resultsDiv.classList.remove("hidden");
            filteredNames.forEach((name, index) => {
                const resultItem = document.createElement("div");
                resultItem.textContent = name;
                resultItem.className = "result-item p-2 hover:bg-base-200 cursor-pointer";
                resultItem.onclick = () => {
                    highlightNode(name);
                    searchInput.value = "";
                    resultsDiv.classList.add("hidden");
                };
                resultsDiv.appendChild(resultItem);

                if (index === 0) {
                    resultItem.setAttribute("data-first", "true");
                }
            });
        } else {
            resultsDiv.classList.add("hidden");
        }
    } else {
        resultsDiv.classList.add("hidden");
    }

    searchInput.onkeydown = (event) => {
        if (event.key === "Enter") {
            const firstResult = resultsDiv.querySelector('[data-first="true"]');
            if (firstResult) {
                firstResult.click();
            }
        }
    };
}
