import Link from 'next/link'
import { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="hover:underline">Random Data Generator</Link>
          </h1>
        </div>
      </header>
      <nav className="bg-secondary">
        <div className="container py-2">
          <ul className="flex flex-wrap gap-4 justify-center">
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/blockchain" className="hover:underline text-primary">Blockchain</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/email" className="hover:underline text-primary">Email</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/password" className="hover:underline text-primary">Password</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/dummy-data" className="hover:underline text-primary">Dummy Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/personal-info" className="hover:underline text-primary">Personal Info</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/address-info" className="hover:underline text-primary">Address Info</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/date-time" className="hover:underline text-primary">Date & Time</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/numbers-ids" className="hover:underline text-primary">Numbers & IDs</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/text-content" className="hover:underline text-primary">Text Content</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/financial-data" className="hover:underline text-primary">Financial Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/web-networking" className="hover:underline text-primary">Web & Networking</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/structured-data" className="hover:underline text-primary">Structured Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/security-data" className="hover:underline text-primary">Security Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/multimedia-data" className="hover:underline text-primary">Multimedia Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/testing-data" className="hover:underline text-primary">Testing Data</Link>
            </li>
            <li className="bg-primary-foreground px-4 py-2 rounded-md">
              <Link href="/edge-case-data" className="hover:underline text-primary">Edge Case Data</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto flex-grow py-8 px-4 md:px-8 rounded-lg shadow-md space-y-8">
        <div className="bg-white p-6 rounded-md shadow-sm">
          {children}
        </div>
      </main>
      <footer className="bg-secondary text-secondary-foreground py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Random Data Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

