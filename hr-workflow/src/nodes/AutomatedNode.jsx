import { Handle, Position } from "reactflow";
import { useFlowStore } from "../store/useFlowStore";

const card = (bg, border, selected) => ({
  padding: 10,
  borderRadius: 10,
  background: selected ? "#f3e8ff" : bg,
  border: selected ? "2px solid #3b82f6" : `2px solid ${border}`,
  minWidth: 150,
  transition: "all 0.2s ease",
});

export function AutomatedNode({ id, data }) {
  const selectedNodes = useFlowStore((s) => s.selectedNodes);

  const isSelected = selectedNodes.some((n) => n.id === id);

  return (
    <div style={card("#faf5ff", "#a855f7", isSelected)}>
      <Handle type="target" position={Position.Top} />
      ⚙️ <strong>{data?.label || "Automated"}</strong>
      {/* ✅ ACTION */}
      {data?.action && <div style={metaStyle}>Action: {data.action}</div>}
      {/* ✅ PARAMS */}
      {data?.param1 && <div style={metaStyle}>P1: {data.param1}</div>}
      {data?.param2 && <div style={metaStyle}>P2: {data.param2}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const metaStyle = {
  fontSize: 11,
  color: "#555",
  marginTop: 4,
};
