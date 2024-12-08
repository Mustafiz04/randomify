'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateBlockchainAddress, CryptoCurrency } from '@/utils/generators'
import { toast } from 'react-toastify'

export function BlockchainAddressGenerator() {
  const [address, setAddress] = useState('')
  const [addressType, setAddressType] = useState<CryptoCurrency>('bitcoin')

  const generateAddress = () => {
    setAddress(generateBlockchainAddress(addressType))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blockchain Address Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(value: CryptoCurrency) => setAddressType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select address type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin">Bitcoin</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="ripple">Ripple</SelectItem>
              <SelectItem value="litecoin">Litecoin</SelectItem>
              <SelectItem value="dogecoin">Dogecoin</SelectItem>
              <SelectItem value="cardano">Cardano</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateAddress}>Generate Address</Button>
          {address && (
            <div className="p-2 bg-secondary rounded flex items-center justify-start space-x-2">
               <p className="break-all">{address}</p>
              <div className="flex justify-end">
                <button
                  className="text-sm text-accent-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText(address)
                    if (toast) {
                      toast.success("Address copied to clipboard!")
                    } else {
                      console.error("Toast notification system not available.")
                    }
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

