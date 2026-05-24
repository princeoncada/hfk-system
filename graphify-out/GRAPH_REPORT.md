# Graph Report - .  (2026-05-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 739 nodes · 1378 edges · 44 communities (41 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `42a4b199`
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
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 37|Community 37]]

## God Nodes (most connected - your core abstractions)
1. `Subject` - 35 edges
2. `Grade` - 33 edges
3. `WorksheetContent` - 20 edges
4. `compilerOptions` - 16 edges
5. `Path` - 16 edges
6. `TemplateDefinition` - 16 edges
7. `getPackage()` - 14 edges
8. `getPlan()` - 13 edges
9. `VaultProvenance` - 13 edges
10. `generate()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `retrieveCaptionContext()`  [EXTRACTED]
  src/app/api/ai/draft/caption/route.ts → src/lib/vault.rag.ts
- `POST()` --calls--> `retrieveWorksheetContext()`  [EXTRACTED]
  src/app/api/ai/draft/worksheet/route.ts → src/lib/vault.rag.ts
- `POST()` --calls--> `generate()`  [EXTRACTED]
  src/app/api/ai/summary/route.ts → src/lib/deepseek.ts
- `POST()` --calls--> `generate()`  [EXTRACTED]
  src/app/api/ai/topic/suggest/route.ts → src/lib/deepseek.ts
- `GET()` --calls--> `getPackage()`  [EXTRACTED]
  src/app/api/approval/package/route.ts → src/lib/approval.store.ts

## Communities (44 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (54): ACTIVITY_LABELS, applySlotStyle(), capitalize(), DynamicWorksheetTemplate(), DynamicWorksheetTemplateProps, renderSlot(), EditTemplatePage(), EditTemplatePageProps (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (52): GATE_NAMES, isGateName(), POST(), todayId(), GATE_LABELS, GATE_ORDER, STATUS_BADGE, STATUS_LABEL (+44 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (47): AllGradesSchema, AllSubjectsSchema, FreshnessLevelSchema, RejectionReasonSchema, validateVaultAvatar(), validateVaultBrandRule(), validateVaultPrompt(), validateVaultTemplate() (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (43): approvedAt, name, payload, status, createdAt, date, approvedAt, name (+35 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (36): dependencies, chromadb, chromadb-default-embed, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, framer-motion, html-to-image (+28 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (25): currentMonth(), formatMonthLabel(), MonthProgress(), POST(), DailyPackage, getPackagesForMonth(), PACKAGES_DIR, DATA_DIR (+17 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (34): name, payload, status, createdAt, date, approvedAt, name, payload (+26 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (30): name, payload, status, createdAt, date, approvedAt, name, payload (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (23): CaptionDraftRequestSchema, CaptionDraftSchema, POST(), DailySummaryRequest, DailySummaryResponse, deepseek, generate(), GenerateOptions (+15 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (13): GRADES, RECOMMENDATION_PILLS, SUBJECTS, AnalyticsPage(), buildHeatmap(), getMockSnapshot(), GRADES, HEATMAP_VALUES (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.18
Nodes (19): bool, POST(), archiveExport(), ARCHIVES_DIR, EXPORTS_DIR, exportToPDF(), exportToPNG(), Path (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (17): VaultAlerts(), getAssetById(), getAssetsByType(), parseMetadataAsset(), QueryFilters, QueryOptions, WhereClause, validateVaultAsset() (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (7): buildWhere(), queryVault(), RagContext, retrieveCaptionContext(), retrieveWorksheetContext(), VaultBrandRule, VaultWorksheet

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (10): GatePayload, RedirectModalProps, GATE_DESCRIPTIONS, GATE_LABELS, GATE_ORDER, isDirection(), ReviewFlow(), STATUS_BADGE (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.19
Nodes (14): POST(), CaptionDraftResponse, WorksheetDraftResponse, DEFAULT_GRADE_ROTATION, DEFAULT_SUBJECT_ROTATION, generateMonthlyPlan(), getDaysInMonth(), SUBJECT_LABELS (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (7): ActivityType, WorksheetBlock, blockLabel(), BlockPanelProps, blockPreview(), LockedBlockRow(), SortableBlockRow()

### Community 17 - "Community 17"
Cohesion: 0.21
Nodes (10): POST(), assemblePrompt(), hasPlaceholders(), interpolate(), listPrompts(), SUBJECT_DISPLAY, AssembledPrompt, PromptAssemblyRequest (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (7): fredoka, instrumentSerif, inter, jetbrainsMono, metadata, nunito, NAV_ITEMS

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (15): lastUpdated, next, description, name, phase, notes, phase, current (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.24
Nodes (9): PreviewPage(), PreviewPageProps, resolveTemplate(), WorksheetBuilderPage(), PreviewControls(), CONTENT_DIR, getWorksheetById(), getWorksheets() (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.21
Nodes (12): WorksheetDraft, Activity, VocabularyEntry, ActivityBlock, BlockType, defaultOrder, FooterBlock, getSectionOrder() (+4 more)

### Community 22 - "Community 22"
Cohesion: 0.30
Nodes (10): CaptionDraftRequest, WorksheetDraftRequest, PerformanceStat, DirectionPayload, ContentItem, ContentStatus, FacebookPostContent, Grade (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.27
Nodes (7): ACTIVITY_COLORS, ACTIVITY_EMOJI, ACTIVITY_LABELS, capitalize(), SUBJECT_EMOJI, WorksheetTemplate(), WorksheetTemplateProps

### Community 24 - "Community 24"
Cohesion: 0.28
Nodes (4): WorksheetEditorProps, WorksheetContent, WorksheetBuilderProps, WorksheetListProps

### Community 25 - "Community 25"
Cohesion: 0.52
Nodes (5): getChromaCollection(), buildChromaMetadata(), buildDocumentText(), ingestAsset(), removeAsset()

### Community 26 - "Community 26"
Cohesion: 0.43
Nodes (4): activityLabels, capitalize(), WorksheetTemplate(), WorksheetTemplateProps

### Community 27 - "Community 27"
Cohesion: 0.53
Nodes (5): bytes, cp1252_bytes(), main(), str, repair_mojibake()

### Community 28 - "Community 28"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (5): days, generatedAt, id, month, provenance

### Community 30 - "Community 30"
Cohesion: 0.83
Nodes (3): blocksToWorksheet(), normalizeForDirty(), WorksheetBuilder()

## Knowledge Gaps
- **269 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+264 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Path` connect `Community 10` to `Community 0`, `Community 1`, `Community 2`, `Community 5`, `Community 20`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `Subject` connect `Community 22` to `Community 0`, `Community 1`, `Community 5`, `Community 9`, `Community 11`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 21`, `Community 30`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `Grade` connect `Community 22` to `Community 0`, `Community 1`, `Community 9`, `Community 11`, `Community 13`, `Community 15`, `Community 16`, `Community 17`, `Community 21`, `Community 30`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06433566433566433 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07256894049346879 - nodes in this community are weakly interconnected._