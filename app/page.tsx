import { Layout } from '@/components/layout'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const generators = [
    { name: 'Blockchain Address', path: '/blockchain' },
    { name: 'Dummy Email', path: '/email' },
    { name: 'Password', path: '/password' },
    { name: 'Dummy Data', path: '/dummy-data' },
    { name: 'Personal Information', path: '/personal-info' },
    { name: 'Address Information', path: '/address-info' },
    { name: 'Date and Time', path: '/date-time' },
    { name: 'Numbers and IDs', path: '/numbers-ids' },
    { name: 'Text Content', path: '/text-content' },
    { name: 'Financial Data', path: '/financial-data' },
    { name: 'Web and Networking', path: '/web-networking' },
    { name: 'Structured Data', path: '/structured-data' },
    { name: 'Security Data', path: '/security-data' },
    { name: 'Multimedia Data', path: '/multimedia-data' },
    { name: 'Testing Data', path: '/testing-data' },
    { name: 'Edge Case Data', path: '/edge-case-data' },
  ]

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generators.map((generator) => (
          <Card key={generator.path}>
            <CardHeader>
              <CardTitle>{generator.name} Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={generator.path} className="text-primary hover:underline">
                Go to {generator.name} Generator
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

