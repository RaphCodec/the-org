var index = 0;
var compact = 0;
var actNdCent = 0;
var chart; //needed for chart to be displayed

var currentlySelected = []; //stores ID's of clicked nodes

fetch("/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    chart = new d3.OrgChart()
      .container(".chart-container")
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
        const imageDiffVert = 27;
        return `
            <div class="w-[${
              d.width
            }px] h-[${d.height}px] pt-[${imageDiffVert - 2}px] px-[1px]">
              <div class="font-inter bg-white -ml-[1px] w-[${
                d.width - 2
              }px] h-[${d.height - imageDiffVert}px] rounded-lg ${d.data._highlighted || d.data._upToTheRootHighlighted ? "border-[5px] border-[#FA3C3C]" : "border border-[#E4E2E9]"}">
            <div class="text-[#08011E] flex justify-end mt-[5px] mr-[8px]">Level: ${
              d.depth
            }</div>
            <div class="bg-white -mt-[${
              imageDiffVert + 20
            }px] ml-[15px] rounded-full w-[50px] h-[50px]"></div>
            <div class="-mt-[${imageDiffVert + 20}px]">
              <img src="${
                d.data.image
              }" class="ml-[20px] rounded-full w-[40px] h-[40px]" />
            </div>
            <div class="text-[15px] text-[#08011E] ml-[20px] mt-[10px]">${
              d.data.name
            }</div>
            <div class="text-[#716E7B] ml-[20px] mt-[3px] text-[10px]">${
              d.data.position
            }</div>
            <div class="node-salaries text-[#716E7B] ml-[20px] mt-[3px] text-[10px] hidden">${
              d.data.salary
            }</div>
            <div class="flex justify-between px-[15px]">
              <div class="node-direct-reports text-[#08011E] absolute bottom-[10px] left-[15px]">Directs: ${
                d.data._directSubordinates
              }</div>
              <div class="node-total-reports text-[#08011E] absolute bottom-[10px] right-[15px]">Total: ${
                d.data._totalSubordinates
              }</div>
            </div>
              </div>
          </div>
        `;
      })
      .nodeUpdate(function (d) {
        // Needed to disable default highlight behavior
        d3.select(this).select(".node-rect").attr("stroke", "none");
        // Needed for drag and drop to work
        d3.select(this).classed("droppable", true);
        d3.select(this).classed("draggable", d.id !== "1");
      })
      .nodeEnter(function (node) {
        d3.select(this).call(
          d3
            .drag()
            .filter(function (x, node) {
              return dragEnabled && this.classList.contains("draggable");
            })
            .on("start", function (d, node) {
              onDragStart(this, d, node);
            })
            .on("drag", function (dragEvent, node) {
              onDrag(this, dragEvent);
            })
            .on("end", function (d) {
              onDragEnd(this, d);
            })
        );
      })
      .onNodeClick(function (d) {
        d.data._highlighted = !d.data._highlighted;
        chart.updateNodesState();
        if (d.data._highlighted === true) {
          if (!currentlySelected.map((item) => item.id).includes(d.id)) {
            currentlySelected.push(d.id);
            chart.setHighlighted(d.id).render();
          }
        } else {
          const index = currentlySelected.indexOf(d.id);
          if (index > -1) {
            currentlySelected.splice(index, 1);
          }
        }
        // console.log(currentlySelected);
      })

      .render();
  });
