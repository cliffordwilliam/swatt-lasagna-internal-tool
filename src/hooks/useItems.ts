import axios from 'axios'
import useSWR from 'swr'
import { Item } from '@prisma/client';

const fetcher = async (url: string): Promise<Item[]> => {
    const res = await axios.get(url);
    return res.data;
};

export function useItems() {
    const { data, error, isLoading } = useSWR<Item[]>("/api/items", fetcher)

    return {
        items: data,
        isLoading,
        isError: error
    }
}
