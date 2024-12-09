import { sha256 } from 'js-sha256'
import bs58 from 'bs58'
import { keccak256 } from 'js-sha3'
import { createHash, randomBytes } from 'crypto'

export type CryptoCurrency =
  | 'bitcoin'
  | 'ethereum'
  | 'binance'
  | 'ripple'
  | 'solana'
  | 'cardano'
  | 'polkadot'
  | 'dogecoin'
  | 'litecoin'
  | 'avalanche'
  | 'tron'
  | 'polygon';

const TESTNET_VERSIONS = {
  bitcoin: 0x6f,    // Testnet addresses start with 'm' or 'n'
  dogecoin: 0x71,   // Testnet
  litecoin: 0x6f,   // Testnet
} as const;

function sha256Hash(buffer: Buffer): Buffer {
  return createHash('sha256').update(buffer).digest()
}

function ripemd160Hash(buffer: Buffer): Buffer {
  return createHash('ripemd160').update(buffer).digest()
}

function hash160(buffer: Buffer): Buffer {
  return ripemd160Hash(sha256Hash(buffer))
}

function generateBitcoinLikeAddress(version: number): string {
  // Generate random key pair
  const privateKey = randomBytes(32)
  const publicKey = Buffer.from(sha256(privateKey), 'hex')
  
  // Perform HASH160 (RIPEMD160(SHA256(public_key)))
  const publicKeyHash = hash160(publicKey)
  
  // Add version byte
  const versionedHash = Buffer.concat([Buffer.from([version]), publicKeyHash])
  
  // Generate double SHA256 checksum
  const checksum = sha256Hash(sha256Hash(versionedHash)).slice(0, 4)
  
  // Combine everything and encode in base58
  const binaryAddress = Buffer.concat([versionedHash, checksum])
  return bs58.encode(binaryAddress)
}

function generateEthereumLikeAddress(): string {
  // Generate random private key
  const privateKey = randomBytes(32)
  const publicKey = Buffer.from(sha256(privateKey), 'hex')
  
  // Generate address using Keccak-256
  const address = keccak256(publicKey).slice(-40)
  
  // Checksum encoding (EIP-55)
  const addressHash = keccak256(address.toLowerCase())
  let checksumAddress = '0x'
  
  for (let i = 0; i < 40; i++) {
    checksumAddress += parseInt(addressHash[i], 16) >= 8
      ? address[i].toUpperCase()
      : address[i].toLowerCase()
  }
  
  return checksumAddress
}

export function generateBlockchainAddress(type: CryptoCurrency): string {
  switch (type) {
    case 'bitcoin':
      return generateBitcoinLikeAddress(TESTNET_VERSIONS.bitcoin)
    
    case 'dogecoin':
      return generateBitcoinLikeAddress(TESTNET_VERSIONS.dogecoin)
    
    case 'litecoin':
      return generateBitcoinLikeAddress(TESTNET_VERSIONS.litecoin)
    
    case 'ethereum':
    case 'avalanche':
    case 'polygon':
      return generateEthereumLikeAddress()
    
    case 'binance':
      return 'tbnb1' + generateEthereumLikeAddress().slice(4)
    
    case 'ripple':
      const rippleKey = randomBytes(20)
      return 'rp' + bs58.encode(rippleKey).slice(0, 30)
    
    case 'solana':
      const solanaKey = randomBytes(32)
      return bs58.encode(solanaKey)
    
    case 'cardano':
      const cardanoKey = randomBytes(32)
      return 'addr_test1' + bs58.encode(cardanoKey).slice(0, 50)
    
    case 'polkadot':
      const polkadotKey = randomBytes(32)
      return '5' + bs58.encode(polkadotKey).slice(0, 47)
    
    case 'tron':
      const tronKey = randomBytes(20)
      return '41' + bs58.encode(tronKey).slice(0, 32)
    
    default:
      throw new Error(`Unsupported cryptocurrency: ${type}`)
  }
}

interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  apartment?: string;
}

export function generateAddressInfo(): AddressInfo {
  const streets = [
    'Main Street', 'Oak Avenue', 'Maple Road', 'Cedar Lane', 'Pine Street',
    'Elm Street', 'Washington Avenue', 'Park Road', 'Lake Drive', 'River Road',
    'Highland Avenue', 'Forest Lane', 'Mountain View', 'Sunset Boulevard', 'Valley Road'
  ]

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco'
  ]

  const states = [
    { name: 'New York', abbr: 'NY' },
    { name: 'California', abbr: 'CA' },
    { name: 'Texas', abbr: 'TX' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'Illinois', abbr: 'IL' },
    { name: 'Pennsylvania', abbr: 'PA' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Michigan', abbr: 'MI' },
    { name: 'North Carolina', abbr: 'NC' }
  ]

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'Italy', 'Spain', 'Netherlands'
  ]

  const streetNumber = Math.floor(Math.random() * 9999) + 1
  const apartmentNumber = Math.random() > 0.5 ? `Apt ${Math.floor(Math.random() * 999) + 1}` : undefined
  const street = streets[Math.floor(Math.random() * streets.length)]
  const city = cities[Math.floor(Math.random() * cities.length)]
  const state = states[Math.floor(Math.random() * states.length)]
  const zipCode = Math.floor(10000 + Math.random() * 90000).toString()
  const country = countries[Math.floor(Math.random() * countries.length)]

  return {
    street: `${streetNumber} ${street}${apartmentNumber ? `, ${apartmentNumber}` : ''}`,
    city,
    state: state.abbr,
    zipCode,
    country,
    ...(apartmentNumber && { apartment: apartmentNumber })
  }
}

// Helper function to generate a random element from an array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to format numbers with leading zeros
function padNumber(num: number, size: number): string {
  return num.toString().padStart(size, '0')
}

// Helper function to capitalize first letter of each word
function capitalizeWords(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
}

