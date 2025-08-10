# House Agreement Application

## Overview

This is a full-stack web application for generating professional house lease agreements. Users can fill out a comprehensive form with tenant and property details, then preview and download the agreement in PDF or DOC format. The application features a modern React frontend with shadcn/ui components and an Express.js backend, designed to streamline the lease agreement creation process.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS custom properties for theming and dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form for form state management and validation
- **State Management**: TanStack Query for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Build System**: esbuild for production bundling
- **Development**: tsx for TypeScript execution in development
- **Storage Interface**: Abstracted storage layer with in-memory implementation (prepared for database integration)

### Document Generation
- **PDF Generation**: jsPDF library for client-side PDF creation
- **DOC Generation**: docx library for Microsoft Word document creation
- **File Download**: file-saver library for triggering browser downloads

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (currently using Neon serverless)
- **Migrations**: Drizzle Kit for schema migrations
- **Schema**: Shared schema definitions between frontend and backend

### Development Tooling
- **Bundler**: Vite with React plugin and runtime error overlay
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Linting**: ESM modules with modern JavaScript features
- **Environment**: Replit-optimized with cartographer plugin for development

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React integration for Vite
- **express**: Web application framework for Node.js
- **wouter**: Lightweight routing library for React
- **@tanstack/react-query**: Data fetching and caching library

### UI and Styling
- **@radix-ui/react-***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for constructing className strings

### Form Management
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation schema resolvers
- **drizzle-zod**: Type-safe schema validation integration

### Document Generation
- **jspdf**: Client-side PDF generation
- **docx**: Microsoft Word document creation
- **file-saver**: Cross-browser file downloading

### Database and Backend
- **drizzle-orm**: Type-safe SQL ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-kit**: Database toolkit for migrations and introspection
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **typescript**: Static type checking
- **tsx**: TypeScript execution engine
- **esbuild**: Fast JavaScript bundler
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Utility Libraries
- **date-fns**: Date utility library for formatting
- **nanoid**: Unique string ID generator
- **cmdk**: Command menu component