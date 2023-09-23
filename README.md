This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1.Clone the repo and install dependencies `npm i`.

2. Create a `.env` file in your project root and add: `DATABASE_URL="mysql://url-to-your-database.com`

3. Initialize submodules: `git submodule init` then `git submodule update`

4. Generate prisma types: `npx prisma generate --schema submodules/database/prisma/schema.prisma`

5. Push database schema to database server: `npx prisma generate --schema submodules/database/prisma/schema.prisma` 

6.  run the development server: `npm run dev`

Open [http://localhost:80](http://localhost:80) with your browser to see the result.
