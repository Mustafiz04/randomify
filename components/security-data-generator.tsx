'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateSecurityData } from '@/utils/generators'

export function SecurityDataGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateSecurityData> | null>(null)

  const generateData = () => {
    setData(generateSecurityData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Security Data</Button>
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

