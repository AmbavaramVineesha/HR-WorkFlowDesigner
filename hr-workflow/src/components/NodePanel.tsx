import { useFlowStore } from "../store/useFlowStore";

export default function NodePanel() {
  const { selectedNode, nodes, setNodes } = useFlowStore();

  if (!selectedNode) return <div>Select a node</div>;

  const updateField = (field, value) => {
    setNodes(
      nodes.map((n) =>
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
        value={selectedNode.data.label || ""}
        onChange={(e) => updateField("label", e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Description"
        value={selectedNode.data.description || ""}
        onChange={(e) => updateField("description", e.target.value)}
      />
    </div>
  );
}
