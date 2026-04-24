import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useRef, useState } from "react";
import { useFlowStore } from "../store/useFlowStore";

import { TaskNode } from "../nodes/TaskNode";
import { ApprovalNode } from "../nodes/ApprovalNode";
import { StartNode } from "../nodes/StartNode";
import { EndNode } from "../nodes/EndNode";
import { AutomatedNode } from "../nodes/AutomatedNode";

const nodeTypes = {
  task: TaskNode,
  approval: ApprovalNode,
  start: StartNode,
  end: EndNode,
  automated: AutomatedNode,
};

export default function FlowCanvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNode,
    selectedNodes,
    setSelectedNode,
    toggleNodeSelection,
    deleteNodes,
  } = useFlowStore();

  const wrapper = useRef(null);
  const rfInstance = useRef(null);

  const [menu, setMenu] = useState(null);

  // ✅ Node changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  // ✅ Edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  // ✅ Connect
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // ✅ KEYBOARD DELETE (MULTI SUPPORT)
  const onKeyDown = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (selectedNodes.length > 0) {
        deleteNodes(selectedNodes.map((n) => n.id));
      } else if (selectedNode) {
        deleteNodes(selectedNode.id);
      }
      setMenu(null);
    }
  };

  // 🆕 RIGHT CLICK
  const onNodeContextMenu = (event, node) => {
    event.preventDefault();

    setSelectedNode(node);

    setMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  };

  const closeMenu = () => setMenu(null);

  // ✅ MULTI SELECT SUPPORT (SHIFT CLICK)
  const onNodeClick = (event, node) => {
    if (event.shiftKey) {
      toggleNodeSelection(node);
    } else {
      setSelectedNode(node);
    }

    console.log("Selected Nodes:", useFlowStore.getState().selectedNodes);
  };

  // ✅ Drag & Drop
  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");

    const bounds = wrapper.current.getBoundingClientRect();

    const position = rfInstance.current.screenToFlowPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode = {
      id: Date.now().toString(),
      type,
      position,
      data: { label: `${type}` },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div
      ref={wrapper}
      style={{ height: "100%", borderRadius: 12 }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={closeMenu}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={(i) => (rfInstance.current = i)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onNodeClick={onNodeClick} // 🔥 UPDATED
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <Background color="#e5e7eb" gap={24} />
        <Controls />
      </ReactFlow>

      {/* CONTEXT MENU */}
      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <div
            onClick={() => deleteNodes(menu.nodeId)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              color: "#ef4444",
            }}
          >
            🗑 Delete Node
          </div>
        </div>
      )}
    </div>
  );
}
