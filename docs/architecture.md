# Architecture Documentation (arc42)

## 1. Introduction and Goals

### System Purpose

AEMS (Athlete and Event Management System) manages freestyle kayaking competitions: scoring, judging, and competition workflow, across phases, heats, and individual runs. It supports multiple roles, including judges, scribes, and administrators.

### Quality Goals

1. **Reliability**: Ensure accurate scoring and competition data management
2. **Real-time Capability**: Provide immediate updates for competition progress
3. **Network Resilience**: Handle local network disconnections gracefully
4. **Usability**: Intuitive interfaces for different user roles
5. **Scalability**: Handle multiple concurrent users and competitions
6. **Flexibility**: Support different scoring systems and competition formats

### Stakeholders

- Competition Organizers
- Head Judges
- Judges/Scribes
- Athletes
- Technical Administrators
- Spectators/Audience

## 2. Architecture Constraints

### Technical Constraints

- Web-based application for cross-platform compatibility
- Modern browser support required
- Local network connectivity (no internet required)
- Docker containerization for deployment
- Touch-optimized interface for tablet devices

### Organizational Constraints

- Must support multiple concurrent competitions
- Role-based access control
- Audit trail for scoring changes
- Integration with ICF competition procedures
- Offline network operation for competition venues

## 3. System Scope and Context

### System Context Diagram

```mermaid
C4Context
    Person(admin, "Competition Admin", "Manages events and uploads participant data")
    Person(headJudge, "Head Judge", "Reviews and oversees scoring")
    Person(judge, "Judge", "Inputs scores for athletes")
    Person(athlete, "Athlete", "Views results and PDF outputs")

    System(aems, "AEMS", "Provides scoring, real-time results, and competition workflow for freestyle kayaking events")
    System_Ext(registration, "External Registration System", "Provides initial competition data as CSV")

    Rel(admin, aems, "Manages competitions and uploads CSV data using")
    Rel(judge, aems, "Inputs scores using")
    Rel(aems, headJudge, "Provides judges' scores to")
    Rel(aems, athlete, "Generates PDF outputs for")
    Rel(registration, aems, "Provides initial athlete & event data to", "CSV")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

The system context diagram shows the key users and their interactions with AEMS:

- **Head Judge**: Manages competition setup, reviews scores, generates reports
- **Judge/Scribe**: Inputs scores for athletes using touch interface
- **Athlete**: Views results and receives PDF outputs
- **Display Devices**: Show real-time results to spectators
- **External Registration System**: Provides initial competition data via CSV

### Business Context

The system operates in the context of freestyle kayaking competitions, managing:

- Competition creation and configuration from CSV data
- Participant registration and heat management
- Real-time scoring with judge validation
- Score review and approval by Head Judge
- Results calculation and publication
- PDF generation for official documentation

### Technical Context

- Frontend: React/TypeScript application with touch optimization
- Backend: Python FastAPI server with Socket.IO support
- Database: PostgreSQL (accessed via SQLAlchemy)
- Real-time updates via Socket.IO with automatic reconnection
- PDF generation for competition documentation
- Docker containers for consistent deployment
- Offline network operation (no internet required)

## 4. Solution Strategy

The solution follows these key principles:

1. **Offline-First Architecture**: Operates on local networks without internet
2. **Real-time Synchronization**: Socket.IO implementation with resilient reconnection
3. **Role-Based Design**: Components and interfaces tailored to user roles
4. **Touch-Optimized UI**: Designed for tablet and touchscreen devices
5. **Conflict Resolution**: Server-authoritative state with graceful conflict handling
6. **Modular Scoring System**: Flexible scoring logic for different competition types

## 5. Building Block View

### Level 1: System Overview

```mermaid
C4Container
    Person(admin, "Competition Admin")
    Person(judge, "Judge / Head Judge")
    Person(athlete, "Athlete")
    System_Ext(registration, "External Registration System")

    System_Boundary(aems, "AEMS") {
        Container(webApp, "React Web Application", "Next.js, TypeScript", "Role-based UI, real-time scoring, touch-optimized")
        Container(api, "FastAPI Backend", "Python, FastAPI, Socket.IO", "Business logic, scoring, PDF generation, real-time events")
        ContainerDb(database, "Database", "PostgreSQL", "Competition data, scores, audit log")
        Container(nginx, "Nginx", "Reverse proxy", "Routes web, API, and Socket.IO traffic")
        Container(graphicsServer, "Graphics Server", "Nginx, static files", "Serves broadcast overlay manifests and PNG frame packs")
    }

    Rel(admin, webApp, "Uploads CSV data and manages competitions using")
    Rel(judge, webApp, "Scores athletes using")
    Rel(nginx, webApp, "Routes to", "HTTP")
    Rel(nginx, api, "Routes to", "HTTP, Socket.IO")
    Rel(nginx, graphicsServer, "Routes overlay asset requests to", "HTTP")
    Rel(webApp, api, "Sends requests to / receives real-time updates from", "JSON/HTTPS, Socket.IO")
    Rel(api, database, "Reads from and writes to", "SQL")
    Rel(registration, api, "Provides data to", "CSV file upload")
    Rel(api, athlete, "Generates PDF outputs for")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

