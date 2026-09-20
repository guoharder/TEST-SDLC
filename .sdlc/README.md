# .sdlc

Governance artifacts for this work item (Agentic Platform).

- `intents/`, `specs/`, `plans/` — markdown artifacts with front matter (`id: SPEC-1`, `kind: spec`, ...).
- `policy.yaml` — repository policy layered under the organization policy; floor rules cannot be relaxed. `verify.commands` was inferred from the repository — edit freely.
- `repos.yaml` — this repository's slug (`anchor`) and, for multi-repo goals, where sibling checkouts live.
- `evidence/gates.json` — gate evidence (`tests`, `llmReview`, `approvals`) consumed by the merge gate.
