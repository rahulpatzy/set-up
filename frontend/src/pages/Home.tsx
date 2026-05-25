import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../context/AuthContext'

async function fetchHealth(): Promise<{ status: string }> {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error('API unreachable')
  return res.json()
}

export function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })
  const { user, signOut } = useAuth()

  const status = isLoading ? 'checking…' : isError ? 'unreachable' : data?.status ?? 'unknown'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-3xl">🚀 Your App</CardTitle>
          <CardDescription>Replace this with your app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.email && (
            <p className="text-sm text-gray-500 truncate">Signed in as {user.email}</p>
          )}
          <p className="text-sm text-gray-400">
            API status:{' '}
            <span className={status === 'ok' ? 'text-green-500' : 'text-red-500'}>{status}</span>
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void signOut()}>
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
