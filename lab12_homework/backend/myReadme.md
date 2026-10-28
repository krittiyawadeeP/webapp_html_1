
Initialized Prisma in your project

  prisma/
    schema.prisma
  prisma.config.ts
  .env

warn You already have a .gitignore file. Don't forget to add .env in it to not commit any private information.

Next, set up your database:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.
Learn more: https://pris.ly/getting-started
 