// Helper function to generate random boolean
function getRandomBoolean(probability = 0.5): boolean {
  return Math.random() < probability
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function generateDateTimeInfo() {
  return {
    'Current Time': new Date().toLocaleTimeString(),
    'Current Date': new Date().toLocaleDateString(),
    'Timestamp': Date.now(),
    'UTC String': new Date().toUTCString(),
    'ISO String': new Date().toISOString()
  }
}

export function generateDummyData() {
  return {
    'Name': 'John Doe',
    'Email': 'john.doe@example.com',
    'Phone': '123-456-7890',
    'Address': '123 Main St, Anytown, USA'
  }
}

export function generateEdgeCaseData() {
  return {
    'Empty String': '',
    'Null Value': null,
    'Undefined Value': undefined,
    'Zero': 0,
    'Negative Number': -1,
    'Large Number': 1e+30,
    'Special Characters': '!@#$%^&*()',
    'Long String': 'a'.repeat(1000)
  }
}

// Email Generator
interface EmailOptions {
  domain?: string;
  prefix?: string;
}

export function generateEmail(options: EmailOptions = {}): string {
  const firstNames = ['john', 'jane', 'mike', 'sarah', 'alex', 'emma', 'david', 'lisa']
  const lastNames = ['doe', 'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller']
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com']

  const prefix = options.prefix || 
    `${getRandomElement(firstNames)}.${getRandomElement(lastNames)}${Math.floor(Math.random() * 1000)}`
  const domain = options.domain || getRandomElement(domains)

  return `${prefix}@${domain}`
}

// Financial Data Generator
interface FinancialData {
  accountNumber: string;
  routingNumber: string;
  balance: string;
  currency: string;
  creditCard: string;
  expiryDate: string;
  cvv: string;
}

export function generateFinancialData(): FinancialData {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
  
  return {
    accountNumber: padNumber(Math.floor(Math.random() * 1000000000), 10),
    routingNumber: padNumber(Math.floor(Math.random() * 1000000000), 9),
    balance: (Math.random() * 10000).toFixed(2),
    currency: getRandomElement(currencies),
    creditCard: generateCreditCardNumber(),
    expiryDate: generateExpiryDate(),
    cvv: padNumber(Math.floor(Math.random() * 1000), 3)
  }
}

// Multimedia Data Generator
interface MultimediaData {
  imageUrl: string;
  videoUrl: string;
  audioUrl: string;
  fileSize: string;
  duration: string;
  resolution: string;
  format: string;
}

export function generateMultimediaData(): MultimediaData {
  return {
    imageUrl: `https://picsum.photos/${getRandomNumber(800, 1200)}/${getRandomNumber(600, 900)}`,
    videoUrl: `https://example.com/video/${generateUUID()}.mp4`,
    audioUrl: `https://example.com/audio/${generateUUID()}.mp3`,
    fileSize: `${getRandomNumber(1, 500)} MB`,
    duration: `${getRandomNumber(1, 180)}:${padNumber(getRandomNumber(0, 59), 2)}`,
    resolution: `${getRandomNumber(1280, 3840)}x${getRandomNumber(720, 2160)}`,
    format: getRandomElement(['MP4', 'MOV', 'AVI', 'MKV'])
  }
}

// Numbers and IDs Generator
interface NumbersAndIds {
  uuid: string;
  integer: number;
  float: number;
  percentage: string;
  phoneNumber: string;
  serialNumber: string;
}

export function generateNumbersAndIds(): NumbersAndIds {
  return {
    uuid: generateUUID(),
    integer: getRandomNumber(1, 1000000),
    float: parseFloat((Math.random() * 1000).toFixed(2)),
    percentage: `${getRandomNumber(0, 100)}%`,
    phoneNumber: generatePhoneNumber(),
    serialNumber: generateSerialNumber()
  }
}

// Text Content Generator
interface TextContent {
  paragraph: string;
  sentence: string;
  word: string;
  title: string;
  slug: string;
}

export function generateTextContent(): TextContent {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  const words = loremIpsum.split(' ')
  
  return {
    paragraph: loremIpsum,
    sentence: `${words.slice(0, 10).join(' ')}.`,
    word: getRandomElement(words),
    title: capitalizeWords(words.slice(0, 4).join(' ')),
    slug: words.slice(0, 4).join('-').toLowerCase()
  }
}

// Helper Functions
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function generateCreditCardNumber(): string {
  return Array(4).fill(0)
    .map(() => padNumber(Math.floor(Math.random() * 10000), 4))
    .join(' ')
}

function generateExpiryDate(): string {
  const month = padNumber(Math.floor(Math.random() * 12) + 1, 2)
  const year = (new Date().getFullYear() + getRandomNumber(1, 5)).toString().slice(-2)
  return `${month}/${year}`
}

function generatePhoneNumber(): string {
  return `(${padNumber(getRandomNumber(100, 999), 3)}) ${padNumber(getRandomNumber(100, 999), 3)}-${padNumber(getRandomNumber(1000, 9999), 4)}`
}

function generateSerialNumber(): string {
  return Array(3).fill(0)
    .map(() => padNumber(Math.floor(Math.random() * 1000), 3))
    .join('-')
}

// Web and Networking Data Generator
interface WebNetworkingData {
  ipv4: string;
  ipv6: string;
  macAddress: string;
  url: string;
  userAgent: string;
  port: number;
}

export function generateWebNetworkingData(): WebNetworkingData {
  return {
    ipv4: Array(4).fill(0).map(() => getRandomNumber(0, 255)).join('.'),
    ipv6: Array(8).fill(0).map(() => getRandomNumber(0, 65535).toString(16).padStart(4, '0')).join(':'),
    macAddress: Array(6).fill(0).map(() => getRandomNumber(0, 255).toString(16).padStart(2, '0')).join(':'),
    url: `https://${generateDomainName()}`,
    userAgent: generateUserAgent(),
    port: getRandomNumber(1024, 65535)
  }
}

function generateDomainName(): string {
  const tlds = ['.com', '.org', '.net', '.io', '.dev']
  const words = ['example', 'test', 'demo', 'sample', 'app']
  return getRandomElement(words) + getRandomElement(tlds)
}

function generateUserAgent(): string {
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge']
  const versions = ['100.0', '99.0', '98.0', '97.0']
  const os = ['Windows NT 10.0', 'Macintosh', 'Linux x86_64']
  
  return `Mozilla/5.0 (${getRandomElement(os)}) ${getRandomElement(browsers)}/${getRandomElement(versions)}`
}

// Password Generator
interface PasswordOptions {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

export function generatePassword(options: PasswordOptions = {}): string {
  const {
    length = 12,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = options

  let chars = ''
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (numbers) chars += '0123456789'
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Personal Info Generator
interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
}

export function generatePersonalInfo(): PersonalInfo {
  const firstName = getRandomElement(['John', 'Jane', 'Michael', 'Emma', 'William', 'Olivia'])
  const lastName = getRandomElement(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'])
  
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail({ prefix: `${firstName.toLowerCase()}.${lastName.toLowerCase()}` }),
    phone: generatePhoneNumber(),
    dateOfBirth: generateRandomDate(new Date(1960, 0, 1), new Date(2000, 11, 31)),
    ssn: generateSSN()
  }
}

// Security Data Generator
interface SecurityData {
  hash: string;
  salt: string;
  token: string;
  apiKey: string;
  certificate: string;
}

export function generateSecurityData(): SecurityData {
  return {
    hash: sha256(Math.random().toString()),
    salt: generateRandomString(16),
    token: generateJWT(),
    apiKey: generateApiKey(),
    certificate: generateCertificate()
  }
}

// Structured Data Generator
interface StructuredData {
  json: string;
  xml: string;
  yaml: string;
  csv: string;
}

export function generateStructuredData(): StructuredData {
  const data = {
    id: generateUUID(),
    name: generatePersonalInfo().fullName,
    email: generateEmail(),
    created: new Date().toISOString()
  }

  return {
    json: JSON.stringify(data, null, 2),
    xml: generateXML(data),
    yaml: generateYAML(data),
    csv: generateCSV(data)
  }
}

// Testing Data Generator
interface TestingData {
  testCase: string;
  expectedResult: string;
  input: string;
  output: string;
  performance: string;
}

export function generateTestingData(): TestingData {
  return {
    testCase: `Test Case ${getRandomNumber(1, 1000)}`,
    expectedResult: getRandomElement(['Success', 'Failure', 'Error', 'Skip']),
    input: generateRandomString(20),
    output: generateRandomString(20),
    performance: `${getRandomNumber(10, 1000)}ms`
  }
}

// Helper functions
function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

function generateSSN(): string {
  return `${padNumber(getRandomNumber(100, 999), 3)}-${padNumber(getRandomNumber(10, 99), 2)}-${padNumber(getRandomNumber(1000, 9999), 4)}`
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array(length).fill(0).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

function generateJWT(): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ sub: generateUUID(), iat: Date.now() }))
  const signature = generateRandomString(32)
  return `${header}.${payload}.${signature}`
}

function generateApiKey(): string {
  return `${generateRandomString(8)}_${generateRandomString(24)}`
}

function generateCertificate(): string {
  return `-----BEGIN CERTIFICATE-----\n${generateRandomString(64)}\n-----END CERTIFICATE-----`
}

function generateXML(data: any): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<root>
  ${Object.entries(data).map(([key, value]) => `  <${key}>${value}</${key}>`).join('\n  ')}
</root>`
}

function generateYAML(data: any): string {
  return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')
}

function generateCSV(data: any): string {
  const headers = Object.keys(data).join(',')
  const values = Object.values(data).join(',')
  return `${headers}\n${values}`
}
