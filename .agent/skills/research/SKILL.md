---
name: research
description: Guides the agent to correctly locate and understand project requirements, tasks, and documentation.
---

### Purpose
To ensure that all work is aligned with the project's goals, existing architecture, and the sequence of planned tasks.

### Core Documentation Sources
When an agent starts a task or needs context, they SHOULD check these key files:

1.  **TODO.md**: The primary source of truth for current and pending tasks. (Root level).
2.  **README.md**: Overview of the project, quickstart guides, and high-level architectural rules. (Root level).
3.  **docs/**: Contains detailed architectural and strategic documents:
    -   `project-aims.md`: Core requirements and design philosophy.
    -   `tech-stack.md`: Justification for the selected technologies.
    -   `task-breakdown.md`: The multi-phase roadmap for completion.
4.  **CHANGELOG.md**: Record of all released and unreleased work. (Root level).
5.  **src/components/README.md**: Specialized guide for component hierarchy (Root vs Sub-components).

### Protocol for Agents
-   **Orientation**: Before taking any action in a new session, read the **TODO.md** to see what's next.
-   **Compliance**: Before refactoring or reorganizing, read the **README.md** and **src/components/README.md** to ensure you follow the established conventions.
-   **Verification**: After a task is completed, check the **TODO.md** to see if related tasks should be marked as done or if any regressions were noted in past entries.
-   **Discovery**: If you encounter an unfamiliar folder or helper, use `ls -R` and look for local `README.md` files first.
