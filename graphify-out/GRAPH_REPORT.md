# Graph Report - hfk-system  (2026-05-25)

## Corpus Check
- 119 files · ~31,497 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 778 nodes · 1418 edges · 54 communities (49 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b13cb7e0`
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
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]

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
- `main()` --calls--> `Path`  [INFERRED]
  scripts/ingest_docs.py → scripts/generate_codebase_graph.py
- `POST()` --calls--> `generate()`  [EXTRACTED]
  src/app/api/ai/summary/route.ts → src/lib/deepseek.ts
- `POST()` --calls--> `generate()`  [EXTRACTED]
  src/app/api/ai/topic/suggest/route.ts → src/lib/deepseek.ts
- `GET()` --calls--> `getPackage()`  [EXTRACTED]
  src/app/api/approval/package/route.ts → src/lib/approval.store.ts
- `POST()` --calls--> `generateMonthlyPlan()`  [EXTRACTED]
  src/app/api/planning/generate/route.ts → src/lib/planning.generate.ts

## Communities (54 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (15): lastUpdated, next, description, name, phase, notes, phase, current (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (25): name, payload, status, createdAt, date, name, payload, status (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (51): EditTemplatePage(), EditTemplatePageProps, HFK_TOKENS, PALETTE_FIELDS, PropertyPanel(), PropertyPanelProps, SLOT_COLOR, slotLabel() (+43 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (48): GATE_NAMES, isGateName(), POST(), todayId(), GATE_LABELS, GATE_ORDER, STATUS_BADGE, STATUS_LABEL (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (14): GRADES, RECOMMENDATION_PILLS, SUBJECTS, AnalyticsPage(), buildHeatmap(), getMockSnapshot(), GRADES, HEATMAP_VALUES (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (43): approvedAt, name, payload, status, createdAt, date, approvedAt, name (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (29): CaptionDraftRequestSchema, CaptionDraftSchema, POST(), CaptionDraftRequest, CaptionDraftResponse, DailySummaryRequest, DailySummaryResponse, WorksheetDraftRequest (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.36
Nodes (7): POST(), DATA_DIR, getPlan(), savePlan(), GET(), POST(), RequestSchema

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
Cohesion: 0.16
Nodes (6): WorksheetBlock, blockLabel(), BlockPanelProps, blockPreview(), LockedBlockRow(), SortableBlockRow()

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (27): validateVaultAvatar(), validateVaultBrandRule(), validateVaultPrompt(), validateVaultTemplate(), AVATAR_DIR, buildBrandRuleFromFile(), buildBrandRuleFromMarkdown(), buildPromptFromFile() (+19 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (23): bool, POST(), archiveExport(), ARCHIVES_DIR, EXPORTS_DIR, exportToPDF(), exportToPNG(), Path (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.22
Nodes (12): POST(), WorksheetDraftResponse, DEFAULT_GRADE_ROTATION, DEFAULT_SUBJECT_ROTATION, generateMonthlyPlan(), getDaysInMonth(), SUBJECT_LABELS, retrievePlanningContext() (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (4): RagContext, VaultBrandRule, VaultCaption, VaultWorksheet

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (13): ACTIVITY_LABELS, applySlotStyle(), capitalize(), DynamicWorksheetTemplate(), DynamicWorksheetTemplateProps, renderSlot(), PREVIEW_HEIGHT, PREVIEW_WORKSHEET (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (11): PlanDay, RedirectModalProps, GATE_DESCRIPTIONS, GATE_LABELS, GATE_ORDER, isDirection(), ReviewFlow(), ReviewFlowProps (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (7): fredoka, instrumentSerif, inter, jetbrainsMono, metadata, nunito, NAV_ITEMS

### Community 22 - "Community 22"
Cohesion: 0.26
Nodes (9): POST(), assemblePrompt(), hasPlaceholders(), interpolate(), SUBJECT_DISPLAY, AssembledPrompt, PromptAssemblyRequest, Subject (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (11): buildWhere(), getAssetById(), parseMetadataAsset(), QueryFilters, QueryOptions, queryVault(), WhereClause, validateVaultAsset() (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.43
Nodes (4): activityLabels, capitalize(), WorksheetTemplate(), WorksheetTemplateProps

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (7): WorksheetEditorProps, ActivityType, ContentItem, ContentStatus, FacebookPostContent, WorksheetContent, WorksheetListProps

### Community 26 - "Community 26"
Cohesion: 0.27
Nodes (7): ACTIVITY_COLORS, ACTIVITY_EMOJI, ACTIVITY_LABELS, capitalize(), SUBJECT_EMOJI, WorksheetTemplate(), WorksheetTemplateProps

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (18): AllGradesSchema, AllSubjectsSchema, FreshnessLevelSchema, RejectionReasonSchema, VaultAssetBaseSchema, VaultAssetSchema, VaultAssetTypeSchema, VaultAvatarSchema (+10 more)

### Community 28 - "Community 28"
Cohesion: 0.32
Nodes (5): VaultAlerts(), listPrompts(), getAssetsByType(), VaultTopic, GET()

### Community 29 - "Community 29"
Cohesion: 0.36
Nodes (6): DELETE(), deleteWorksheet(), saveWorksheet(), WORKSHEETS_DIR, validateWorksheet(), POST()

### Community 30 - "Community 30"
Cohesion: 0.53
Nodes (5): bytes, cp1252_bytes(), main(), str, repair_mojibake()

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

### Community 46 - "Community 46"
Cohesion: 0.19
Nodes (13): WorksheetDraft, Activity, VocabularyEntry, ActivityBlock, BlockType, defaultOrder, FooterBlock, getSectionOrder() (+5 more)

### Community 47 - "Community 47"
Cohesion: 0.43
Nodes (6): getChromaCollection(), buildChromaMetadata(), buildDocumentText(), ingestAsset(), removeAsset(), VaultAsset

### Community 48 - "Community 48"
Cohesion: 0.27
Nodes (9): confidenceColor(), confidenceLabel(), DAY_HEADERS, getCalendarWeeks(), isPastDate(), PlannerView(), SUBJECT_COLORS, SUBJECT_LABELS (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.43
Nodes (5): DailyPackage, getPackagesForMonth(), PACKAGES_DIR, PlannerMonthPage(), PlannerViewProps

### Community 50 - "Community 50"
Cohesion: 0.38
Nodes (5): FreshnessLevel, RejectionReason, VaultAssetBase, VaultAvatar, VaultRejectionRecord

### Community 51 - "Community 51"
Cohesion: 0.47
Nodes (3): currentMonth(), formatMonthLabel(), MonthProgress()

### Community 52 - "Community 52"
Cohesion: 0.83
Nodes (3): blocksToWorksheet(), normalizeForDirty(), WorksheetBuilder()

## Knowledge Gaps
- **290 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+285 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Path` connect `Community 15` to `Community 2`, `Community 3`, `Community 7`, `Community 14`, `Community 49`, `Community 29`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `Subject` connect `Community 22` to `Community 2`, `Community 3`, `Community 4`, `Community 6`, `Community 13`, `Community 46`, `Community 14`, `Community 48`, `Community 16`, `Community 17`, `Community 50`, `Community 20`, `Community 52`, `Community 23`, `Community 25`, `Community 28`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Grade` connect `Community 6` to `Community 2`, `Community 3`, `Community 4`, `Community 13`, `Community 46`, `Community 14`, `Community 16`, `Community 17`, `Community 50`, `Community 52`, `Community 20`, `Community 22`, `Community 23`, `Community 25`, `Community 28`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _291 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05157894736842105 - nodes in this community are weakly interconnected._