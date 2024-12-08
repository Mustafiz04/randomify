'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateTextContent } from '@/utils/generators'

export function TextContentGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateTextContent> | null>(null)

  const generateData = () => {
    setData(generateTextContent())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text Content Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Text Content</Button>
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

