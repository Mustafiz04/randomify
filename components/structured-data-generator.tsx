'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateStructuredData } from '@/utils/generators'

export function StructuredDataGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateStructuredData> | null>(null)

  const generateData = () => {
    setData(generateStructuredData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Structured Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Structured Data</Button>
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

