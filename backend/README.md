# RizMern API

Express and MongoDB API for public demo-class leads, admission requests, and protected admin operations.

## Requirements

- Node.js 18+ (Node.js 20 or newer recommended)
- npm
- MongoDB local instance or a MongoDB Atlas connection string

## Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set the values in `.env` before starting the server:

```dotenv
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/rizmern
JWT_SECRET=replace-with-a-random-secret-at-least-32-characters-long
CLIENT_URL=http://localhost:5173
ADMIN_NAME=RizMern Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
```

`CLIENT_URL` accepts a comma-separated allowlist, for example:

```dotenv
CLIENT_URL=http://localhost:5173,https://rizmern.example.com
```

Use a unique, randomly generated `JWT_SECRET` of at least 32 characters in production. Never commit `.env`; it is ignored by Git.

## Start

```powershell
npm run dev
```

The API listens on `http://localhost:5000`. The server connects to MongoDB before accepting requests. For production:

```powershell
npm start
```

The root endpoint returns `{"message":"RizMern API running"}` and `GET /api/health` is suitable for uptime checks.

Seed the first admin account after configuring `MONGO_URI`, `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`:

```powershell
npm run seed:admin
```

The seed command does not overwrite an existing admin. There is no public admin signup endpoint. Admin passwords are hashed with bcrypt and are excluded from normal Mongoose queries.

Seed Rizwan's initial portfolio projects after configuring `MONGO_URI`:

```powershell
npm run seed:projects
```

This inserts the 22 supplied projects once and leaves existing project records (including admin edits) unchanged when run again. Manage projects from **Admin → Projects** after signing in.

## Response format

Successful and failed API responses use:

```json
{
  "success": true,
  "message": "Service is healthy.",
  "data": {
    "status": "ok"
  }
}
```

Validation errors include field details in `data.errors`. Server errors never include stack traces in production.

## Endpoints

All routes are prefixed with `/api`.

### Public

#### `GET /api/health`

```json
{
  "success": true,
  "message": "Service is healthy.",
  "data": { "status": "ok" }
}
```

#### `GET /api/projects`

Returns published portfolio projects ordered with featured items first. Project management endpoints are protected by admin authentication.

#### `POST /api/leads`

Registers for a demo class. Duplicate phone numbers or emails receive HTTP `409` and a friendly message. Pakistani mobile numbers such as `03001234567`, `03 001-234567`, and `+923001234567` are normalized to `+923001234567`.

```json
{
  "name": "Ayesha Khan",
  "phone": "03001234567",
  "email": "ayesha@example.com",
  "source": "website"
}
```

Success: HTTP `201`, with the created lead in `data`. Status defaults to `new`; source defaults to `website`.

#### `POST /api/admissions`

```json
{
  "fullName": "Ayesha Khan",
  "phone": "+923001234567",
  "email": "ayesha@example.com",
  "city": "Lahore",
  "education": "Undergraduate",
  "courseName": "MERN Stack + React Native App Development with AI",
  "preferredBatch": "Upcoming batch",
  "paymentPlan": "full",
  "message": "Please share the next steps."
}
```

Required: `fullName`, `phone`, `email`, `city`, and `courseName`. `paymentPlan` can be `full` or `installment` and defaults to `full`. Admission status defaults to `pending`.

### Admin authentication

Send the token as `Authorization: Bearer <token>` for all protected routes.

