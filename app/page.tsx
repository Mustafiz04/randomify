import { Layout } from '@/components/layout'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Coins, Mail, Key, Database, User, MapPin, Calendar, Hash, 
  FileText, CreditCard, Globe, Code, Shield, Film, TestTube2, Bug 
} from 'lucide-react'

const generators = [
  { 
    name: 'Blockchain Address', 
    path: '/blockchain',
    icon: Coins,
    description: 'Generate addresses for various cryptocurrencies',
    color: 'from-orange-500 to-yellow-500'
  },
  { 
    name: 'Dummy Email', 
    path: '/email',
    icon: Mail,
    description: 'Create random email addresses',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Password', 
    path: '/password',
    icon: Key,
    description: 'Generate secure random passwords',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Dummy Data', 
    path: '/dummy-data',
    icon: Database,
    description: 'Create random test data',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Personal Information', 
    path: '/personal-info',
    icon: User,
    description: 'Generate fake personal details',
    color: 'from-red-500 to-orange-500'
  },
  { 
    name: 'Address Information', 
    path: '/address-info',
    icon: MapPin,
    description: 'Create random addresses',
    color: 'from-teal-500 to-green-500'
  },
  { 
    name: 'Date and Time', 
    path: '/date-time',
    icon: Calendar,
    description: 'Generate random dates and times',
    color: 'from-indigo-500 to-purple-500'
  },
  { 
    name: 'Numbers and IDs', 
    path: '/numbers-ids',
    icon: Hash,
    description: 'Create random numbers and IDs',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'Text Content', 
    path: '/text-content',
    icon: FileText,
    description: 'Generate lorem ipsum and random text',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    name: 'Financial Data', 
    path: '/financial-data',
    icon: CreditCard,
    description: 'Create random financial information',
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    name: 'Web and Networking', 
    path: '/web-networking',
    icon: Globe,
    description: 'Generate IP addresses and URLs',
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    name: 'Structured Data', 
    path: '/structured-data',
    icon: Code,
    description: 'Create JSON, XML, and other formats',
    color: 'from-violet-500 to-purple-500'
  },
  { 
    name: 'Security Data', 
    path: '/security-data',
    icon: Shield,
    description: 'Generate hashes and security tokens',
    color: 'from-rose-500 to-pink-500'
  },
  { 
    name: 'Multimedia Data', 
    path: '/multimedia-data',
    icon: Film,
    description: 'Create placeholder media data',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    name: 'Testing Data', 
    path: '/testing-data',
    icon: TestTube2,
    description: 'Generate data for testing scenarios',
    color: 'from-green-500 to-teal-500'
  },
  { 
    name: 'Edge Case Data', 
    path: '/edge-case-data',
    icon: Bug,
    description: 'Create edge case test data',
    color: 'from-purple-500 to-indigo-500'
  },
]

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Random Data Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate various types of random data for testing, development, and demonstration purposes
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {generators.map((generator) => {
            const Icon = generator.icon
            return (
              <Link key={generator.path} href={generator.path}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${generator.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{generator.name}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {generator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Click to generate {generator.name.toLowerCase()} →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