The container diagram shows the high-level technical components:

- **Web Application**: React/TypeScript frontend with real-time updates
- **API Server**: FastAPI backend with Socket.IO support
- **Database**: PostgreSQL database with audit logging
- **Reverse Proxy**: Nginx for request routing and static file serving
- **Graphics Server**: Separate Nginx instance serving broadcast overlay graphics packs (see ADR005), proxied by the main Nginx container

### Level 2: Building Blocks

#### Web Application

- Competition Management Components
- Role-based Interfaces (Head Judge, Judge/Scribe)
- Real-time Scoring Interface with touch optimization
- Socket.IO client with automatic reconnection
- PDF Generation Interface
- Offline data persistence and synchronization

#### API Server

- Competition Management Endpoints
- Scoring Logic Service with validation
- PDF Generation Service (Heat, Phase, Competition results)
- Socket.IO Handler with heartbeat and reconnection (see ADR006)
- Authentication and Role Management Service
- Conflict Resolution and State Synchronization

#### Database

- Competition Data and Structure
- Scoring Records with Audit Trail
- User Sessions and Role Assignments
- State Synchronization Metadata

#### Graphics Server

- Nginx instance, separate from the main stack, serving broadcast overlay graphics packs
- JSON component manifests under `/componentInfo/`
- PNG frame sequences under `/assets/`, rendered by a Pixi.js/WebGL React wrapper (see ADR005, ADR007)
- Runs as an optional Docker Compose stack, connected to the main stack over the shared `aems_shared` network

## 6. Runtime View

### Competition Setup Scenario

1. Head Judge uploads competition data (CSV)
2. System validates and processes athlete data
3. Competition structure created in database
4. Heats and phases automatically generated
5. UI updates with new competition data across all devices

### Real-time Scoring Scenario

1. Judge accesses scoring interface on tablet
2. Real-time score input with touch-optimized controls
3. Socket.IO broadcasts updates to all connected clients
4. Head Judge receives immediate notifications
5. Score validation and temporary storage
6. Head Judge reviews and locks in final scores
7. PDF generation available for results

### Network Disconnection Scenario

1. Device loses network connection during scoring
2. UI shows disconnected state with clear feedback
3. Scores queued locally in browser storage
4. Socket.IO attempts automatic reconnection
5. Connection restored with exponential backoff
6. Local scores synchronized with server state
7. Conflicts resolved (server state wins)
8. UI updates with current competition state

## 7. Deployment View

### Infrastructure Level 1

Docker-based deployment optimized for competition venues:

- Frontend Container (React application)
- Backend Container (FastAPI server with Socket.IO)
- Database Container (PostgreSQL with persistence)
- Nginx Container (Reverse proxy and static files)
- Graphics Server Container (optional, separate Compose stack; static overlay assets)

### Network Topology

Offline network configuration:
- Dedicated WiFi router with WPA3 security
- Server laptop with static IP (192.168.0.28)
- Judge tablets connected via WiFi
- Optional display devices for spectators
- No internet connection required

### Infrastructure Level 2

Network Configuration:
- Internal Docker network for service communication
- Exposed host ports: 81 (Nginx, the main entry point), 3000 (frontend), 8000 (API), and 82 (Graphics Server, if running)
- Socket.IO traffic proxied through Nginx over the same HTTP port as the rest of the app
- Database persistence via Docker volumes
- Network isolation for security

## 8. Cross-cutting Concepts

### Security

- Network isolation with offline operation
- Rate limiting and input validation
- SQL injection prevention
- XSS protection
- Role-based access control
- Audit logging for all score changes

### Network Resilience

- Socket.IO reconnection with exponential backoff
- Local data persistence during disconnections
- Automatic state synchronization on reconnect
- Graceful degradation of real-time features
- Clear user feedback for connection status

