import { create } from "zustand";

export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],

  // ✅ single + multi selection
  selectedNode: null,
  selectedNodes: [],

  // ✅ set nodes
  setNodes: (updater) =>
    set((state) => ({
      nodes: typeof updater === "function" ? updater(state.nodes) : updater,
    })),

  // ✅ set edges
  setEdges: (updater) =>
    set((state) => {
      const newEdges =
        typeof updater === "function" ? updater(state.edges) : updater;

      console.log("UPDATED EDGES:", newEdges);

      return { edges: newEdges };
    }),

  // ✅ single select
  setSelectedNode: (node) =>
    set({
      selectedNode: node,
      selectedNodes: node ? [node] : [],
    }),

  // 🆕 toggle multi-select (for SHIFT click later)
  toggleNodeSelection: (node) =>
    set((state) => {
      const exists = state.selectedNodes.find((n) => n.id === node.id);

      let updated;

      if (exists) {
        updated = state.selectedNodes.filter((n) => n.id !== node.id);
      } else {
        updated = [...state.selectedNodes, node];
      }

      return {
        selectedNodes: updated,
        selectedNode: updated[0] || null,
      };
    }),

  // 🆕 clear selection
  clearSelection: () =>
    set({
      selectedNode: null,
      selectedNodes: [],
    }),

  // 🆕 DELETE (supports single + multiple)
  deleteNodes: (ids) => {
    const nodeIds = Array.isArray(ids) ? ids : [ids];

    set((state) => ({
      nodes: state.nodes.filter((n) => !nodeIds.includes(n.id)),
      edges: state.edges.filter(
        (e) => !nodeIds.includes(e.source) && !nodeIds.includes(e.target),
      ),
      selectedNode: null,
      selectedNodes: [],
    }));
  },
}));
