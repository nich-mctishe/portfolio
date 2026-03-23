---
name: code-review
description: Ensures solutions are functionally correct, visually excellent, and meet high quality standards.
---

### Purpose
To perform a rigorous multi-pass review of any solution before final submission, ensuring it meets all user requirements and project standards.

### Review Pass Checklist

#### 1. Functional Correctness ("Does it work?")
-   **Verify Requirements**: Cross-reference the final solution against the original user request. Are all points addressed?
-   **Test Implementation**: Use terminal commands or the `browser_subagent` to verify functionality in a live session.
-   **Edge Cases**: Check for potential null values, missing types, or logical errors.

#### 2. Visual Excellence ("Does it look good?")
-   **Breakpoints**: Use `browser_subagent` to verify layout at 320px (min width), 768px (tablet), and 1440px (desktop).
-   **Aesthetics**: Ensure consistent usage of margins, padding, and the project's custom typography mixins.
-   **Theme Support**: Manually toggle Light/Dark mode via the browser to verify color contrast and adaptive logos.

#### 3. Code Quality & Efficiency ("Is it clean?")
-   **Standardization**: Ensure the code uses predefined SCSS mixins and tokens (avoid hardcoded values).
-   **DRY Principle**: Check for duplicated logic or styles that could be consolidated.
-   **Performance**: minimize large assets and ensure efficient script execution.
-   **Linting**: Always apply the `linting` skill as the final step.

### Protocol
-   **Self-Correction**: If a review pass identifies a flaw, the agent MUST fix it before presenting the solution to the user.
-   **Verification**: Always provide proof (logs or screenshots) that the code works as intended.
