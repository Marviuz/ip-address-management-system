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

## Usage

1. After opening the app, you will be greeted with a login screen.

   - Continuing with _Google_, will automatically create a _Regular_ user and login the user
   - If account doesn't exist, it will automatically create it.
     ![image](https://github.com/user-attachments/assets/5aec6d66-fa83-4aab-91a9-183bb8a25e06)

2. Clicking `Register`, will route you to the registration page which you'll be able to create either a Super Admin or Regular user accout.
   ![image](https://github.com/user-attachments/assets/3b2e1503-2ff6-4cfa-9218-f07e41b56c3a)
3. Depending on the role of the user, you can be greeted with a different login screen as shown below

   - Regular ![image](https://github.com/user-attachments/assets/7c837274-5679-4ea9-92a6-7a23321b0d94)
   - Super Admin ![image](https://github.com/user-attachments/assets/15e51575-5528-4dad-82f0-659e4e69f405)

4. Clicking the `Add` button will appear a dialog, that will let you input IP Address data/content ![image](https://github.com/user-attachments/assets/23ed2f90-829c-42af-88e7-b81dab6e2471)
5. After adding, the table will automatically be populated with the data added
   ![image](https://github.com/user-attachments/assets/ca123916-2e55-4736-aef9-00fbd1a8713f)
6. Clicking the `Edit` button of the table row will open a sheet at the side which allow the user to edit, the content
   ![image](https://github.com/user-attachments/assets/e14922d9-3649-4ae6-87e9-af1841685529)
7. Clicking the `Delete` button of the table row will open an alert dialog which is a confirmation before deleting the data.
   ![image](https://github.com/user-attachments/assets/8a8e97f7-6bbf-43b6-bd1f-d6059dc8de63)
8. If the currently logged in user is an `Admin`, they'll have access to a activity logs page which is the audit logs of actions made by the user to the app.
   ![image](https://github.com/user-attachments/assets/38ac1969-00ab-488a-8f52-373f8a32f191)
9. Clicking the type of action made (`Update`, `Create`, etc.) will expand a sheet of data changed for that action
   ![image](https://github.com/user-attachments/assets/8dd4340d-e521-4002-a178-67c1ecb5d5a4)
10. Both tables have _date columns_ that shows when the data is added and/or modified
    ![image](https://github.com/user-attachments/assets/15da0e98-ff21-4878-8759-b94559367e8f)
11. Both users can click their profile display at the upper right corner of the app and be able to logout. After logging out, the user will be redirected to the login page. 
    ![image](https://github.com/user-attachments/assets/6300f5e6-7d4e-4729-918d-0e1254774233)
