'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateBlockchainAddress, CryptoCurrency } from '@/utils/generators'
import { Copy, RefreshCw, Check } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SUPPORTED_CURRENCIES = [
  { value: 'bitcoin', label: 'Bitcoin (BTC)', icon: '₿', color: 'text-orange-500' },
  { value: 'ethereum', label: 'Ethereum (ETH)', icon: 'Ξ', color: 'text-blue-500' },
  { value: 'binance', label: 'Binance (BNB)', icon: 'BNB', color: 'text-yellow-500' },
  { value: 'ripple', label: 'Ripple (XRP)', icon: 'XRP', color: 'text-blue-400' },
  { value: 'solana', label: 'Solana (SOL)', icon: 'SOL', color: 'text-purple-500' },
  { value: 'cardano', label: 'Cardano (ADA)', icon: 'ADA', color: 'text-blue-600' },
  { value: 'polkadot', label: 'Polkadot (DOT)', icon: 'DOT', color: 'text-pink-500' },
  { value: 'dogecoin', label: 'Dogecoin (DOGE)', icon: 'Ð', color: 'text-yellow-400' },
  { value: 'litecoin', label: 'Litecoin (LTC)', icon: 'Ł', color: 'text-gray-400' },
  { value: 'avalanche', label: 'Avalanche (AVAX)', icon: 'AVAX', color: 'text-red-500' },
  { value: 'tron', label: 'Tron (TRX)', icon: 'TRX', color: 'text-red-400' },
  { value: 'polygon', label: 'Polygon (MATIC)', icon: 'MATIC', color: 'text-purple-400' },
] as const

export function BlockchainAddressGenerator() {
  const [address, setAddress] = useState('')
  const [addressType, setAddressType] = useState<CryptoCurrency>('bitcoin')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const generateAddress = async () => {
    setIsGenerating(true)
    try {
      const newAddress = generateBlockchainAddress(addressType)
      setAddress(newAddress)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      toast.success('Address copied to clipboard!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      toast.error('Failed to copy address', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.value === addressType)

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-opacity-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Blockchain Address Generator
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Generate random addresses for various cryptocurrency networks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6">
            <Select 
              value={addressType} 
              onValueChange={(value: CryptoCurrency) => setAddressType(value)}
            >
              <SelectTrigger className="w-full h-12 text-lg">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {SUPPORTED_CURRENCIES.map((currency) => (
                    <SelectItem 
                      key={currency.value} 
                      value={currency.value}
                      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-accent rounded-md transition-colors"
                    >
                      <span className={`font-mono text-lg ${currency.color}`}>
                        {currency.icon}
                      </span>
                      <span className="font-medium">{currency.label}</span>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <Button 
              onClick={generateAddress} 
              disabled={isGenerating}
              className="w-full h-12 text-lg font-medium transition-all duration-200 
                bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
                hover:to-purple-600 transform hover:scale-[1.02]"
            >
              <RefreshCw className={`mr-2 h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              Generate {selectedCurrency?.label} Address
            </Button>
          </div>

          {address && (
            <div className="rounded-xl border bg-black/5 backdrop-blur-lg p-6 transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                    <span className={`font-mono ${selectedCurrency?.color}`}>
                      {selectedCurrency?.icon}
                    </span>
                    Generated {selectedCurrency?.label} Address
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopy}
                    className="h-10 px-4 transition-all duration-200 hover:scale-105"
                  >
                    {isCopied ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="relative group">
                  <p className="font-mono text-base break-all bg-black/10 p-4 rounded-lg">
                    {address}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  )
}

