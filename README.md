# IP Address Management System

_Note: I have some guides that might help setup the tools used in this project.
https://dev-toolbox.marviuz.me/_

Techstack - Turborepo monorepo of 2 applications

- package manager - pnpm
- Frontend
  - Vite
  - React
  - TypeScript
  - Axios w/ Tanstack Query
  - Tanstack Router
  - Tailwind CSS & ShadCN
- Backend
  - NestJS
  - TypeScript
  - Postgres
  - Drizzle ORM

_Note: Requires Google OAuth credentials. There are many guides and tutorials on the internet. One of which is [this](https://www.youtube.com/watch?v=tgO_ADSvY1I)._

_Note: There are many reasons why I opted for social auth providers such as Google OAuth. One if which is [security and modernization](https://authjs.dev/getting-started/authentication/credentials).
Though, for easier user setup, I also added email/password login but the Google OAuth environment variables are required to use it._

## Prerequisites

Create a `.env` file in the root directory of the project and add the following environment variables:

```
DATABASE_URL='postgresql://postgres:root@db:5432/ipmngmt'
AUTH_SECRET='some random string'

GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
GOOGLE_CALLBACK_URL='http://localhost:8000/auth/google/callback'

FRONTEND_URL='http://localhost:3000'
VITE_BACKEND_URL='http://localhost:8000'
```

## Docker

Be sure to have [Docker](https://docs.docker.com/get-docker/) installed.

1. Clone the repository
2. Start the application

```sh
docker compose up --build
```

3. Access the application

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Local

```
# Update database url based on your environment
DATABASE_URL='postgresql://exampleuser:examplepassword@db:5432/ipmngmt'

# Change port of frontend to 5473
FRONTEND_URL='http://localhost:5473'
```

Be sure to have [Node.js](https://nodejs.org/en/download/) v22.14 installed.

Prerequisites:

- Run `corepack enable` to automatically match and/or install the version of the package manager used in the project.

1. Clone the repository
2. Install dependencies

```sh
pnpm install
```

3. Run `pnpm db:migrate` to update postgres database

4. Start the application

```sh
pnpm dev
```

5. Access the application

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### Testing

- Run `pnpm test` to run tests on both frontend and backend.
- Run `pnpm test:www` to run on front-end only.
- Run `pnpm test:api` to run on front-backend only _(Not properly implemented)_.
