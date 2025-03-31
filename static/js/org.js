var index = 0;
var compact = 0;
var actNdCent = 0;
var chart; //needed for chart to be displayed

names = [] //stores names for search function
var currentlySelected = []; //stores ID's of clicked nodes

fetch('/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    chart = new d3.OrgChart()
      .container('.chart-container') // Ensure the correct container selector
      .data(data)
      .nodeWidth((d) => 275)
      .initialZoom(0.7)
      .nodeHeight((d) => 200)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 25)
      .compactMarginPair((d) => 80)
      .neighbourMargin((a, b) => 25)
      .buttonContent(({ node, state }) => {
        return `<div class="nodeButtons" style="color:#000000;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#D3D3D3;border: 1px solid #000000"> <span style="font-size:9px">${
          node.children
            ? `<i class="bx bx-chevron-up icon"></i>`
            : `<i class="bx bx-chevron-down icon"></i>`
        }</span> ${node.data._directSubordinates}  </div>`;
      })
      .nodeContent(function (d, i, arr, state) {
        var color = "#FFFFFF"
        return `
        <div id="nodes" style="font-family: 'Inter', sans-serif; background-color:${color}; position: absolute; margin-top:-1px; margin-left:-1px; width:${d.width}px; height:${d.height}px; border: 4px solid; border-color: #000000; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
              <div style="color:#08011E; position: absolute; right: 20px; top: 17px; font-size: 10px;"><i class="fas fa-ellipsis-h"></i></div>
              <div style="font-size: 15px; color:#08011E; margin-left: 20px; margin-top: 32px">${d.data.name}</div>
              <div style="color: #716E7B; margin-left: 20px; margin-top: 3px; font-size: 15px;"> ${d.data.position} </div>
              <div style="color: #716E7B; margin-left: 20px; margin-top: 3px; font-size: 13px;"> ${d.data.salary} </div>
          </div>
          <div style="display: flex; justify-content: space-between; padding-left: 15px; padding-right: 15px;">
              <div class="reports" style="display: block; font-size: 15px"> Directs: ${d.data._directSubordinates}</div>
              <div class="reports" style="display: block; font-size: 15px"> Total: ${d.data._totalSubordinates}</div>
          </div>
      </div>
        `;
      })
      .onNodeClick( function(d) {
        d.data._highlighted = !d.data._highlighted;
        chart.updateNodesState();
        if (d.data._highlighted === true) {
          currentlySelected.push(d.id)
        }
        else {
          currentlySelected.pop(d.id)
        }
      })
      .render();
  })