# Spec Delta

## Purpose

Guards bulk deletion of scored moves against accidentally wiping every scored move, by requiring at least one filter.

## ADDED Requirements

### Requirement: A bulk scored-moves deletion requires at least one filter
Deleting scored moves in bulk SHALL require at least one of a heat filter or an athlete filter. A request with neither SHALL be rejected before any scored moves are deleted.

#### Scenario: No filter provided
- **WHEN** a bulk scored-moves deletion is requested with neither a heat filter nor an athlete filter
- **THEN** the request is rejected and no scored moves are deleted

### Requirement: Combined filters narrow the deletion to their intersection
When both a heat filter and an athlete filter are given, only scored moves matching both SHALL be deleted.

#### Scenario: Both filters provided
- **WHEN** a bulk scored-moves deletion is requested with both a heat filter and an athlete filter
- **THEN** only scored moves matching both filters are deleted

### Requirement: The deletion reports how many scored moves were removed
A bulk scored-moves deletion SHALL report the number of scored moves it deleted, including zero when no scored moves matched the filters.

#### Scenario: No scored moves match the filters
- **WHEN** a bulk scored-moves deletion's filters match no existing scored moves
- **THEN** the request succeeds and reports zero deleted
