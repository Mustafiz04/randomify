'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateDateTimeInfo } from '@/utils/generators'

export function DateTimeGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateDateTimeInfo> | null>(null)

  const generateData = () => {
    setData(generateDateTimeInfo())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Date and Time Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Date and Time Info</Button>
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

