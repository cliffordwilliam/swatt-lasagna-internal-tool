import axios from 'axios'
import useSWR from 'swr'
import { Item } from '@prisma/client';

const fetcher = async (url: string): Promise<Item> => {
    const res = await axios.get(url);
    return res.data;
};

export function useItems(nama?: string) {
    const queryParams = new URLSearchParams();

    if (nama) {
        queryParams.append('nama', nama);
    }

    const { data, error, isLoading } = useSWR<Item>(`/api/items?${queryParams.toString()}`, fetcher)

    return {
        item: data,
        isLoading,
        isError: error
    }
}
