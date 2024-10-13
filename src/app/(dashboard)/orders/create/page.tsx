import { Suspense } from 'react'
import ItemFields from './_components/itemField/itemField'
import ItemFieldSkeleton from './_components/itemField/itemFieldSkeleton'
// cached and revalidated at most every hour
export const revalidate = 3600

export default async function Home() {
    // Return the form
    // TODO: If forms gets too big move it to components
    return (
        <Suspense fallback={<ItemFieldSkeleton />}>
            <ItemFields />
        </Suspense>
    );
}
