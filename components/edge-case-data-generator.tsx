'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateEdgeCaseData } from '@/utils/generators'

export function EdgeCaseDataGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateEdgeCaseData> | null>(null)

  const generateData = () => {
    setData(generateEdgeCaseData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edge Case Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Edge Case Data</Button>
          {data && (
            <div className="p-2 bg-secondary rounded">
              {Object.entries(data).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> <pre className="whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre></p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

