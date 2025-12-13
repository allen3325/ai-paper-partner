# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Paper Partner is a React-based frontend application for an AI-powered research paper reading assistant. The application allows users to manage research projects, upload papers, and interact with an AI chatbot to analyze and discuss academic papers.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173

# Build & Preview
npm run build            # Type check with tsc then build with Vite
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Architecture

### State Management Pattern

The application uses React Context API for global state management with two primary contexts:

1. **ProjectContext** (`src/contexts/ProjectContext.tsx`):
   - Manages current project selection
   - Stores all projects with their metadata
   - Provides `switchProject()` and `createProject()` actions
   - All project data is currently mock data stored in memory

2. **ChatContext** (`src/contexts/ChatContext.tsx`):
   - Manages chat messages history
   - Tracks AI typing state
   - Manages selected papers for chat context
   - Provides `sendMessage()`, `removePaper()`, and `addPaper()` actions

**Important**: Both contexts wrap the entire app in `App.tsx`. State is reset on page reload since there's no persistence layer yet.

### Service Layer Architecture

All API calls are isolated in `src/services/api.ts`. This is a **critical integration point** - all services currently return mock data with simulated delays. When integrating with the backend:

- Replace Promise-based mock implementations with actual HTTP calls
- Use the pre-installed `axios` library for requests
- Maintain the same interface signatures to avoid breaking component code
- The service layer exports: `chatService`, `projectService`, `paperService`, `settingsService`

### Routing Structure

The app uses React Router v7 with the following routes defined in `App.tsx`:
- `/` → redirects to `/chat`
- `/chat` → Main chat interface
- `/projects` → Project management and creation
- `/upload` → Paper upload interface
- `/papers` → Paper library management
- `/settings` → Model and RAG configuration

All pages are wrapped in `AppLayout` which provides consistent sidebar navigation and header.

### TypeScript Configuration

**Critical**: The project uses `verbatimModuleSyntax: true` in `tsconfig.app.json`. This means:
- Type-only imports MUST use `import type { ... }` syntax
- Example: `import type { Project } from '@/types'`
- Failing to do this will cause runtime errors

Path aliases are configured:
- `@/*` maps to `./src/*`
- Always use `@/` imports instead of relative paths

### Component Organization

**UI Components** (`src/components/ui/`):
- Reusable, unstyled-by-default components
- Use Tailwind CSS with the `cn()` utility for class merging
- Export named components (not default exports)

**Layout Components** (`src/components/layout/`):
- `AppLayout`: Wraps all pages, combines Sidebar + Header + content area
- `Sidebar`: Navigation with active state tracking via React Router
- `Header`: Takes a `title` prop, displays page title

**Page Components** (`src/pages/`):
- Each page is a complete view that uses `AppLayout`
- Pages manage their own local state
- Pages interact with contexts for global state
- All pages export named functions

## Styling System

- **Tailwind CSS v4** with custom configuration in `index.css`
- **Inter font** loaded from Google Fonts
- Custom color palette using CSS variables (support for light/dark mode)
- Use the `cn()` utility from `src/utils/cn.ts` to merge Tailwind classes with conditional logic
- Lucide React for icons (NOT emoji - except in project icons where intentional)

## Key Implementation Details

### Mock Data Strategy

All interactive features currently use mock implementations:
- Button clicks trigger `alert()` calls to demonstrate functionality
- API calls use `setTimeout()` to simulate network delays
- Data persists only in React Context (lost on page refresh)

This is intentional to allow frontend development to proceed independently of backend work.

### Type Definitions

All TypeScript interfaces are centralized in `src/types/index.ts`:
- `Project`, `Paper`, `Message` - domain models
- `ModelSettings`, `RAGSettings`, `Settings` - configuration types
- `ApiResponse<T>` - generic API response wrapper

When adding new types, add them to this central file and export them.

### Future Integration Points

The codebase is prepared for integration with:
1. **TanStack React Query** - installed but not yet used, ready for API state management
2. **Axios** - installed but not yet used, ready for HTTP requests
3. Backend API endpoints - replace implementations in `src/services/api.ts`

### Code Style

- Components use named exports (not default)
- Props interfaces are defined inline or immediately before the component
- Functional components with TypeScript
- Hooks follow React naming conventions (`use*`)
- ESLint and Prettier are configured - run them before committing
