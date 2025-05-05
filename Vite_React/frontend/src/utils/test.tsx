// App.tsx
import React from 'react'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Crea il client di React Query
const queryClient = new QueryClient()

// 2. Definisci il tipo del dato
type Post = {
    userId: number
    id: number
    title: string
    body: string
}

// 3. Funzione che fa fetch dei post
const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    let data = await res.json()
    return data as Post[];
}

// 4. Componente che usa React Query
const Posts: React.FC = () => {
    const { data, isLoading, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (isLoading) return <p>Caricamento...</p>
    if (error instanceof Error) return <p>Errore: {error.message}</p>

    return (
        <ul>
            {data?.map((post: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}

function test() {
    return (

        <QueryClientProvider client={queryClient}>
            <h1>Post dal server</h1>
            <Posts />
        </QueryClientProvider>
    );
}

export default test
