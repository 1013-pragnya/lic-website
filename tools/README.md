# Developer Tools & AI Skills Integration Guide

This directory contains helper tools integrated into the project workspace to enhance AI-driven code reviews, code mapping, and design consistency.

---

## 1. Code Review Graph
Located in: [tools/code-review-graph](file:///c:/Users/Pragnya%20Sri/Desktop/Lic-3D-Insurence-website%20website/tools/code-review-graph)

### Overview
**Code Review Graph** is a local-first code intelligence tool. It maps function definitions, class structures, imports, and exports into a local SQLite database using Tree-sitter. This allows AI assistants (like Claude, Cursor, and Gemini) to query code relationships directly, reducing token consumption.

### Setup & Usage
1. **Local CLI**:
   - Navigate to `tools/code-review-graph`.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Build and run the local indexer against the project root:
     ```bash
     npm run build
     npm link
     code-review-graph index .
     ```
2. **MCP Server Integration**:
   - You can add the MCP configuration to your agent settings to make the server tools available globally:
     ```json
     {
       "mcpServers": {
         "code-review-graph": {
           "command": "node",
           "args": ["/path/to/tools/code-review-graph/dist/index.js"]
         }
       }
     }
     ```

---

## 2. UI/UX Pro Max Skill
Located in: [tools/ui-ux-pro-max-skill](file:///c:/Users/Pragnya%20Sri/Desktop/Lic-3D-Insurence-website%20website/tools/ui-ux-pro-max-skill)

### Overview
**UI/UX Pro Max** is an expert design intelligence database for AI models. It contains guidelines for 57+ UI styles (like Glassmorphism, Bento Grid), 95+ professional color palettes, 56+ premium typography pairings, and 98+ UX check items.

### Setup & Usage
1. **AI Instruction Reference**:
   - When instructing your AI assistant (e.g., Cursor, Windsurf, or Claude Code), tell the agent to reference the design rules defined in:
     `tools/ui-ux-pro-max-skill/SKILL.md`
   - This ensures the AI applies professional design parameters (consistent radii, high-contrast text, specific line-heights, smooth cubic-bezier transitions) instead of generic styling templates.
2. **Global Skills Folder**:
   - To integrate UI/UX Pro Max directly as an automated AI system instruction, copy the prompt files:
     ```bash
     cp -r tools/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max ~/.claude/skills/
     ```
