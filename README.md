# Re-mate.ar

Re-mate.ar is a fullstack ecommerce project focused on selling mates and termos.

## Why I Built It

I developed this project while I was studying, to practice a complete web application flow with frontend, backend, authentication, admin features, and database integration.

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Deploy: Vercel

## Main Features

- Product catalog (all products, mates, termos, top sellers)
- Product detail page
- Login and register
- Shopping cart and checkout
- User profile with purchase history
- Admin panel for product management (add/edit/delete/publish/hide)

Note: checkout is simulated for demo purposes. There is no real payment gateway integration and no real charges are made.

## Database Seed Data

The `/db` folder includes example data files that can be used to populate MongoDB collections for local testing or demo setup.

## Demo Users

### Admin

- Email: `admin@mail.com`
- Password: `administrador`

### Regular Users

- Email: `pepe@mail.com`
- Password: `usuario`

- Email: `juan@mail.com`
- Password: `usuario`

## Run Locally

### 1) Install dependencies

Backend:

```bash
cd api
npm install
```

Frontend:

```bash
cd react
npm install
```

### 2) Configure environment variables

Backend:

```bash
cd api
copy .env.example .env
```

Frontend:

```bash
cd react
copy .env.example .env
```

Then update the values in both `.env` files with your local/real configuration.

### 3) Start the project

Backend (port from `.env`, default `2022`):

```bash
cd api
npm run server
```

Frontend:

```bash
cd react
npm run dev
```

## Environment Variables

### Backend (`api/.env`)

- `PORT`
- `MONGO_URI`
- `MONGO_DB_NAME`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `PUBLIC_BASE_URL`

### Frontend (`react/.env`)

- `VITE_API_URL`

## Deployment Context

This project is prepared to run with:

- One Vercel project for the frontend (`react` root directory)
- One Vercel project for the backend (`api` root directory)
- MongoDB Atlas as the online database

Important:

- `VITE_API_URL`: use `http://localhost:2022` for local development, and your deployed API URL in production.
- `CORS_ORIGIN`: use `http://localhost:5173` for local development, and your deployed frontend URL in production.
- `MONGO_URI`: use your local/Atlas connection string in local development, and set the production Atlas connection string in Vercel for the API project.
