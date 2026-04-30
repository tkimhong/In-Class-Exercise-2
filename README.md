# INF 653 In-Class Exercise 2 - Vehicle Fuel Consumption Manager

A web app to manage fuel consumption records for cars and motorcycles. Supports both a traditional Web UI (SSR with Handlebars) and a RESTful API.

## Setup

```bash
npm install
cp .env.example .env   # fill in your secrets
npm start
```

App runs at `http://localhost:3000`.

## Features

- Register / Login (session-based for web, JWT for API)
- CRUD fuel records — Date, Vehicle Type, Liters, Distance, Total Cost
- km/L calculation per record
- Weekly and monthly expenditure summary
- CSRF protection on all forms

## API

| Method | Endpoint                            | Auth | Description           |
| ------ | ----------------------------------- | ---- | --------------------- |
| POST   | `/api/login`                        | —    | Returns JWT           |
| GET    | `/api/records`                      | JWT  | All records with km/L |
| GET    | `/api/summary?view=weekly\|monthly` | JWT  | Expenditure summary   |

**JWT usage:** pass the token directly in the `Authorization` header (no `Bearer` prefix).

## Stack

Express.js · Handlebars · express-session · csrf-sync · jose (encrypted JWT) · bcrypt
