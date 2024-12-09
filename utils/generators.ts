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

