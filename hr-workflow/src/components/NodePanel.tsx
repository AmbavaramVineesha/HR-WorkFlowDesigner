import { useFlowStore } from "../store/useFlowStore";

export default function NodePanel() {
  const selectedNode = useFlowStore((s: any) => s.selectedNode);
  const nodes = useFlowStore((s: any) => s.nodes);
  const setNodes = useFlowStore((s: any) => s.setNodes);

  if (!selectedNode) return <div>Select a node</div>;

  const updateField = (field: string, value: any) => {
    setNodes((prev: any[]) =>
      prev.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, [field]: value } }
          : n,
      ),
    );
  };

  return (
    <div style={{ padding: 10 }}>
      <h3>Edit Node</h3>

      <input
        placeholder="Title"
        value={selectedNode.data?.label || ""}
        onChange={(e) => updateField("label", e.target.value)}
        style={inputStyle}
      />

      <br />

      <input
        placeholder="Description"
        value={selectedNode.data?.description || ""}
        onChange={(e) => updateField("description", e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

/* 🎨 STYLES */

const inputStyle = {
  width: "100%",
  padding: 6,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ddd",
};
