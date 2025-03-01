# Architecture Documentation (arc42)

## 1. Introduction and Goals

### System Purpose

AEMS (Athletic Event Management System) is a comprehensive competition management system designed to handle athletic events, with a particular focus on scoring, judging, and competition workflow management. The system supports multiple roles (judges, scribes, administrators) and manages complex competition structures including phases, heats, and individual runs.

### Quality Goals

1. **Reliability**: Ensure accurate scoring and competition data management
2. **Real-time Capability**: Provide immediate updates for competition progress
3. **Usability**: Intuitive interfaces for different user roles
4. **Scalability**: Handle multiple concurrent users and competitions
5. **Flexibility**: Support different scoring systems and competition formats

### Stakeholders

- Competition Organizers
- Judges
- Scribes
- Athletes
- Technical Administrators
- Spectators/Audience

## 2. Architecture Constraints

### Technical Constraints

- Web-based application
- Modern browser support required
- Internet connectivity required for real-time updates
- Docker containerization for deployment

### Organizational Constraints

- Must support multiple concurrent competitions
- Role-based access control
- Audit trail for scoring changes

## 3. System Scope and Context

### System Context Diagram

![System Context](diagrams/structurizr-SystemContext.png)

The system context diagram shows the key users and their interactions with AEMS:

- **Competition Admin**: Manages events and uploads participant data
- **Head Judge**: Reviews and oversees scoring
- **Judge**: Inputs scores for athletes
- **Athlete**: Views results and PDF outputs
- **External Registration System**: Provides initial competition data

### Business Context

The system operates in the context of athletic competitions, managing:

- Competition creation and configuration
- Participant registration and management
- Real-time scoring and judging
- Results calculation and publication
- PDF generation for scoresheets

### Technical Context

- Frontend: React/TypeScript application
- Backend: Python FastAPI server
- Database: PostgreSQL (accessed via SQLAlchemy)
- Real-time updates via WebSocket
- PDF generation for documentation
- Docker containers for deployment

## 4. Solution Strategy

The solution follows these key principles:

1. **Microservices Architecture**: Separated frontend and backend services
2. **Real-time First**: WebSocket implementation for live updates
3. **Role-Based Design**: Components and interfaces tailored to user roles
4. **Modular Scoring System**: Flexible scoring logic for different competition types

## 5. Building Block View

### Level 1: System Overview

![Container Diagram](diagrams/structurizr-Containers.png)

The container diagram shows the high-level technical components:

- **Web Application**: React/TypeScript frontend application
- **API Server**: FastAPI backend service
- **Database**: PostgreSQL database
- **Reverse Proxy**: Nginx for request routing and static file serving

### Level 2: Building Blocks

#### Web Application

- Competition Management Components
- Role-based Interfaces (Judge, Scribe, Admin)
- Scoresheet Builder
- Real-time Score Display
- PDF Generation Interface

#### API Server

- Competition Management Endpoints
- Scoring Logic Service
- PDF Generation Service
- WebSocket Handler
- Authentication Service

#### Database

- Competition Data
- Scoring Records
- User Sessions
- Audit Logs

## 6. Runtime View

### Competition Setup Scenario

1. Admin uploads competition data (CSV)
2. System validates and processes data
3. Competition structure created in database
4. UI updates with new competition data

### Scoring Scenario

1. Judge accesses scoring interface
2. Real-time score input and validation
3. WebSocket updates to all connected clients
4. Score calculation and storage
5. PDF generation for results

## 7. Deployment View

### Infrastructure Level 1

Docker-based deployment with four main containers:

- Frontend Container (React application)
- Backend Container (FastAPI server)
- Database Container (PostgreSQL)
- Nginx Container (Reverse proxy)

### Infrastructure Level 2

Network Configuration:

- Internal Docker network
- Exposed ports for web access
- WebSocket connections
- Database persistence

## 8. Cross-cutting Concepts

### Security

- Network isolation
- Rate limiting
- Input validation
- Secure WebSocket connections
- SQL injection prevention
- XSS protection

### User Interface

- Touch-optimized components
- Role-specific views
- Real-time updates
- Responsive design

### Persistence

- PostgreSQL for structured data
- JSON fields for flexible schemas
- Transaction support
- Audit logging

### Communication and Integration

- RESTful APIs
- WebSocket for real-time updates
- CSV data import/export
- PDF generation

## 9. Architecture Decisions

1. **React/TypeScript Frontend**

   - Type safety
   - Component reusability
   - Rich ecosystem

2. **FastAPI Backend**

   - Async performance
   - OpenAPI integration
   - WebSocket support

3. **PostgreSQL Database**

   - ACID compliance
   - JSON support
   - Robust tooling

4. **Docker Deployment**
   - Consistent environments
   - Easy scaling
   - Simplified deployment

## 10. Quality Requirements

### Performance

- Sub-second response times
- Real-time score updates
- Efficient PDF generation
- Optimized database queries

### Security

- Secure data transmission
- Role-based access control
- Audit logging
- Input validation

### Availability

- High uptime during competitions
- Graceful degradation
- Automatic reconnection
- Data consistency

### Maintainability

- Modular architecture
- Comprehensive testing
- Clear documentation
- Version control

## 11. Risks and Technical Debt

### Risks

- Network reliability in competition venues
- Concurrent scoring conflicts
- Data synchronization issues
- PDF generation performance

### Technical Debt

- Test coverage expansion needed
- API version management
- Performance optimization opportunities
- Documentation updates

## 12. Glossary

- **Heat**: A subdivision of a competition phase
- **Phase**: A stage in the competition
- **Run**: An individual athlete's performance
- **Scribe**: User role for recording scores
- **Head Judge**: User role for overseeing scoring
- **Scoresheet**: Template for scoring criteria
