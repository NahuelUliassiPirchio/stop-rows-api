# Stop Rows API

> RESTful API for a remote queue management system — skip the line, join from anywhere.

🌐 **[Live Demo](https://nextjs-stop-rows-frontend.vercel.app/)** · 📄 **[API Docs](https://stop-rows-api.onrender.com/docs/)**

## 📖 About

Stop Rows was born from a real frustration: spending long stretches of time waiting in line at the bank during high school. The idea was simple — what if you could join a queue remotely and only show up when it's your turn? This API powers that concept, allowing shops to manage their queues and users to join them from anywhere. The backend is written in TypeScript and includes a caching layer to improve response times for frequently accessed resources like shops and categories.

## ✨ Features

- Role-based access control — shop owners manage their own queues, users join them
- JWT authentication with access and refresh token rotation
- Local and JWT Passport.js strategies for flexible auth flows
- Geospatial-ready shop schema with MongoDB indexes for location queries
- In-memory cache layer for shops and categories to reduce database load
- Request validation with Joi across all endpoints
- Centralized error handling middleware — no sensitive data leaks
- Swagger/OpenAPI documentation served at `/docs`
- Rate limiting to protect against abuse

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js ≥ 24 |
| Framework | Express |
| Language | TypeScript |
| Database | MongoDB (Mongoose) |
| Auth | Passport.js (JWT + Local), bcryptjs |
| Validation | Joi |
| Testing | Jest + Supertest + mongodb-memory-server |
| Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Security | Helmet, express-rate-limit |
| Deployment | Render |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24 or higher
- A MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/NahuelUliassiPirchio/stop-rows-api.git
cd stop-rows-api
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_DB_URI` | MongoDB connection string (production) | ✅ |
| `MONGODB_TEST_URI` | MongoDB connection string for tests | ✅ |
| `PORT` | Server port | No (default: 3000) |
| `AUTH_SECRET` | Secret used for password hashing context | ✅ |
| `AUTH_SALT_ROUNDS` | bcrypt salt rounds | No (default: 10) |
| `JWT_SECRET` | Secret for signing access tokens | ✅ |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | ✅ |
| `JWT_EXPIRES_IN` | Access token expiry in seconds | No (default: 3600) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | No (default: 30d) |
| `RATE_LIMIT_MAX` | Max requests per window | No (default: 100) |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | No (default: 60000) |

---

## 📁 Project Structure

```
src/
├── api/
│   ├── auth/             # Passport strategies (JWT + Local)
│   ├── controllers/      # Route handlers (Auth, Users, Shops, Rows, Categories, Profile)
│   ├── database/         # MongoDB connection setup
│   ├── middlewares/      # Error handling, auth guards, validation
│   ├── services/         # Business logic + CacheService
│   ├── v1/               # Versioned router definitions
│   └── config.ts         # App configuration
├── common/
│   ├── ApiError.ts       # Custom error class
│   └── Encryption.ts     # Password hashing utilities
├── tests/                # Integration tests
└── index.ts              # Entry point
```

---

## 🖥 Usage

**Development**
```bash
npm run dev
```

**Production build**
```bash
npm run build
npm run start
```

**Run tests**
```bash
npm run test
```

**Lint**
```bash
npm run lint
```

API documentation is available at `http://localhost:3000/docs` once the server is running, or at the live instance: [stop-rows-api.onrender.com/docs](https://stop-rows-api.onrender.com/docs/)

---

## 🌐 Live Demo

[nextjs-stop-rows-frontend.vercel.app](https://nextjs-stop-rows-frontend.vercel.app/)

---

## 👤 Author

**Nahuel Uliassi Pirchio**

- 🌐 [uliassipirchio.me](https://uliassipirchio.me)
- 💼 [LinkedIn](https://linkedin.com/in/uliassipirchio)
- 🐙 [GitHub](https://github.com/NahuelUliassiPirchio)