### User Interface

- Touch-optimized components for tablets
- Role-specific views and permissions
- Real-time updates with Socket.IO
- Responsive design for various screen sizes
- Offline-capable with local data persistence

### Data Consistency

- Server-authoritative architecture
- Conflict resolution with server precedence
- Audit trail for all scoring changes
- Transaction support for critical operations
- State validation on reconnection

### PDF Generation

- **Heat Results**: Individual heat scoresheets with judge scores
- **Phase Results**: Summary results for competition phases
- **Competition Results**: Final rankings and full results
- Manual generation by Head Judge or Admin
- Regeneration capability after score corrections
- Formatted for official documentation

## 9. Architecture Decisions

1. **React/TypeScript Frontend**
   - Type safety for complex scoring logic
   - Component reusability across roles
   - Rich ecosystem and touch support

2. **FastAPI Backend**
   - Async performance for Socket.IO handling
   - OpenAPI integration for documentation
   - Python ecosystem for data processing

3. **PostgreSQL Database**
   - ACID compliance for scoring integrity
   - JSON support for flexible schemas
   - Robust tooling and performance

4. **Socket.IO for Real-time Updates** (see ADR006, migrated from raw WebSockets)
   - Low-latency score broadcasting
   - Automatic reconnection capabilities built into the client
   - Heartbeat monitoring for connection health

5. **Offline Network Operation**
   - Eliminates internet dependencies
   - Improved reliability in competition venues
   - Enhanced security through isolation

6. **Docker Deployment**
   - Consistent environments across devices
   - Simplified deployment and scaling
   - Isolated service architecture

7. **Pixi.js/WebGL Broadcast Overlays** (see ADR005, ADR007)
   - GPU-accelerated playback of PNG frame-sequence graphics packs
   - Graphics packs hosted on a separate Nginx server, keeping licensed assets out of the open-source codebase
   - Reusable React wrapper for intro/hold/outro overlay animation

## 10. Quality Requirements

### Performance

- Sub-second response times for scoring operations
- Real-time score updates (< 500ms latency)
- Efficient PDF generation (< 10 seconds)
- Optimized database queries for competition data
- Support for ~5 concurrent users with minimal overhead

### Reliability

- Graceful handling of network disconnections
- Automatic reconnection with data synchronization
- Data consistency across all connected devices
- Audit trail for all scoring operations
- Backup and recovery capabilities

### Security

- Secure local network operation
- Role-based access control
- Input validation and sanitization
- Network isolation from external threats
- Audit logging for accountability

### Usability

- Touch-optimized interface for tablet devices
- Intuitive workflows for different user roles
- Clear feedback for system status
- Minimal learning curve for judges
- Accessible design principles

### Maintainability

- Modular architecture with clear separation
- Documentation kept current with the code
- Automated testing capabilities
- Version control and deployment procedures
- Clear error handling and logging

## 11. Risks and Technical Debt

### Risks

- Network reliability in competition venues
- Device battery life during long competitions
- Socket.IO connection stability under load (i.e., during peak usage, stress testing, or scenarios exceeding the typical ~5 concurrent users and ~10 requests/sec)
- Data synchronization conflicts
- Hardware failure of critical devices

### Mitigation Strategies

- Robust WiFi setup with adequate coverage
- Backup devices and power supplies
- Automatic reconnection and conflict resolution
- Manual backup procedures
- Clear escalation procedures for technical issues

### Technical Debt

- Integration test coverage expansion needed
- Performance optimization opportunities
- Enhanced conflict resolution strategies
- Mobile app development for broader access
- Advanced analytics and reporting features

## 12. Glossary

- **Heat**: A subdivision of a competition phase with specific athletes
- **Phase**: A stage in the competition (preliminaries, semifinals, finals)
- **Run**: An individual athlete's performance in a heat
- **Scribe**: User role for recording scores on behalf of judges
- **Head Judge**: User role for overseeing competition and approving scores
- **Scoresheet**: Template defining scoring criteria and structure
- **Lock In**: Head Judge action to finalize and approve scores
- **Socket.IO**: Real-time communication library, built on WebSocket with an HTTP long-polling fallback, used for live updates (see ADR006)
- **Offline Network**: Local network operation without internet connectivity
- **Graphics Pack**: A set of JSON component manifests and PNG frame sequences served by the Graphics Server for broadcast overlays (see ADR005)