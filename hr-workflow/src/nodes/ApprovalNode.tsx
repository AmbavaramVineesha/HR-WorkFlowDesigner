import { Handle, Position } from "reactflow";
import { useFlowStore } from "../store/useFlowStore";

// 🎨 reusable card
const card = (bg: string, border: string, selected: boolean) => ({
  padding: 10,
  borderRadius: 10,
  background: selected ? "#ecfdf5" : bg,
  border: selected ? "2px solid #3b82f6" : `2px solid ${border}`,
  minWidth: 140,
  transition: "all 0.2s ease",
});

export const ApprovalNode = ({ id, data }: any) => {
  const selectedNodes = useFlowStore((s: any) => s.selectedNodes || []);

  // ✅ safe selection check
  const isSelected = selectedNodes.some((n: any) => n.id === id);

  return (
    <div style={card("#ecfdf5", "#22c55e", isSelected)}>
      <Handle type="target" position={Position.Top} />✅{" "}
      <strong>{data?.label || "Approval"}</strong>
      {/* ✅ EXTRA INFO */}
      {data?.role && <div style={metaStyle}>Role: {data.role}</div>}
      {data?.threshold && (
        <div style={metaStyle}>Threshold: {data.threshold}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// 🎨 metadata style
const metaStyle = {
  fontSize: 11,
  color: "#555",
  marginTop: 4,
};
