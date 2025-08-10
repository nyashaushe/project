# Implementation Plan

- [x] 1. Set up data directory structure and create static JSON files
  - Create `data/` directory in project root
  - Create empty JSON files for all content types (blog, testimonials, team, etc.)
  - Define consistent JSON structure matching Strapi response format
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 2. Create new data service layer for static content
  - Implement `src/services/dataService.ts` with functions to read static JSON files
  - Create `getStaticData<T>()` and `getStaticItem<T>()` functions
  - Add error handling for missing files and malformed JSON
  - Write unit tests for data service functions
  - _Requirements: 3.1, 3.2, 3.3, 4.1_

- [x] 3. Migrate blog service to use static data
  - Update `src/services/api/blog.ts` to use new data service instead of Strapi API
  - Implement pagination, filtering, and search functionality for static data
  - Populate `data/blog.json` with sample blog post data
  - Test blog components work with new data source
  - _Requirements: 3.1, 2.1, 2.2_

- [x] 4. Migrate testimonials service to use static data
  - Update `src/services/api/testimonial.ts` to use static data for fetching
  - Populate `data/testimonials.json` with sample testimonial data
  - Test testimonial components display correctly
  - _Requirements: 3.2, 2.1, 2.2_

- [x] 5. Migrate team and company data services
  - Update `src/services/api/about.ts` to use static data
  - Populate `data/team.json` and `data/values.json` with sample data
  - Test About page components work with new data sources
  - _Requirements: 3.1, 3.2, 2.1, 2.2_

- [x] 6. Migrate remaining content services to static data
  - Update `src/services/api/features.ts` to use dataService instead of apiService
  - Update `src/services/api/services.ts` to use dataService instead of apiService
  - Update `src/services/api/portfolio.ts` to use dataService instead of apiService
  - Update `src/services/api/pricing.ts` to use dataService instead of apiService
  - Update `src/services/api/techstack.ts` to use dataService instead of apiService
  - Update `src/services/api/stats.ts` to use dataService instead of apiService
  - Update `src/services/api/podcast.ts` to use dataService instead of apiService
  - Test all related components render correctly with static data
  - _Requirements: 3.1, 3.2, 2.1, 2.2_

- [x] 7. Create Next.js API routes for dynamic functionality
  - Create `app/api/` directory structure
  - Create `app/api/newsletter/route.ts` for newsletter subscriptions
  - Create `app/api/contact/route.ts` for contact form submissions
  - Create `app/api/testimonials/route.ts` for testimonial submissions
  - Implement proper error handling and validation in API routes
  - _Requirements: 3.4, 2.2, 2.3_

- [x] 8. Implement authentication API routes
  - Create `app/api/auth/login/route.ts` for user login
  - Create `app/api/auth/register/route.ts` for user registration
  - Update `src/services/api/auth.ts` to use new API routes instead of Strapi
  - Test authentication flow works correctly
  - _Requirements: 3.4, 2.2, 2.3_

- [x] 9. Update form components to use new API routes
  - Update newsletter form to submit to `/api/newsletter`
  - Update contact form to submit to `/api/contact`
  - Update testimonial submission form to use `/api/testimonials`
  - Test all forms submit successfully and handle errors properly
  - _Requirements: 2.2, 2.3_

- [x] 10. Remove Strapi dependencies from package.json
  - Remove `@strapi/plugin-color-picker` from dependencies
  - Remove `@strapi/plugin-seo` from dependencies
  - Remove `strapi-plugin-menus` from dependencies
  - Remove `strapi-plugin-navigation` from dependencies
  - Remove `strapi-plugin-preview-button` from dependencies
  - Remove Strapi-related scripts from package.json (`dev:backend`, `dev:all`)
  - _Requirements: 4.2, 4.4_

- [ ] 11. Clean up Strapi-related code and files
  - Delete `src/lib/strapiApi.ts` file
  - Replace `src/services/api/apiService.ts` with non-Strapi implementation or remove entirely
  - Remove unused imports and references to Strapi throughout codebase
  - Delete `strapi-backend/` directory entirely
  - _Requirements: 4.1, 4.3, 4.4_

- [ ] 12. Update environment variables and configuration
  - Remove `NEXT_PUBLIC_STRAPI_URL` from `.env` file
  - Remove all Strapi-related environment variables from `.env`
  - Update any configuration files that reference Strapi
  - Add any new environment variables needed for API routes
  - _Requirements: 4.1, 4.4_

- [ ] 13. Test complete application functionality
  - Run full application and test all pages load correctly
  - Test all forms submit successfully
  - Test authentication flow works end-to-end
  - Verify no console errors or broken functionality
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2_

- [ ] 14. Optimize performance and build process
  - Test application build completes without errors
  - Verify static data is properly bundled and optimized
  - Check page load times are improved without API calls
  - Run performance audits and address any issues
  - _Requirements: 5.1, 5.2, 5.3, 4.4_
