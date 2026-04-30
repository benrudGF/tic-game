# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Data Storage**: JSON files in `/data` directory
- **Validation**: Zod (`zod/v4`)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## 📌 Project Documentation

For detailed information about the project, including checkpoints, goals, and deliverables, refer to the following documents:

- **[Project Brief](PROJECT_BRIEF.md)** — High-level overview of the project, including checkpoints and key milestones.
- **[Checkpoints](CHECKPOINTS.md)** — Detailed breakdown of each checkpoint, its status, and associated tasks.

These files are located in the root directory of the repository and provide comprehensive insights into the project's progress and structure.