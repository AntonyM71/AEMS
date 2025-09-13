# Competition Workflow Guide

## Overview

This document outlines the complete workflow for managing a freestyle kayaking competition using AEMS, from setup to final results.

## Pre-Competition Setup

### 1. System Preparation
- Set up network topology (see [Network Topology Guide](../deployment/network-topology.md))
- Start AEMS on server laptop: `docker compose up`
- Connect all judge tablets to network
- Test WebSocket connections on all devices

### 2. Competition Data Import
- Receive athlete registration data (CSV format)
- Head Judge uploads CSV via admin interface
- System validates and creates competition structure
- Verify athlete list and heat assignments

### 3. Role Assignment
- Head Judge assigns scribe roles to tablets
- Each device logs in with assigned role
- Verify each judge can access their scoring interface

## Competition Execution

### 4. Phase Management
- Head Judge creates competition phases as needed
- Athletes are progressed through phases based on performance
- System tracks athlete advancement automatically

### 5. Scoring Workflow

#### For Judges/Scribes:
1. Select active heat from interface
2. Score athletes as they perform runs
3. Enter scores using touch-optimized interface
4. Use undo functionality to correct mistakes
5. Submit scores when complete

#### For Head Judge:
1. Monitor all scoring in real-time
2. Review submitted scores for accuracy
3. Lock in scores to finalize them
4. Resolve any scoring disputes offline (ICF process)

### 6. Real-Time Updates
- All connected devices receive live score updates
- Competition status displayed on result screens
- WebSocket connections maintain synchronization

## Results and Documentation

### 7. PDF Generation
Head Judge can generate PDFs for:
- **Heat Results**: Individual heat scoresheets
- **Phase Results**: Summary of phase outcomes
- **Competition Results**: Final rankings and scores

PDFs can be regenerated at any time if corrections are needed.

### 8. Data Export
- Export final results in CSV format
- Archive competition data for records
- Generate reports for competition organizers

## Error Handling and Recovery

### Common Scenarios

#### Network Disconnection
- Devices queue scores locally
- UI shows disconnected state
- Automatic reconnection when network restored
- Scores synchronized after reconnection

#### Scoring Mistakes
- Judges can undo recent entries
- Head Judge can review and correct scores
- System maintains audit trail of changes

#### Device Failure
- Backup devices should be available
- Competition data preserved on server
- New device can take over role immediately

#### Scoring Disputes
- Handle disputes using standard ICF procedures
- Use system data as reference
- Head Judge makes final decisions
- Update scores in system as needed

## Post-Competition

### 9. Final Results
- Generate final PDF reports
- Export data for archival
- Verify all scores are locked in
- Distribute results to participants

### 10. System Shutdown
- Ensure all data is saved
- Export final backup
- Gracefully stop services
- Document any issues for future reference

## User Roles and Permissions

### Head Judge
- Full system access
- Competition setup and management
- Score review and approval
- PDF generation
- User role assignment

### Judge/Scribe
- Scoring interface access
- Score entry and modification
- Heat selection
- Real-time score viewing

### Display/Spectator
- Read-only access to results
- Live score updates
- No scoring capabilities

## Best Practices

### Before Competition
- Test all devices and connections
- Train judges on scoring interface
- Verify athlete data accuracy
- Prepare backup devices

### During Competition
- Monitor network status
- Keep devices charged
- Regular score backups
- Clear communication protocols

### After Competition
- Archive all data
- Generate complete results package
- Document lessons learned
- Plan improvements for next event

## Integration with ICF Procedures

AEMS supports standard ICF competition procedures:
- Score validation and approval workflows
- Dispute resolution processes
- Official result documentation
- Audit trail maintenance

The system provides data and tools to support these procedures but does not replace official ICF judgment protocols.