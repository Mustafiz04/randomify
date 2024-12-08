'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAddressInfo } from '@/utils/generators'

export function AddressInfoGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateAddressInfo> | null>(null)

  const generateData = () => {
    setData(generateAddressInfo())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Address Information Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Address Info</Button>
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

