import AppLayout from "./components/AppLayout";
import { useState, useCallback } from "react";
import useTheme from "./components/useTheme";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from '@dagrejs/dagre';
import peopleData from "./data/people.json"
import TextUpdaterNode from "./components/TextNode";
import EmployeeNode from "./components/EmpNode";


const nodeTypes = { textUpdater: TextUpdaterNode, employee: EmployeeNode };
const initialNodes = peopleData;
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];


export default function App() {
  const [theme] = useTheme();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  return (
    <AppLayout>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode={theme}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </AppLayout>
  );
}
