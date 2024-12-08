'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateTestingData } from '@/utils/generators'

export function TestingDataGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateTestingData> | null>(null)

  const generateData = () => {
    setData(generateTestingData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Testing Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Testing Data</Button>
          {data && (
            <div className="p-2 bg-secondary rounded">
              {Object.entries(data).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> <pre className="whitespace-pre-wrap">{value}</pre></p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

