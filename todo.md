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
    - [ ] Fastify Setup
      - [ ] App instance
      - [ ] Register plugins
        - [ ] @fastify/cookie
        - [ ] @fastify/jwt
        - [ ] @fastify/cors
      - [ ] Zod validation
      - [ ] Global error handler
      - [ ] Graceful shutdown

    - [ ] Authentication Strategy
      - [ ] Access Token
        - [ ] Short expiration (e.g., 15m)
        - [ ] Signed with ACCESS_SECRET
        - [ ] Sent in Authorization header

      - [ ] Refresh Token
        - [ ] Long expiration (e.g., 7d)
        - [ ] Signed with REFRESH_SECRET
        - [ ] Stored in httpOnly cookie
        - [ ] Token rotation strategy
        - [ ] Revoke strategy (if persistent)

    - [ ] Controllers
      - [ ] CreateOrgController
      - [ ] AuthenticateOrgController
      - [ ] RefreshTokenController
      - [ ] CreatePetController
      - [ ] GetPetController

    - [ ] Factories (inside HTTP layer)
      - [ ] makeCreateOrgController
      - [ ] makeAuthenticateController
      - [ ] makeRefreshTokenController
      - [ ] Inject Prisma repositories
      - [ ] Inject JWT service

    - [ ] Middlewares
      - [ ] verifyJWT (access token)
      - [ ] verifyRefreshToken
      - [ ] Auth guard for protected routes

    - [ ] Cookie Configuration
      - [ ] httpOnly
      - [ ] secure (prod only)
      - [ ] sameSite strategy
      - [ ] path configuration

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
