## ✅ Project Structure

- [x] Create application layers
  - [x] Domain
    - [x] Pet
      - [x] Entities
      - [x] Value Objects
        - [x] Energy
    - [x] Org
      - [x] Entities
    - [x] Shared
      - [x] Email Value Object
    - [x] Errors

  - [x] Application
    - [x] Use Cases
      - [x] Create org
      - [x] Authenticate org
      - [x] Create pet
      - [x] Get single pet
      - [x] Refresh token
      - [x] Test all use cases
    - [x] DTOs
    - [x] Mappers
    - [x] Ports
      - [x] OrgRepository
      - [x] PetRepository
      - [x] TokenService
    - [x] Application Errors

  - [x] Infra
    - [x] In-memory repositories
      - [x] Pet
      - [x] Org

    - [x] Prisma
      - [x] Schema
        - [x] Pet model
        - [x] Org model
        - [ ] RefreshToken model (if persistent strategy)
      - [x] Prisma repositories
        - [x] PrismaPetRepository
        - [x] PrismaOrgRepository
      - [x] Database connection
      - [x] Run migrations

    - [x] Database
      - [x] PostgreSQL (Docker)
      - [x] docker-compose.yml
      - [x] Env configuration

  - [ ] HTTP
    - [x] Fastify Setup
      - [x] App instance
      - [x] Register plugins
        - [x] @fastify/cookie
        - [x] @fastify/jwt
        - [x] @fastify/cors
      - [ ] Zod validation
      - [ ] Global error handler
      - [ ] Graceful shutdown

    - [x] Authentication Strategy
      - [x] Access Token
        - [x] expiration (e.g., 7d)
        - [x] Signed with ACCESS_SECRET
        - [x] Sent in Authorization header

      - [x] Refresh Token
        - [x] Long expiration (e.g., 30d)
        - [x] Signed with REFRESH_SECRET
        - [x] Stored in httpOnly cookie
        - [x] Token rotation strategy
        - [ ] Revoke strategy (if persistent)

    - [x] Controllers
      - [x] CreateOrgController
      - [x] AuthenticateOrgController
      - [x] RefreshTokenController
      - [x] CreatePetController
      - [x] GetPetController
      - [x] FindPetByLocationController

    - [ ] Factories (inside HTTP layer)
      - [x] makeCreateOrgController
      - [x] makeAuthenticateController
      - [ ] makeRefreshTokenController
      - [x] Inject Prisma repositories
      - [x] Inject JWT service

    - [x] Middlewares
      - [x] verifyJWT (access token)
      - [x] verifyRefreshToken
      - [x] Auth guard for protected routes

    - [x] Cookie Configuration
      - [x] httpOnly
      - [ ] secure (prod only)
      - [x] sameSite strategy
      - [x] path configuration

  - [ ] E2E Tests
    - [ ] Auth flow
      - [ ] Should login and set refresh cookie
      - [ ] Should refresh token
      - [ ] Should reject expired refresh token
      - [ ] Should reject tampered token

    - [ ] Protected routes
      - [ ] Should deny without access token
      - [ ] Should allow with valid token

    - [ ] Pet routes
      - [ ] Create pet (authenticated)
      - [ ] Get pet
