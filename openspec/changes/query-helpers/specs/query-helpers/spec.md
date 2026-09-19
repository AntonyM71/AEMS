# Spec Delta

## Purpose

Defines the shared filtering, ordering, and pagination rules that every CRUD list endpoint is built on.

## ADDED Requirements

### Requirement: An IN-filter is applied only when its values are given
For each column with a list of values to filter by, the query SHALL be restricted to rows whose column value is in that list only when the list is non-empty. A missing or empty list SHALL NOT restrict the query.

#### Scenario: A filter's value list is empty or missing
- **WHEN** a list endpoint is queried with no values, or an empty list of values, for one of its IN-filters
- **THEN** that column is not used to restrict the results

#### Scenario: A filter's value list is non-empty
- **WHEN** a list endpoint is queried with one or more values for one of its IN-filters
- **THEN** the results are restricted to rows whose column value is in that list

### Requirement: A range filter's bound applies whenever it is given, including zero
For each column with a lower and/or upper bound, the query SHALL be restricted to that bound whenever the bound is given, including a bound of zero. A bound that is not given SHALL NOT restrict the query.

#### Scenario: A bound of zero is given
- **WHEN** a list endpoint is queried with a range bound of zero
- **THEN** that bound is applied to the results

#### Scenario: A bound is not given
- **WHEN** a list endpoint is queried without one of a column's range bounds
- **THEN** that bound does not restrict the results

### Requirement: Ordering matches the first sortable key a requested string contains
For each requested order-by string, the query SHALL be ordered by the first sortable column, in that endpoint's defined order, whose key is contained within the requested string (case-insensitive). The order SHALL be descending when the requested string contains "desc", and ascending otherwise.

#### Scenario: A requested string matches a sortable key
- **WHEN** a list endpoint is queried with an order-by string that contains a sortable column's key
- **THEN** the results are ordered by that column, in the first matching key's order among the sortable columns

#### Scenario: A requested string requests descending order
- **WHEN** a list endpoint's order-by string contains "desc"
- **THEN** the matched column is ordered descending

### Requirement: An unrecognized order-by string leaves that request's ordering unapplied
When a requested order-by string matches none of an endpoint's sortable keys, that string SHALL NOT add any ordering to the query, and no error SHALL be raised.

#### Scenario: An order-by string matches nothing
- **WHEN** a list endpoint is queried with an order-by string that matches none of its sortable keys
- **THEN** the query is not ordered by that string, and the request still succeeds

### Requirement: A default ordering applies only when no ordering is requested
When a list endpoint defines a default ordering and no order-by strings are given, the query SHALL be ordered by that default. When at least one order-by string is given, the default SHALL NOT be applied.

#### Scenario: No ordering is requested
- **WHEN** a list endpoint that defines a default ordering is queried with no order-by strings
- **THEN** the results are ordered by that default

### Requirement: Pagination bounds apply whenever they are given, including zero
An offset or limit SHALL be applied to a list query whenever it is given, including a value of zero. An offset or limit that is not given SHALL NOT restrict the query.

#### Scenario: An offset or limit of zero is given
- **WHEN** a list endpoint is queried with an offset or limit of zero
- **THEN** that bound is applied to the results

#### Scenario: An offset or limit is not given
- **WHEN** a list endpoint is queried without an offset or a limit
- **THEN** that bound does not restrict the results
