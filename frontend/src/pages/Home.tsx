import { useQuery } from '@tanstack/react-query'

async function fetchHealth(): Promise<{ status: string }> {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error('API unreachable')
  return res.json()
}

export function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  const status = isLoading ? 'checking…' : isError ? 'unreachable' : data?.status ?? 'unknown'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Your App</h1>
        <p className="text-gray-500 mb-2">Replace this with your app.</p>
        <p className="text-sm text-gray-400">
          API status:{' '}
          <span className={status === 'ok' ? 'text-green-500' : 'text-red-500'}>{status}</span>
        </p>
      </div>
    </div>
  )
}
