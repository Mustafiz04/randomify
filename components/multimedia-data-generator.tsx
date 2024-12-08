'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateMultimediaData } from '@/utils/generators'
import Image from 'next/image'

export function MultimediaDataGenerator() {
  const [data, setData] = useState<ReturnType<typeof generateMultimediaData> | null>(null)

  const generateData = () => {
    setData(generateMultimediaData())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Multimedia Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateData}>Generate Multimedia Data</Button>
          {data && (
            <div className="p-2 bg-secondary rounded">
              <p><strong>Placeholder Image:</strong></p>
              <Image src={data.placeholderImage} alt="Placeholder" width={300} height={200} />
              <p><strong>Video Link:</strong> {data.videoLink}</p>
              <p><strong>Audio Link:</strong> {data.audioLink}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

