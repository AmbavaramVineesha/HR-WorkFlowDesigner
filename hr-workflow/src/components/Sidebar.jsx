import { useFlowStore } from "../store/useFlowStore";

export default function Sidebar() {
  const { nodes, setNodes } = useFlowStore();

  const createNode = (type, label, position = { x: 250, y: 150 }) => {
    const newNode = {
      id: Date.now().toString(),
      type,
      position,
      data: { label },
    };
    setNodes([...nodes, newNode]);
  };

  const onDragStart = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Workflow Nodes</h2>

      {[
        { type: "start", label: "Start", icon: "🟢" },
        { type: "task", label: "Task", icon: "📄" },
        { type: "approval", label: "Approval", icon: "✅" },
        { type: "automated", label: "Automated", icon: "⚙️" },
        { type: "end", label: "End", icon: "🔴" },
      ].map((item) => (
        <div
          key={item.type}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          onClick={() => createNode(item.type, item.label)}
          style={cardStyle}
        >
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  marginBottom: 10,
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#fafafa",
  cursor: "grab",
  transition: "all 0.2s ease",
};
