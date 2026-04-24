import { Handle, Position } from "reactflow";

const card = (bg, border) => ({
  padding: 10,
  borderRadius: 10,
  background: bg,
  border: `1px solid ${border}`,
  minWidth: 140,
});

export const TaskNode = ({ data }) => {
  return (
    <div style={card("#fff", "#d1d5db")}>
      <Handle type="target" position={Position.Top} />
      📄 <strong>{data?.label || "Task"}</strong>
      {/* ✅ EXTRA INFO */}
      {data?.description && <div style={metaStyle}>{data.description}</div>}
      {data?.assignee && <div style={metaStyle}>👤 {data.assignee}</div>}
      {data?.dueDate && <div style={metaStyle}>📅 {data.dueDate}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const metaStyle = {
  fontSize: 11,
  color: "#666",
  marginTop: 4,
};
