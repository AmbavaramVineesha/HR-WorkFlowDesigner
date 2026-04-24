# HR Workflow Builder

## Features

- Add Task, Approval, Start nodes
- Connect nodes visually
- Edit node details
- Execute workflow (topological order)

## Tech Stack

- React (Vite)
- React Flow
- Zustand (state management)

## How to Run

npm install
npm run dev

## Screenshots

(Add your screenshots here)

## Explanation

- Nodes and edges stored in Zustand
- Execution uses graph traversal starting from Start node
- Prevents cycles and invalid execution
