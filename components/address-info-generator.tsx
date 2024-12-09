'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAddressInfo } from '@/utils/generators'

export function AddressInfoGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateAddressInfo> | null>(null)

  const generateNewAddress = () => {
    setData(generateAddressInfo())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Address Information Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateNewAddress}>
          Generate Address
        </Button>
        
        {data && (
          <div className="space-y-2">
            <p><strong>Street:</strong> {data.street}</p>
            <p><strong>City:</strong> {data.city}</p>
            <p><strong>State:</strong> {data.state}</p>
            <p><strong>ZIP Code:</strong> {data.zipCode}</p>
            <p><strong>Country:</strong> {data.country}</p>
            {data.apartment && (
              <p><strong>Apartment:</strong> {data.apartment}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

