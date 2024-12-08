'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateDummyEmail } from '@/utils/generators'

export function EmailGenerator() {
  const [email, setEmail] = useState('')

  const generateEmail = () => {
    setEmail(generateDummyEmail())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dummy Email Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateEmail}>Generate Email</Button>
          {email && (
            <div className="p-2 bg-secondary rounded">
              <p>{email}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

