import React, { useState } from 'react'
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Inizializza React Query client
const queryClient = new QueryClient()

// Tipo Post
type Post = {
  id?: number
  title: string
  body: string
  userId: number
}

// Funzione che simula una POST
const createPost = async (newPost: Post): Promise<Post> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  })
  if (!res.ok) throw new Error('Errore durante la creazione')
  return res.json()
}

const NewPostForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const queryClient = useQueryClient()

  // useMutation per creare un post
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('Post creato!', data)
      // Invalida la cache per ricaricare i post
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, body, userId: 1 })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenuto"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Crea Post</button>
      {mutation.isPending && <p>Invio in corso...</p>}
      {mutation.isError && <p>Errore: {(mutation.error as Error).message}</p>}
      {mutation.isSuccess && <p>Post creato con successo!</p>}
    </form>
  )
}

function test() {
    return (
        <QueryClientProvider client={queryClient}>
             <h1>Nuovo Post</h1>
             <NewPostForm />
        </QueryClientProvider>
    );
}

export default test
