HR Workflow Designer (React + React Flow)
Overview

This project is a prototype of an HR Workflow Designer that allows users to visually create, configure, and simulate workflows such as onboarding, approvals, and automated processes.

The application is built using React and React Flow, with Zustand used for centralized state management. It demonstrates a modular and scalable front-end architecture along with interactive UI capabilities.

Features
Workflow Canvas
Drag and drop nodes from the sidebar onto the canvas
Connect nodes using edges to define workflow paths
Support for multiple node types:
Start Node
Task Node
Approval Node
Automated Node
End Node
Zoom, pan, and reposition nodes
Node Configuration
Click on any node to edit its properties
Dynamic forms based on node type:
Task: title, description, assignee, due date
Approval: role, threshold
Start: metadata
End: message
Automated: action selection and parameters
Real-time updates reflected on the canvas
Workflow Execution (Sandbox)
Simulates workflow execution step-by-step
Validates structure before execution:
Ensures exactly one Start node
Ensures at least one End node
Detects cycles
Displays execution timeline with node details
Mock API Integration
Simulated API layer for:
Fetching automation actions
Running workflow simulation
Demonstrates separation between UI and data layer
State Management
Centralized state using Zustand
Supports:
Node and edge updates
Single and multi-node selection
Centralized delete logic
Advanced Interactions
Multi-node selection using Shift + Click
Delete nodes using:
Keyboard (Delete / Backspace)
Right-click context menu
Delete button in edit panel
Automatic removal of connected edges on delete
Visual highlighting of selected nodes
Tech Stack
React (Vite)
React Flow
Zustand (state management)
JavaScript (ES6+)
CSS (inline styling)
Project Structure
src/
components/
FlowCanvas.jsx
Sidebar.jsx
Sandbox.tsx

nodes/
TaskNode.tsx
ApprovalNode.tsx
StartNode.tsx
EndNode.jsx
AutomatedNode.jsx

store/
useFlowStore.js

api/
mockApi.js
How to Run

Clone the repository:

git clone <your-repo-link>
cd hr-workflow

Install dependencies:

npm install

Start the development server:

npm run dev

Open in browser:

http://localhost:5173
Key Design Decisions
Zustand is used instead of Redux for simplicity and minimal boilerplate
Node rendering is component-based for easy extensibility
Workflow execution is implemented using graph traversal logic
UI and API layers are separated for scalability
Functional state updates are used to avoid stale state issues
How Workflow Execution Works
The workflow graph is traversed starting from the Start node
Each node is processed sequentially based on connections
A visited set is used to detect cycles
Execution stops when an End node is reached
Results are displayed as a structured timeline
What Can Be Improved
Add drag-box multi-selection
Add undo/redo functionality
Persist workflows (local storage or backend)
Improve UI with a component library (e.g., Material UI)
Add validation rules (e.g., mandatory fields)
Support parallel workflows
Conclusion

This project demonstrates the ability to:

Build interactive graph-based UI applications
Design scalable front-end architecture
Manage complex state efficiently
Implement workflow logic and validation
Integrate mock APIs

It reflects strong understanding of React, component design, and real-world system behavior.
