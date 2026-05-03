---
name: changelog
description: Manages the project's CHANGELOG.md following the 'Keep a Changelog' methodology.
---

### Purpose
To ensure all notable project changes are documented in a clear, standardized, and human-readable format.

### Instructions
1.  **Read Before Writing**: Before adding to the `CHANGELOG.md`, read the existing entries to match the tone and style.
2.  **Use the [Unreleased] Section**: All changes made in the current session should be added under the `## [Unreleased]` header.
3.  **Standard Categories**: Group changes into these specific categories:
    -   `Added`: New features.
    -   `Changed`: Changes in existing functionality.
    -   `Deprecated`: Features that will be removed soon.
    -   `Removed`: Features that have been removed.
    -   `Fixed`: Bug fixes.
    -   `Security`: Vulnerability fixes.
4.  **Format**:
    -   Use bullet points for each change.
    -   Explain **why** a change was made if it's not obvious.
    -   Avoid overly technical git-level details; speak to the user or developer benefit.

### Methodology (Keep a Changelog)
-   Latest versions go at the **TOP** (just below the header).
-   Adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`MAJOR.MINOR.PATCH`).
-   Keep the format consistent with [keepachangelog.com](https://keepachangelog.com/en/1.1.0/).

### Action Protocol
At the end of a significant task or session you must always:
1.  Run the `linting` and `code-review` skills.
2.  If successful, update the `[Unreleased]` section of `CHANGELOG.md` with a summary of work done.
3.  Commit the changes (if version control is active).
