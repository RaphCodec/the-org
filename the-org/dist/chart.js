let chart;

let currentlySelected = []; //stores ID's of clicked nodes

d3.csv(
  'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/data-oracle.csv'
).then((data) => {
  chart = new d3.OrgChart()
    .svgHeight(window.innerHeight - 10)
    .nodeHeight((d) => 85 + 25)
    .nodeWidth((d) => 220 + 2)
    .childrenMargin((d) => 50)
    .compactMarginBetween((d) => 35)
    .compactMarginPair((d) => 30)
    .neighbourMargin((a, b) => 20)
    .siblingsMargin((d) => 100)
    .nodeContent(function (d, i, arr, state) {
      const color = '#FFFFFF';
      const imageDiffVert = 25 + 2;
      return `
              <div style='width:${
                d.width
              }px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                      <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396"' : '1px solid #E4E2E9"'} >
                          <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
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

                      </div>
                  </div>
                          `;
    })
    .nodeEnter(function (node) {
      d3.select(this).call(
        d3
          .drag()
          .filter(function (x, node) {
            return dragEnabled && this.classList.contains('draggable');
          })
          .on('start', function (d, node) {
            onDragStart(this, d, node);
          })
          .on('drag', function (dragEvent, node) {
            onDrag(this, dragEvent);
          })
          .on('end', function (d) {
            onDragEnd(this, d);
          })
      );
    })
    .nodeUpdate(function (d) {
      if (d.id === '102' || d.id === '120' || d.id === '124') {
        d3.select(this).classed('droppable', false);
      } else {
        d3.select(this).classed('droppable', true);
      }

      if (d.id === '101') {
        d3.select(this).classed('draggable', false);
      } else {
        d3.select(this).classed('draggable', true);
      }
    })
    //  .linkUpdate(function (d, i, arr) {
    //   d3.select(this)
    //     .attr('stroke', (d) =>
    //       d.data._upToTheRootHighlighted ? '#E27396' : '#000000'
    //     )
    //     .attr('stroke-width', (d) =>
    //       d.data._upToTheRootHighlighted ? 5 : 3
    //     );

    //   if (d.data._upToTheRootHighlighted) {
    //     d3.select(this).raise();
    //   }
    // })
    .onNodeClick(function (d) {
      d.data._highlighted = !d.data._highlighted;
      chart.updateNodesState();
      if (d.data._highlighted === true) {
        if (!currentlySelected.includes(d.id)) {
          currentlySelected.push(d.id);
          chart.setHighlighted(d.id).render()
        }
      } else {
        const index = currentlySelected.indexOf(d.id);
        if (index > -1) {
          currentlySelected.splice(index, 1);
        }
      }
      console.log(currentlySelected);
    })
    .container('.chart-container')
    .data(data)
    .render();
});