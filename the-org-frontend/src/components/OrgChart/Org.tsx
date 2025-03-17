import * as React from 'react';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

const Org = () => {
  React.useEffect(() => {
    const data = [
      { id: 1, name: 'CEO', parentId: null },
      { id: 2, name: 'CTO', parentId: 1 },
      { id: 3, name: 'CFO', parentId: 1 },
      { id: 4, name: 'Engineer', parentId: 2 },
      { id: 5, name: 'Accountant', parentId: 3 },
    ];

    const chart = new OrgChart()
      .container('.chart-container')
      .data(data)
      .nodeWidth((d) => 200)
      .nodeHeight((d) => 100)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .nodeContent((d) => `
        <div style="padding: 10px; border-radius: 5px; background-color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          <div style="font-size: 16px; font-weight: bold;">${d.data.name}</div>
        </div>
      `);

    chart.render();
  }, []);

  return (
    <div
      className="chart-container"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    ></div>
  );
};

export default Org;