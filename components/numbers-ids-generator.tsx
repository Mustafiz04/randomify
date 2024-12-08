'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateNumbersAndIds } from '@/utils/generators'

export function NumbersIdsGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateNumbersAndIds> | null>(null)

  const generateData = () => {
    setData(generateNumbersAndIds())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Numbers and IDs Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Numbers and IDs</Button>
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

