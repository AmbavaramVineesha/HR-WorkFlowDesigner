import { useState, useEffect } from "react";
import { useFlowStore } from "../store/useFlowStore";
import { simulateWorkflow, getAutomations } from "../api/mockApi";

export default function Sandbox() {
  const nodes = useFlowStore((s: any) => s.nodes);
  const edges = useFlowStore((s: any) => s.edges);

  const selectedNode = useFlowStore((s: any) =>
    s.nodes.find((n: any) => n.id === s.selectedNode?.id),
  );

  const setNodes = useFlowStore((s: any) => s.setNodes);
  const setEdges = useFlowStore((s: any) => s.setEdges);
  const setSelectedNode = useFlowStore((s: any) => s.setSelectedNode);

  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [actions, setActions] = useState<any[]>([]);

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getAutomations().then(setActions);
  }, []);

  // ✅ SAFE UPDATE NODE
  const updateNode = (field: string, value: any) => {
    if (!selectedNode) return;

    setNodes((prev: any[]) =>
      prev.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, [field]: value } }
          : n,
      ),
    );
  };

  // ✅ DELETE NODE
  const deleteNode = () => {
    if (!selectedNode) return;

    setNodes((prev: any[]) => prev.filter((n) => n.id !== selectedNode.id));

    setEdges((prev: any[]) =>
      prev.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id,
      ),
    );

    setSelectedNode(null);
    setShowDelete(false);
  };

  // ✅ RUN WORKFLOW
  const runWorkflow = async () => {
    setError("");
    setLogs([]);

    if (!edges.length) {
      setError("⚠️ Connect nodes before running");
      return;
    }

    const startNodes = nodes.filter((n: any) => n.type === "start");
    if (startNodes.length !== 1) {
      setError("⚠️ Exactly one Start node required");
      return;
    }

    const endNodes = nodes.filter((n: any) => n.type === "end");
    if (endNodes.length === 0) {
      setError("⚠️ Add an End node");
      return;
    }

    const res = await simulateWorkflow({ nodes, edges });

    if (!res.ok) {
      setError(`⚠️ ${res.error}`);
      return;
    }

    setLogs(res.steps || []);
  };

  return (
    <div>
      {/* HEADER */}
      <div style={panelCard}>
        <h3 style={{ marginBottom: 10 }}>Workflow Sandbox</h3>

        <button onClick={runWorkflow} style={runButton}>
          ▶ Run Workflow
        </button>
      </div>

      {/* ERROR */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* EXECUTION */}
      <div style={panelCard}>
        <h4 style={{ marginBottom: 10 }}>Execution Log</h4>

        {logs.length === 0 && (
          <div style={{ fontSize: 13, color: "#888" }}>No execution yet</div>
        )}

        {logs.map((log: any) => (
          <div key={log.step} style={logCard}>
            <div style={{ fontWeight: "bold" }}>
              {log.step}. {log.label}
            </div>

            <div style={{ fontSize: 12, color: "#666" }}>
              Type: {log.type} | {log.time}
            </div>

            {log.type === "automated" && log.meta?.action && (
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Action: {log.meta.action}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EDIT PANEL */}
      {selectedNode && (
        <div style={panelCard}>
          <h3 style={{ marginBottom: 10 }}>Edit Node</h3>

          {/* COMMON */}
          <input
            value={selectedNode.data.label || ""}
            onChange={(e) => updateNode("label", e.target.value)}
            style={inputStyle}
          />

          {/* TASK */}
          {selectedNode.type === "task" && (
            <>
              <input
                placeholder="Description"
                value={selectedNode.data.description || ""}
                onChange={(e) => updateNode("description", e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Assignee"
                value={selectedNode.data.assignee || ""}
                onChange={(e) => updateNode("assignee", e.target.value)}
                style={inputStyle}
              />

              <input
                type="date"
                value={selectedNode.data.dueDate || ""}
                onChange={(e) => updateNode("dueDate", e.target.value)}
                style={inputStyle}
              />
            </>
          )}

          {/* APPROVAL */}
          {selectedNode.type === "approval" && (
            <>
              <input
                placeholder="Approver Role"
                value={selectedNode.data.role || ""}
                onChange={(e) => updateNode("role", e.target.value)}
                style={inputStyle}
              />

              <input
                type="number"
                value={selectedNode.data.threshold || ""}
                onChange={(e) =>
                  updateNode("threshold", Number(e.target.value))
                }
                style={inputStyle}
              />
            </>
          )}

          {/* START */}
          {selectedNode.type === "start" && (
            <input
              placeholder="Metadata"
              value={selectedNode.data.metadata || ""}
              onChange={(e) => updateNode("metadata", e.target.value)}
              style={inputStyle}
            />
          )}

          {/* END */}
          {selectedNode.type === "end" && (
            <input
              placeholder="End Message"
              value={selectedNode.data.endMessage || ""}
              onChange={(e) => updateNode("endMessage", e.target.value)}
              style={inputStyle}
            />
          )}

          {/* AUTOMATED */}
          {selectedNode.type === "automated" && (
            <>
              <select
                value={selectedNode.data.action || ""}
                onChange={(e) => updateNode("action", e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Action</option>
                {actions.map((a: any) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>

              <input
                placeholder="Parameter 1"
                value={selectedNode.data.param1 || ""}
                onChange={(e) => updateNode("param1", e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Parameter 2"
                value={selectedNode.data.param2 || ""}
                onChange={(e) => updateNode("param2", e.target.value)}
                style={inputStyle}
              />
            </>
          )}

          {/* DELETE */}
          <button onClick={() => setShowDelete(true)} style={deleteBtn}>
            Delete Node
          </button>
        </div>
      )}

      {/* MODAL */}
      {showDelete && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h4>Delete Node?</h4>
            <p>This action cannot be undone.</p>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={deleteNode} style={confirmBtn}>
                Yes Delete
              </button>
              <button onClick={() => setShowDelete(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const panelCard = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 14,
  marginBottom: 14,
};

const runButton = {
  padding: "8px 12px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: 6,
};

const deleteBtn = {
  marginTop: 10,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
};

const confirmBtn = {
  background: "#ef4444",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: 6,
};

const modalOverlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};

const errorStyle = {
  color: "#dc2626",
  marginBottom: 10,
};

const logCard = {
  padding: 10,
  marginBottom: 8,
  border: "1px solid #e5e7eb",
  borderRadius: 8,
};

const inputStyle = {
  width: "100%",
  marginBottom: 8,
  padding: 6,
  borderRadius: 6,
  border: "1px solid #ddd",
};
