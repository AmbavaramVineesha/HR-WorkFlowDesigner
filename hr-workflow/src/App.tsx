import { ReactFlowProvider } from "reactflow";
import FlowCanvas from "./components/FlowCanvas";
import Sidebar from "./components/Sidebar";
import Sandbox from "./components/Sandbox";

function App() {
  return (
    <ReactFlowProvider>
      <div style={layoutStyle}>
        {/* LEFT SIDEBAR */}
        <div style={sidebarStyle}>
          <Sidebar />
        </div>

        {/* MAIN CANVAS */}
        <div style={canvasStyle}>
          <FlowCanvas />
        </div>

        {/* RIGHT PANEL */}
        <div style={rightPanelStyle}>
          <Sandbox />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;

/* 🎨 STYLES */

const layoutStyle = {
  display: "flex",
  height: "100vh",
  fontFamily: "Inter, sans-serif",
  background: "#f3f4f6",
};

const sidebarStyle = {
  width: 240,
  background: "#ffffff",
  borderRight: "1px solid #e5e7eb",
  padding: 16,
  boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
};

const canvasStyle = {
  flex: 1,
  padding: 10,
};

const rightPanelStyle = {
  width: 320,
  background: "#ffffff",
  borderLeft: "1px solid #e5e7eb",
  padding: 16,
  overflowY: "auto",
  boxShadow: "-2px 0 6px rgba(0,0,0,0.05)",
};
