# Graph Report - .  (2026-05-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 48 nodes · 44 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30971134`
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

## God Nodes (most connected - your core abstractions)
1. `gates` - 6 edges
2. `phase` - 4 edges
3. `next` - 4 edges
4. `direction` - 4 edges
5. `worksheet` - 4 edges
6. `template` - 4 edges
7. `caption` - 4 edges
8. `final` - 4 edges
9. `series` - 3 edges
10. `hooks` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (11 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.25
Nodes (7): lastUpdated, notes, series, active, completed, state, version

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (4): createdAt, date, id, updatedAt

### Community 2 - "Community 2"
Cohesion: 0.40
Nodes (5): gates, template, name, payload, status

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (4): phase, current, name, status

### Community 4 - "Community 4"
Cohesion: 0.50
Nodes (4): name, payload, status, caption

### Community 5 - "Community 5"
Cohesion: 0.50
Nodes (4): name, payload, status, direction

### Community 6 - "Community 6"
Cohesion: 0.50
Nodes (4): name, payload, status, final

### Community 7 - "Community 7"
Cohesion: 0.50
Nodes (4): worksheet, name, payload, status

### Community 8 - "Community 8"
Cohesion: 0.50
Nodes (4): next, description, name, phase

## Knowledge Gaps
- **33 isolated node(s):** `version`, `state`, `current`, `name`, `status` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `gates` connect `Community 2` to `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **Why does `direction` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `worksheet` connect `Community 7` to `Community 2`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `version`, `state`, `current` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._