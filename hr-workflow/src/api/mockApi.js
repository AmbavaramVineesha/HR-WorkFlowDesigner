// simple in-memory mocks

export const getAutomations = async () => {
  return [
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject"],
    },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"],
    },
  ];
};

// simulate execution: returns step-by-step log with timestamps
export const simulateWorkflow = async (workflow) => {
  const { nodes, edges } = workflow;

  // build quick lookup
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // find start
  const start = nodes.find((n) => n.type === "start");
  if (!start) {
    return { ok: false, error: "Missing Start node" };
  }

  const visited = new Set();
  const steps = [];
  let current = start;
  let stepNo = 1;

  while (current) {
    if (visited.has(current.id)) {
      return { ok: false, error: "Cycle detected" };
    }
    visited.add(current.id);

    // mock delay-ish timestamp
    const time = new Date().toLocaleTimeString();

    steps.push({
      step: stepNo++,
      id: current.id,
      label: current.data?.label,
      type: current.type,
      time,
      meta: current.data || {},
    });

    if (current.type === "end") break;

    const next = edges.find((e) => e.source === current.id);
    if (!next) break;

    current = nodeMap.get(next.target);
  }

  return { ok: true, steps };
};
