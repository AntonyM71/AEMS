# AEMS Web Application

## Overview

The AEMS Web Application is a React-based frontend for the Athlete and Event Management System. It provides interfaces for competition management, scoring, and result viewing.

## Technology Stack

-   React
-   TypeScript
-   Redux Toolkit (state management)
-   Material-UI (component library)
-   Jest & React Testing Library
-   RTK Query (API integration)

## Getting Started

### Prerequisites

-   Node.js 16+
-   npm

### Development Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start development server:

    ```bash
    npm start
    ```

Access the application at `http://localhost:3000`

## Project Structure

```
Webapp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── competition/     # Competition management
│   │   ├── judging/        # Scoring interface
│   │   ├── roles/          # Role-specific components
│   │   └── ScoresheetBuilder/
│   ├── pages/              # Route components
│   ├── redux/              # State management
│   │   ├── atoms/         # State slices
│   │   └── services/      # API integration
│   ├── utils/             # Shared utilities
│   └── mocks/             # Test mocks
```

## Available Scripts

### Development

```bash
# Start development server
npm start

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage

# Build for production
npm run build
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lintfix

# Format code with Prettier
npm run prettierfix
```

## Key Components

### Competition Management

-   `CompetitionSelector`: Competition selection and management
-   `EventSelector`: Event management interface
-   `HeatSelector`: Heat management and scoring
-   `PhaseSelector`: Competition phase control

### Scoring Interface

-   `ScribePage`: Main scoring interface
-   `BonusChip`: Bonus point management
-   `MoveCard`: Individual move scoring
-   `InfoBar`: Competition status display

### Admin Tools

-   `ScoresheetBuilder`: Scoresheet configuration
-   `MakeHeatPDFs`: Result generation
-   `UploadCsv`: Data import interface

## State Management

### Redux Store Structure

-   `competitions`: Competition data and state
-   `scoring`: Active scoring session state
-   `utilities`: Shared UI state

### RTK Query

API integration is handled through RTK Query services:

-   `aemsApi`: Main application API
-   Automatic caching and invalidation
-   Real-time updates via WebSocket

## Testing

### Component Testing

-   Tests located alongside components in `__tests__` directories
-   Use React Testing Library for component testing
-   Mock service worker for API mocking

### Test Utilities

-   `testUtils.tsx`: Common test utilities and wrappers
-   Custom render functions with providers
-   Common test data and mocks

## Development Tools

### VSCode Extensions

-   ESLint
-   Prettier
-   TypeScript and JavaScript Language Features
-   Jest Runner

### Environment Configuration

-   `.env.development`: Development settings
-   `.env.production`: Production settings

## Performance Considerations

-   Lazy loading for route components
-   Memoization for expensive computations
-   RTK Query for efficient API caching
-   Optimized re-renders using React.memo

## Browser Support

-   Chrome/Edge (latest 2 versions)
-   Firefox (latest 2 versions)
-   Safari (latest 2 versions)

Optimized for tablet/touch interfaces

## Contributing

1. Follow TypeScript best practices
2. Add tests for new components
3. Update documentation for new features
4. Maintain consistent code style
