# Billion Sphere Microservices

## Services

- `gateway` (port `3000`)
- `services/auth-service` (port `4001`)
- `admin-panel` (port `5000`)
- `services/marketiqon-service` (port `4101`)
- `services/buyla-service` (port `4102`)
- `services/ledgira-service` (port `4103`)
- `services/tripora-service` (port `4104`)
- `services/foodelt-service` (port `4105`)
- `services/gamorax-service` (port `4106`)
- `services/stoxenova-service` (port `4107`)
- `services/crealooma-service` (port `4108`)

## Install

```bash
npm run install:all
```

## Database Setup

Run migrations to set up the PostgreSQL schema:

```bash
npm run db:migrate
```

## Run

```bash
npm run dev
```

## Auth Login

- `email_id`: `test@gmail.com`
- `password`: `test@123`

Endpoint:

```http
POST /api/auth/login
```

Request:

```json
{
  "email_id": "test@gmail.com",
  "password": "test@123",
  "platform": "web",
  "device_id": "browser_01",
  "device_unique_id": "ABC-123-XYZ",
  "device_details": "Chrome on Windows 11"
}
```

## App Endpoints (via gateway)

Protected routes require `Authorization: Bearer <token>`.

- `GET /api/apps/marketiqon/overview`
- `GET /api/apps/marketiqon/profile`
- `GET /api/apps/buyla/overview`
- `GET /api/apps/buyla/profile`

## Response Format (All APIs)

Standardized response structure across all microservices:

```json
{
  "status": 1,
  "message": "Application overview fetched successfully",
  "data": {},
  "errors": null
}
```
> [!NOTE]
> `status: 1` indicates success, while `status: 0` indicates an error or validation failure.
