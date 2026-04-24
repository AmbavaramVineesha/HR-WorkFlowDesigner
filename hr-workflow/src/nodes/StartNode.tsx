import { Handle, Position } from "reactflow";

const card = (bg, border, rounded = false) => ({
  padding: 10,
  borderRadius: rounded ? 20 : 10,
  background: bg,
  border: `2px solid ${border}`,
  fontWeight: "bold",
  minWidth: 120,
});

export const StartNode = ({ data }) => {
  return (
    <div style={card("#eff6ff", "#3b82f6", true)}>
      ▶ <strong>{data?.label || "Start"}</strong>
      {/* ✅ METADATA */}
      {data?.metadata && <div style={metaStyle}>{data.metadata}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const metaStyle = {
  fontSize: 11,
  color: "#666",
  marginTop: 4,
};
