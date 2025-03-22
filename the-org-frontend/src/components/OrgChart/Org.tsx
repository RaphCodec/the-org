import * as React from 'react';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';
import jsPDF from 'jspdf';
import useSelectedStore from '../../stores/selectedStore';

const Org = React.forwardRef((props, ref) => {
  const chartRef = React.useRef(null);
  const { items, addItem, removeItem } = useSelectedStore();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/data');
      const data = await response.json();

      let index = 0;
      let compact = 0;

      const chart = new OrgChart()
        .container('.chart-container')
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
          const color = '#FFFFFF';
          const imageDiffVert = 25 + 2;
          return `
            <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
              <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #0000FF"' : '1px solid #E4E2E9"'} >
                <div style="color:#08011E; display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${d.data.id}</div>
                <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                <div style="margin-top:${-imageDiffVert - 20}px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${d.data.name} </div>
                <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.position} </div>
                <div class="node-salaries hidden" style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d.data.salary)} </div>
                <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                  <div style="color:#08011E; position: absolute; bottom: 10px; left: 15px;" class="node-direct-reports">Directs: ${d.data._directSubordinates} </div>  
                  <div style="color:#08011E; position: absolute; bottom: 10px; right: 15px;" class="node-total-reports">Total: ${d.data._totalSubordinates} </div>
                </div>
              </div>
            </div>
          `;
        })
        .nodeUpdate(function () {
          // Needed to disable default highlight behavior
          d3.select(this).select('.node-rect').attr('stroke', 'none');
        })
        .onNodeClick(function (d) {
          d.data._highlighted = !d.data._highlighted;
          chart.updateNodesState();
          if (d.data._highlighted === true) {
            if (!items.includes(d.id)) {
              addItem(d.id);
            }
          } else {
            removeItem(d.id);
          }
        })
        .render();

      chart.render();
      chartRef.current = chart;

      const filterChart = (e) => {
        const value = e.target.value;
        chartRef.current.clearHighlighting();
        const data = chartRef.current.data();
        data.forEach((d) => (d._expanded = false));
        data.forEach((d) => {
          if (value !== '' && d.name.toLowerCase().includes(value.toLowerCase())) {
            d._highlighted = true;
            d._expanded = true;
          }
        });
        chartRef.current.data(data).render().fit();
      };

      if (ref) {
        ref.current = {
          fit: () => chart.fit(),
          rotate: () => chart.layout(['right', 'bottom', 'left', 'top'][index++ % 4])
                              .render()
                              .fit(),
          compact: () => chart.compact(!!(compact++ % 2))
                              .render()
                              .fit(),
          zoomIn: () => chart.zoomIn(),
          zoomOut: () => chart.zoomOut(),
          removeSelected: () => {
            const selectedItems = useSelectedStore.getState().items;
            console.log('Removing selected items:', selectedItems);
            selectedItems.forEach(id => chart.removeNode(id));
            useSelectedStore.getState().clearItems();
          },
          exportSvg: () => {
            const reportElements = document.querySelectorAll('.nodeButtons');
            reportElements.forEach((element) => {
              element.style.display = 'none';
            });
            chart.fit();
            setTimeout(() => {
              chart.exportSvg();
              reportElements.forEach((element) => {
                element.style.display = 'block';
              });
            }, 2000);
          },
          exportPNG: () => {
            const reportElements = document.querySelectorAll('.nodeButtons');
            reportElements.forEach((element) => {
              element.style.display = 'none';
            });
            chart.fit();
            setTimeout(() => {
              chart.exportImg({ full: true });
              reportElements.forEach((element) => {
                element.style.display = 'block';
              });
            }, 2000);
          },
          exportPDF: () => {
            chart.exportImg({
              save: false,
              onLoad: (base64) => {
                var pdf = new jsPDF('landscape', 'pt', 'a4');
                var img = new Image();
                img.src = base64;
                img.onload = function () {
                  const margin = 18; // .25 inch margin in points
                  const pageWidth = pdf.internal.pageSize.getWidth();
                  const pageHeight = pdf.internal.pageSize.getHeight();
                  const imgWidth = pageWidth - 2 * margin;
                  const imgHeight = (img.height / img.width) * imgWidth;
                  const x = (pageWidth - imgWidth) / 2;
                  const y = (pageHeight - imgHeight) / 2;

                  pdf.addImage(
                    img,
                    "JPEG",
                    x,
                    y,
                    imgWidth,
                    imgHeight
                  );
                  pdf.save("chart.pdf");
                };
              },
            });
          },
          clearHighlights: () => {
            chart.clearHighlighting();
            useSelectedStore.getState().clearItems();
          },
          exportNodeData: () => {
            const data = chart.data();
            const nodeData = data.map(node => {
              return {
                id: node.id,
                parentId: node.parentId,
                name: node.name,
                position: node.position,
                salary: node.salary,
                image: node.image
              };
            });

            const blob = new Blob([JSON.stringify(nodeData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            a.click();
            URL.revokeObjectURL(url);
          },
          filterChart,
        };
      }
    };

    fetchData();
  }, [ref, addItem, removeItem]);

  React.useEffect(() => {
    console.log(items);
    if (chartRef.current) {
      chartRef.current.setHighlighted(items).render();
    }
  }, [items]);

  return (
    <div
      className="chart-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
});

export default Org;