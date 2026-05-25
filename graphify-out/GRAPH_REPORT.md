# Graph Report - hfk-system  (2026-05-25)

## Corpus Check
- 122 files · ~32,293 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 784 nodes · 1423 edges · 40 communities (34 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `204c0fc0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]

## God Nodes (most connected - your core abstractions)
1. `Subject` - 35 edges
2. `Grade` - 33 edges
3. `WorksheetContent` - 20 edges
4. `Path` - 17 edges
5. `compilerOptions` - 16 edges
6. `TemplateDefinition` - 16 edges
7. `getPackage()` - 14 edges
8. `getPlan()` - 13 edges
9. `VaultProvenance` - 13 edges
10. `generate()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `TemplateSlotEditorProps` --references--> `TemplateDefinition`  [EXTRACTED]
  src/components/templates/editor/TemplateSlotEditor.tsx → src/lib/template.types.ts
- `main()` --calls--> `Path`  [INFERRED]
  scripts/ingest_docs.py → scripts/generate_codebase_graph.py
- `POST()` --calls--> `retrieveCaptionContext()`  [EXTRACTED]
  src/app/api/ai/draft/caption/route.ts → src/lib/vault.rag.ts
- `POST()` --calls--> `retrieveWorksheetContext()`  [EXTRACTED]
  src/app/api/ai/draft/worksheet/route.ts → src/lib/vault.rag.ts
- `POST()` --calls--> `generate()`  [EXTRACTED]
  src/app/api/ai/summary/route.ts → src/lib/deepseek.ts

## Communities (40 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (15): lastUpdated, next, description, name, phase, notes, phase, current (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (25): name, payload, status, createdAt, date, name, payload, status (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (44): EditTemplatePage(), EditTemplatePageProps, HFK_TOKENS, PALETTE_FIELDS, PropertyPanel(), PropertyPanelProps, SLOT_COLOR, slotLabel() (+36 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (50): GATE_NAMES, isGateName(), POST(), todayId(), GATE_LABELS, GATE_ORDER, STATUS_BADGE, STATUS_LABEL (+42 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (13): GRADES, RECOMMENDATION_PILLS, SUBJECTS, AnalyticsPage(), buildHeatmap(), getMockSnapshot(), GRADES, HEATMAP_VALUES (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (43): approvedAt, name, payload, status, createdAt, date, approvedAt, name (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (29): CaptionDraftRequestSchema, CaptionDraftSchema, POST(), DELETE(), DailySummaryRequest, DailySummaryResponse, deepseek, generate() (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (25): currentMonth(), formatMonthLabel(), MonthProgress(), POST(), DailyPackage, getPackagesForMonth(), PACKAGES_DIR, DATA_DIR (+17 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (36): dependencies, chromadb, chromadb-default-embed, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, framer-motion, html-to-image (+28 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (34): name, payload, status, createdAt, date, approvedAt, name, payload (+26 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (30): name, payload, status, createdAt, date, approvedAt, name, payload (+22 more)

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (19): WorksheetDraft, Activity, ActivityType, VocabularyEntry, ActivityBlock, BlockType, defaultOrder, FooterBlock (+11 more)

### Community 14 - "Community 14"
Cohesion: 0.07
Nodes (47): AllGradesSchema, AllSubjectsSchema, FreshnessLevelSchema, RejectionReasonSchema, validateVaultAvatar(), validateVaultBrandRule(), validateVaultPrompt(), validateVaultTemplate() (+39 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (23): bool, POST(), archiveExport(), ARCHIVES_DIR, EXPORTS_DIR, exportToPDF(), exportToPNG(), Path (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.06
Nodes (58): POST(), VaultAlerts(), POST(), CaptionDraftRequest, CaptionDraftResponse, WorksheetDraftRequest, WorksheetDraftResponse, HeatmapCell (+50 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 19 - "Community 19"
Cohesion: 0.06
Nodes (37): activityLabels, capitalize(), WorksheetTemplate(), WorksheetTemplateProps, ACTIVITY_LABELS, applySlotStyle(), capitalize(), DynamicWorksheetTemplate() (+29 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (11): GatePayload, TemplatePayload, RedirectModalProps, GATE_DESCRIPTIONS, GATE_LABELS, GATE_ORDER, isDirection(), ReviewFlow() (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (7): fredoka, instrumentSerif, inter, jetbrainsMono, metadata, nunito, NAV_ITEMS

### Community 30 - "Community 30"
Cohesion: 0.53
Nodes (5): bytes, cp1252_bytes(), main(), str, repair_mojibake()

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

## Knowledge Gaps
- **291 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+286 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Path` connect `Community 15` to `Community 2`, `Community 3`, `Community 6`, `Community 7`, `Community 14`, `Community 19`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `Subject` connect `Community 17` to `Community 2`, `Community 3`, `Community 4`, `Community 7`, `Community 13`, `Community 19`, `Community 20`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Grade` connect `Community 17` to `Community 2`, `Community 3`, `Community 4`, `Community 13`, `Community 19`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _292 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._