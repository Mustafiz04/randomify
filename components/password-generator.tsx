'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { generatePassword } from '@/utils/generators'

export function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const generateNewPassword = () => {
    setPassword(generatePassword(length, options))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="length">Length:</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              min={8}
              max={32}
              className="w-20"
            />
          </div>
          <div className="space-y-2">
            {Object.entries(options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, [key]: checked === true }))
                  }
                />
                <Label htmlFor={key} className="capitalize">
                  {key}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-x-2">
            <Button onClick={generateNewPassword}>Generate Password</Button>
            <Button onClick={copyToClipboard} disabled={!password}>
              Copy to Clipboard
            </Button>
          </div>
          {password && (
            <div className="p-2 bg-secondary rounded">
              <p className="break-all">{password}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

