'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateWebNetworkingData } from '@/utils/generators'

export function WebNetworkingGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateWebNetworkingData> | null>(null)

  const generateData = () => {
    setData(generateWebNetworkingData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Web and Networking Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Web and Networking Data</Button>
          {data && (
            <div className="p-2 bg-secondary rounded">
              {Object.entries(data).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

