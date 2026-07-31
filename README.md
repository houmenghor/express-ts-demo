## How to set up an Express + TypeScript project
Step 1: Initialize the project and install dependencies
Note: We use tsx instead of ts-node to avoid modern TypeScript bugs.

```bash
npm init -y
npm install express
npm i -D typescript tsx nodemon @types/node @types/express
```

Step 2: Create the TypeScript configuration file

```bash
npx tsc --init
```

Step 3: Update tsconfig.json
Delete the default contents and replace them with this clean setup to avoid strict module errors:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

Step 4: Create your server file
Create an index.ts file in the root of your project and add your basic Express server code with app.listen().

Step 5: Modify package.json
Update your "scripts" section to use Nodemon and TSX together so the server automatically restarts when you save:

```bash
"scripts": {
  "dev": "nodemon --exec tsx index.ts"
}
```

Step 6 : install nodemon global first time only

```bash
npm install -g nodemon
```

Step 6 : Run the project

```bash
npm run dev
```

## How to set db postgres
1. Install the Database Packages
Open your terminal and run these two commands to install the PostgreSQL driver, the environment variable loader, and their TypeScript types:

```bash
npm install pg dotenv
npm install -D @types/pg
```

2. Create your .env File
You should never hardcode your database passwords directly in your code. Instead, we use a hidden .env file.

Create a new file named .env in the root of your project folder (next to package.json) and add your database credentials:

```json
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
```

3. Create the Database Connection File
Create a new file named db.ts in your project folder. We are going to set up a "Pool", which is the best practice for web servers because it efficiently manages multiple database connections at the same time.

Paste this exact code into db.ts:

```ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load the variables from your .env file
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
});

// Test the connection immediately when the server starts
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL database!');
    release(); // Free up the client back to the pool
  }
});

export default pool;
```
