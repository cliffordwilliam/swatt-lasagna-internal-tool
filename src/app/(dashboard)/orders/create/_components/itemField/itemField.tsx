import { getItems } from '@/utils/get-items';
import { Item } from '@prisma/client';

export default async function ItemFields() {
  const items: Item[] = await getItems();

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.nama}</li>
      ))}
    </ul>
  );
}
