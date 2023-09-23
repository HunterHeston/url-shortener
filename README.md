This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Set environment variables: `DATABASE_URL="mysql://url-to-your-database.com`

2. Initialize submodules: `git submodule init`

3. Push database schema to database server: `prisma generate --schema submodules/database/prisma/schema.prisma` 

5.  run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


