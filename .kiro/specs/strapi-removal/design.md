# Design Document

## Overview

This design outlines the migration strategy from a Strapi-based backend to a standalone Next.js application. The migration will replace all Strapi API calls with static data sources, local JSON files, and Next.js API routes where dynamic functionality is needed.

## Architecture

### Current Architecture

- Next.js frontend consuming Strapi REST APIs
- Strapi backend running on localhost:1337
- Multiple API service files handling different content types
- Redux store for client-side state management

### Target Architecture

- Standalone Next.js application with App Router
- Static JSON data files for content
- Next.js API routes for dynamic functionality (forms, authentication)
- Maintained Redux store for client-side state
- File-based content management for easy updates

## Components and Interfaces

### Data Migration Strategy

#### Static Content (JSON Files)

Content that rarely changes will be moved to static JSON files in a `data/` directory:

- Blog posts (`data/blog.json`)
- Testimonials (`data/testimonials.json`)
- Team members (`data/team.json`)
- Company values (`data/values.json`)
- Features (`data/features.json`)
- Services (`data/services.json`)
- Portfolio items (`data/portfolio.json`)
- Pricing plans (`data/pricing.json`)
- Tech stack (`data/techstack.json`)
- Stats (`data/stats.json`)
- Podcasts (`data/podcasts.json`)

#### Dynamic Content (API Routes)

Interactive features will use Next.js API routes:

- Newsletter subscription (`/api/newsletter`)
- Contact form (`/api/contact`)
- Testimonial submission (`/api/testimonials`)
- User authentication (`/api/auth/*`)
- Comments system (`/api/comments`)

### Service Layer Refactoring

#### New Data Service Architecture

```typescript
// src/services/dataService.ts
export async function getStaticData<T>(dataType: string): Promise<T[]>;
export async function getStaticItem<T>(
  dataType: string,
  id: number
): Promise<T>;

// src/services/apiService.ts (refactored)
// Only for dynamic API routes, not Strapi
export async function postData<T>(endpoint: string, data: any): Promise<T>;
```

#### Content Type Interfaces

All existing TypeScript interfaces will be maintained:

- `BlogPost`, `Testimonial`, `TeamMember`, etc.
- Ensures type safety during migration
- No breaking changes to component contracts

### File Structure Changes

#### New Directories

```
data/
├── blog.json
├── testimonials.json
├── team.json
├── values.json
├── features.json
├── services.json
├── portfolio.json
├── pricing.json
├── techstack.json
├── stats.json
└── podcasts.json

app/api/
├── newsletter/route.ts
├── contact/route.ts
├── testimonials/route.ts
└── auth/
    ├── login/route.ts
    └── register/route.ts
```

#### Removed Directories

- `strapi-backend/` (entire directory)
- Strapi-specific service files will be refactored

## Data Models

### Static Data Format

JSON files will follow this structure to maintain compatibility:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Example",
      "content": "...",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "page": 1,
      "pageSize": 10
    }
  }
}
```

### API Response Format

Next.js API routes will maintain Strapi-compatible response format:

```typescript
export interface ApiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: {
      total: number;
      page: number;
      pageSize: number;
    };
  };
  error?: string;
}
```

## Error Handling

### Static Data Loading

- Graceful fallbacks for missing JSON files
- Default empty arrays/objects for missing data
- Build-time validation of JSON structure

### API Route Error Handling

- Consistent error response format
- Proper HTTP status codes
- Client-side error boundaries maintained

### Migration Error Prevention

- Type checking during data conversion
- Validation schemas for JSON data
- Automated testing for API compatibility

## Testing Strategy

### Data Migration Testing

- Unit tests for data service functions
- Integration tests for API routes
- Visual regression tests for UI components

### Compatibility Testing

- Ensure all existing components work with new data sources
- Test pagination, filtering, and search functionality
- Verify form submissions work with new API routes

### Performance Testing

- Compare load times before/after migration
- Test static data loading performance
- Validate build-time optimizations

## Migration Phases

### Phase 1: Infrastructure Setup

- Create data directory structure
- Set up new service layer
- Create API route templates

### Phase 2: Static Content Migration

- Export data from Strapi to JSON files
- Update service calls to use static data
- Test component functionality

### Phase 3: Dynamic Feature Migration

- Implement Next.js API routes
- Update form handling
- Migrate authentication system

### Phase 4: Cleanup and Optimization

- Remove Strapi dependencies
- Delete backend directory
- Optimize bundle size and performance

## Security Considerations

### API Route Security

- Input validation for all form submissions
- Rate limiting for public endpoints
- CSRF protection for authenticated routes

### Data Security

- Sanitize static data during migration
- Secure storage of sensitive configuration
- Environment variable management

## Performance Optimizations

### Static Data Benefits

- Faster page loads (no API calls)
- Better SEO with static content
- Reduced server dependencies

### Build-Time Optimizations

- JSON data bundling
- Image optimization
- Code splitting maintenance
