const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
    try {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error('This script should only be run in development!');
        }

        // This one references the last generated schema
        const tables = Prisma.dmmf.datamodel.models.map(
            (model) => model.dbName || model.name
        );

        // Using Prisma transaction API takes too long
        for (const table of tables) {
            console.log(`Dropping table: ${table}`);
            // Use raw query to drop the table
            await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        }

    } catch (error) {
        console.error('Error occurred while fetching tables or dropping tables:', error);
    } finally {
        await prisma.$disconnect();
        console.log('All specified tables have been dropped.');
    }
})();
