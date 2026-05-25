import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState<string>('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('unreachable'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Your App
        </h1>
        <p className="text-gray-500 mb-2">Replace this with your app.</p>
        <p className="text-sm text-gray-400">
          API status:{' '}
          <span className={status === 'ok' ? 'text-green-500' : 'text-red-500'}>
            {status}
          </span>
        </p>
      </div>
    </div>
  )
}

export default App
