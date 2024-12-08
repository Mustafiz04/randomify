'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generatePersonalInfo } from '@/utils/generators'

export function PersonalInfoGenerator() {
  const [data, setData] = useState<ReturnType<typeof generatePersonalInfo> | null>(null)

  const generateData = () => {
    setData(generatePersonalInfo())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personal Information Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Personal Info</Button>
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

