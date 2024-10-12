import { PrismaClient } from '@prisma/client'

export default async function Home() {
  const prisma = new PrismaClient();
  const items = await prisma.item.findMany();
  return (
    <div className="flex-1">
      <div className='container mx-auto'>
        <h1>PROCESS ENV NODE_ENV: {process.env.NODE_ENV}</h1>
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.nama}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
