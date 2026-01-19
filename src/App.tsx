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
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import peopleData from "./data/people.json";
import EmployeeNode from "./components/EmpNode";
import ZoomSlider from "./components/ZoomSlider";
import { NodeSearch } from "./components/NodeSearch";

const nodeTypes = { employeeNode: EmployeeNode };
const initialNodes = peopleData;
const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", type: "smoothstep" },
  { id: "n1-n3", source: "n1", target: "n3", type: "smoothstep" },
  { id: "n3-n4", source: "n3", target: "n4", type: "smoothstep" },
  { id: "n3-n5", source: "n3", target: "n5", type: "smoothstep" },
  { id: "n2-n6", source: "n2", target: "n6", type: "smoothstep" },
  { id: "n2-n7", source: "n2", target: "n7", type: "smoothstep" },
  { id: "n2-n8", source: "n2", target: "n8", type: "smoothstep" },
];

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 300;
const nodeHeight = 180;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // determine handle positions based on dagre rankdir
    let sourcePosition = "bottom";
    let targetPosition = "top";

    switch (direction) {
      case "TB": // top -> bottom
        sourcePosition = "bottom";
        targetPosition = "top";
        break;
      case "BT": // bottom -> top
        sourcePosition = "top";
        targetPosition = "bottom";
        break;
      case "LR": // left -> right
        sourcePosition = "right";
        targetPosition = "left";
        break;
      case "RL": // right -> left
        sourcePosition = "left";
        targetPosition = "right";
        break;
      default:
        sourcePosition = "bottom";
        targetPosition = "top";
    }

    const newNode = {
      ...node,
      sourcePosition,
      targetPosition,
      // disable dragging for our custom employee node type by default
      draggable: node.type === "employeeNode" ? false : node.draggable,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export default function App() {
  const [theme] = useTheme();

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  // const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
  //   "horizontal",
  // );

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
          <Panel
            className="flex gap-1 rounded-md bg-base-100 text-base-content p-1"
            position="top-right"
          >
            <NodeSearch />
          </Panel>
          {/* <Controls /> */}
          <Panel position="top-left">
            <button className="btn" onClick={() => onLayout("BT")}>
              Up
            </button>
            <button className="btn" onClick={() => onLayout("TB")}>
              Down
            </button>
            <button className="btn" onClick={() => onLayout("RL")}>
              Left
            </button>
            <button className="btn" onClick={() => onLayout("LR")}>
              Right
            </button>
          </Panel>
          <Panel position="bottom-left">
            <ZoomSlider orientation= "horizontal" />
          </Panel>
          <MiniMap />
          {/* <Background variant="dots" gap={12} size={1} /> */}
        </ReactFlow>
      </div>
    </AppLayout>
  );
}
