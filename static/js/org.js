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
        return `<div class="nodeButtons" style="color:#000000;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#D3D3D3;border: 1px solid #000000;position:absolute;bottom:5px;left:50%;transform:translateX(-50%);"> <span style="font-size:9px">${
          node.children
            ? `<i class="bx bx-chevron-up icon"></i>`
            : `<i class="bx bx-chevron-down icon"></i>`
        }</span> ${node.data._directSubordinates}  </div>`;
      })
      .nodeContent(function (d, i, arr, state) {
        const color = '#FFFFFF';
        return `
            <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height - 50}px;border-radius:10px;border: 1px solid #E4E2E9;position:relative;">
                <div style="background-color:${color};position:absolute;margin-top:-20px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
                <img src="${d.data.image}" style="position:absolute;margin-top:-15px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
                
                <div style="color:#08011E;position:absolute;right:20px;top:10px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>

                <div style="font-size:14px;color:#08011E;margin-left:20px;margin-top:30px">${d.data.name}</div>
                <div style="color:#716E7B;margin-left:20px;margin-top:2px;font-size:12px;">${d.data.position}</div>
                <div style="color:#716E7B;margin-left:20px;margin-top:2px;font-size:12px;">${d.data.salary}</div>
                
                <div style="position:absolute;bottom:25px;left:15px;font-size:14px;" class="node-direct-reports">Directs: ${d.data._directSubordinates}</div>
                <div style="position:absolute;bottom:25px;right:15px;font-size:14px;" class="node-total-reports">Total: ${d.data._totalSubordinates}</div>
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