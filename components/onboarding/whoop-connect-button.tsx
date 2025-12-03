'use client'

import { Button } from '@/components/ui/button'
import { Activity } from 'lucide-react'

interface WhoopConnectButtonProps {
  onConnect: () => void
  isConnected: boolean
}

export function WhoopConnectButton({ onConnect, isConnected }: WhoopConnectButtonProps) {
  return (
    <Button
      onClick={onConnect}
      disabled={isConnected}
      size="lg"
      className="w-full max-w-md"
    >
      <Activity className="mr-2 h-5 w-5" />
      {isConnected ? 'WHOOP Connected' : 'Connect WHOOP'}
    </Button>
  )
}
