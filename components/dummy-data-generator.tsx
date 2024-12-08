'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateDummyData } from '@/utils/generators'

export function DummyDataGenerator() {
  const [data, setData] = useState<Record<string, string> | null>(null)

  const generateData = () => {
    setData(generateDummyData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dummy Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Dummy Data</Button>
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