#### `POST /api/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "your-admin-password"
}
```

Returns `data.token`, `data.expiresIn` (`7d`), and a safe `data.admin` profile without the password. Login is limited to 5 attempts per IP every 15 minutes. The application trusts one reverse proxy hop and uses compression for API responses.

#### `GET /api/auth/me`

Returns the authenticated admin profile; the password is never returned.

### Admin lead management

All lead management endpoints require a valid admin token.

#### `GET /api/leads`

Supported query parameters:

- `page` (default `1`)
- `limit` (default `20`, maximum `100`)
- `search` (matches name, normalized phone, or email)
- `status` (`new`, `contacted`, `joined_demo`, or `not_interested`)

Example: `GET /api/leads?page=1&limit=20&search=ayesha&status=new`

Returns newest first:

```json
{
  "success": true,
  "message": "Leads retrieved.",
  "data": {
    "items": [],
    "pagination": { "page": 1, "limit": 20, "total": 0, "pages": 0 }
  }
}
```

#### `PATCH /api/leads/:id`

Only `status` and/or `notes` are accepted.

```json
{ "status": "contacted", "notes": "Asked to follow up next week." }
```

#### `DELETE /api/leads/:id`

Deletes a lead and returns its ID.

### Admin admission management

Admission list and mutation routes require a valid admin token.

#### `GET /api/admissions`

Supports the same `page`, `limit` (maximum 100), and `search` query parameters as leads; `search` matches full name, phone, and email. Filter with `status=pending`, `status=confirmed`, or `status=rejected`. Results are newest first.

#### `PATCH /api/admissions/:id`

Only `status` and/or `notes` are accepted.

```json
{ "status": "confirmed", "notes": "Admission confirmed." }
```

#### `DELETE /api/admissions/:id`

Deletes an admission request and returns its ID.

### Admin project management

Project management routes require a valid admin token. Project records contain a title, category, screenshot image URL, optional live URL, technology names, description, display order, and featured/published flags.

#### `GET /api/projects/admin`

Supports `page`, `limit` (maximum 100), `search` (title, category, description, and technologies), and `published=true|false` filters. Results are ordered by display order.

#### `POST /api/projects`

Creates a project. Required fields: `title`, `category`, `imageUrl`, `technologies` (1–12 strings), and `description`. Optional fields: `liveUrl`, `order`, `featured`, and `published`. Image and live URLs must use HTTP or HTTPS.

#### `PATCH /api/projects/:id`

Updates any supported project field. The project slug is refreshed when its title changes.

#### `DELETE /api/projects/:id`

Deletes a project and returns its ID.

### Admin stats

#### `GET /api/stats`

Requires an admin token. Returns `totalLeads`, `leadsToday` (UTC day), `totalAdmissions`, `pendingAdmissions`, and `confirmedAdmissions`.

## Validation and security

- Helmet security headers.
- CORS only permits browser origins explicitly listed in `CLIENT_URL`; requests without an `Origin` header (such as Postman) are allowed.
- Lead and admission submissions are limited to 10 requests per IP per 15 minutes. Login has a separate 10-per-15-minute limit.
- JSON and URL-encoded request bodies are limited to 10 KB.
- Express-validator checks required fields, email, Pakistani mobile numbers, allowed statuses, query parameters, and Mongo IDs. String inputs are trimmed and HTML-escaped.
- Lead phone and email have unique database indexes to prevent duplicates during concurrent submissions.
- Admin routes use JWTs that expire after seven days.
- Mongoose validation, duplicate keys, invalid IDs, oversized bodies, and missing routes return consistent JSON errors.

## Test with Postman or Thunder Client

1. Start MongoDB and set `.env`.
2. Run `npm run seed:admin`, then `npm run dev`.
3. Send `GET http://localhost:5000/api/health`.
4. Send valid and invalid JSON to the public `POST /api/leads` and `POST /api/admissions` routes.
5. Log in with `POST /api/auth/login`; copy `data.token`.
6. Set `Authorization: Bearer <token>` and exercise `/api/auth/me`, leads, admissions, and `/api/stats`.
7. Try invalid phones, emails, status values, Mongo IDs, and unlisted `Origin` headers to check rejection behavior.

Morgan logs method, path (without query parameters), status, and response time. Internal exceptions are logged server-side and are not exposed to clients in production.

## Automated endpoint checks

Run:

```powershell
npm test
```

The built-in Node test suite exercises all API routes, auth, validation, CORS, duplicate handling, and response shapes with stubbed Mongoose model methods. It does not replace an integration run against a configured MongoDB instance.
