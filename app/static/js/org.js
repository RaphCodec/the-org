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
    console.log(data);
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
      /*
       Node content needs to be normal CSS for PNG and SVG 
       exports to work.
       DO NOT CHANGE NODE CONTENT TO TAILWIND CSS
       */
      .nodeContent(function (d, i, arr, state) {
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
                  <div class="node-salaries" style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                    d.data.salary
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
          if (!currentlySelected.map((item) => item).includes(d)) {
            currentlySelected.push(d);
            chart.setHighlighted(d.id).render();
          }
        } else {
          const index = currentlySelected.indexOf(d);
          if (index > -1) {
            currentlySelected.splice(index, 1);
          }
        }
        // console.log(currentlySelected);
      })

      .render();
  });
