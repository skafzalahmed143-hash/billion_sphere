# Billion Sphere Backend

Microservices backend for the Billion Sphere Super App.

## Project Structure

The project follows a monorepo-style structure with separate applications in `apps/`:

- **apps/auth**: Authentication Service (SSO, User Management) - Port 3001
- **apps/wallet**: Wallet & Transaction Service - Port 3002
- **apps/marketiqon**: Marketing Application Service - Port 3003
- **apps/buyla**: E-commerce Application Service - Port 3004
- **apps/admin**: Admin Panel Service - Port 3005
- **shared/**: Shared libraries, middleware, and utilities.

## Prerequisites

- Node.js v18+
- PostgreSQL

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Environment**
    - Copy `.env` example or ensure `.env` exists.
    - Update `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in `.env`.
    - Default DB Name: `billion_sphere_db`

3.  **Run Services**
    You can run services individually:
    ```bash
    npm run start:auth
    npm run start:wallet
    # ... and so on
    ```
    
    Or the main gateway:
    ```bash
    npm run start:gateway
    ```

## Verification
Run the verification script to check database connection and model sync:
```bash
npm run verify
```
