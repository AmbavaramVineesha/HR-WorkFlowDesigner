import { Handle, Position } from "reactflow";
import { useFlowStore } from "../store/useFlowStore";

const card = (bg, border, selected) => ({
  padding: 10,
  borderRadius: 10,
  background: selected ? "#fee2e2" : bg,
  border: selected ? "2px solid #3b82f6" : `2px solid ${border}`,
  minWidth: 120,
  transition: "all 0.2s ease",
});

export function EndNode({ id, data }) {
  const selectedNodes = useFlowStore((s) => s.selectedNodes);

  const isSelected = selectedNodes.some((n) => n.id === id);

  return (
    <div style={card("#fff1f2", "#ef4444", isSelected)}>
      🛑 <strong>{data?.label || "End"}</strong>
      {/* ✅ MESSAGE */}
      {data?.endMessage && <div style={metaStyle}>{data.endMessage}</div>}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

const metaStyle = {
  fontSize: 11,
  color: "#555",
  marginTop: 4,
};
