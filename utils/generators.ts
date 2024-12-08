export type CryptoCurrency =
  | 'bitcoin'
  | 'ethereum'
  | 'ripple'
  | 'litecoin'
  | 'dogecoin'
  | 'cardano'
  | 'solana';

export function generateBlockchainAddress(type: CryptoCurrency): string {
  const addressConfig = {
    bitcoin: { length: 34, prefix: '1' },
    ethereum: { length: 42, prefix: '0x' },
    ripple: { length: 34, prefix: 'r' },
    litecoin: { length: 34, prefix: 'L' },
    dogecoin: { length: 34, prefix: 'D' },
    cardano: { length: 103, prefix: 'addr1' },
    solana: { length: 44, prefix: '' },
  };

  const config = addressConfig[type];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = config.prefix;
  for (let i = 0; i < config.length - config.prefix.length; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

export function generateDummyEmail(): string {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'test.com'];
  const username = Math.random().toString(36).substring(2, 10);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}

export function generatePassword(length: number, options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }): string {
  let charset = '';
  if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) charset += '0123456789';
  if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export function generateDummyData(): Record<string, string> {
  return {
    name: `${generateName('first')} ${generateName('last')}`,
    age: Math.floor(Math.random() * 80 + 18).toString(),
    phone: generatePhoneNumber(),
    address: generateAddress(),
  };
}

function generateName(type: 'first' | 'last'): string {
  const firstNames = ['John', 'Jane', 'Mike', 'Emily', 'David', 'Sarah', 'Chris', 'Laura'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  return type === 'first'
    ? firstNames[Math.floor(Math.random() * firstNames.length)]
    : lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generatePhoneNumber(): string {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

function generateAddress(): string {
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Cedar Ln', 'Pine St'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
  return `${Math.floor(Math.random() * 1000) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, ${states[Math.floor(Math.random() * states.length)]} ${Math.floor(Math.random() * 90000) + 10000}`;
}

export function generatePersonalInfo() {
  return {
    firstName: generateName('first'),
    lastName: generateName('last'),
    fullName: `${generateName('first')} ${generateName('last')}`,
    email: generateDummyEmail(),
    phone: generatePhoneNumber(),
    username: generateUsername(),
  };
}

export function generateAddressInfo() {
  return {
    street: generateStreetAddress(),
    city: generateCity(),
    state: generateState(),
    zipCode: generateZipCode(),
    country: generateCountry(),
  };
}

export function generateDateTimeInfo() {
  return {
    pastDate: generatePastDate(),
    futureDate: generateFutureDate(),
    timestamp: generateTimestamp(),
    timezone: generateTimezone(),
  };
}

export function generateNumbersAndIds() {
  return {
    integer: generateRandomInteger(1, 1000),
    float: generateRandomFloat(0, 100),
    uuid: generateUUID(),
    creditCard: generateCreditCardNumber(),
  };
}

export function generateTextContent() {
  return {
    paragraph: generateLoremIpsum(5),
    sentence: generateLoremIpsum(1),
    words: generateWords(5),
    json: generateJSONStructure(),
  };
}

export function generateFinancialData() {
  return {
    bankAccount: generateBankAccountNumber(),
    transactionAmount: generateTransactionAmount(),
    currencyCode: generateCurrencyCode(),
  };
}

export function generateWebNetworkingData() {
  return {
    ipv4: generateIPv4(),
    ipv6: generateIPv6(),
    url: generateURL(),
    macAddress: generateMACAddress(),
  };
}

export function generateStructuredData() {
  return {
    jsonSchema: generateJSONSchema(),
    sqlInsert: generateSQLInsert(),
    apiPayload: generateAPIPayload(),
  };
}

export function generateSecurityData() {
  return {
    md5: generateHash('md5'),
    sha256: generateHash('sha256'),
    jwtToken: generateJWTToken(),
  };
}

export function generateMultimediaData() {
  return {
    placeholderImage: generatePlaceholderImage(),
    videoLink: generateRandomVideoLink(),
    audioLink: generateRandomAudioLink(),
  };
}

export function generateTestingData() {
  return {
    seleniumData: generateSeleniumTestData(),
    loadTestingData: generateLoadTestingData(),
  };
}

export function generateEdgeCaseData() {
  return {
    specialChars: generateSpecialCharacters(),
    emptyString: '',
    nullValue: null,
    boundaryValues: generateBoundaryValues(),
  };
}

// Helper functions (implement these based on your specific requirements)
function generateUsername() {
  return `user_${Math.random().toString(36).substring(2, 10)}`;
}

function generateStreetAddress() {
  const number = Math.floor(Math.random() * 9999) + 1;
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Cedar Ln', 'Pine St'];
  const street = streets[Math.floor(Math.random() * streets.length)];
  return `${number} ${street}`;
}

function generateCity() {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  return cities[Math.floor(Math.random() * cities.length)];
}

function generateState() {
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC'];
  return states[Math.floor(Math.random() * states.length)];
}

function generateZipCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

function generateCountry() {
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'India', 'Mexico'];
  return countries[Math.floor(Math.random() * countries.length)];
}

function generatePastDate() {
  const past = new Date();
  past.setFullYear(past.getFullYear() - Math.floor(Math.random() * 10));
  return past.toISOString().split('T')[0];
}

function generateFutureDate() {
  const future = new Date();
  future.setFullYear(future.getFullYear() + Math.floor(Math.random() * 10));
  return future.toISOString().split('T')[0];
}

function generateTimestamp() {
  return new Date().toISOString();
}

function generateTimezone() {
  const timezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
  return timezones[Math.floor(Math.random() * timezones.length)];
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomFloat(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateCreditCardNumber() {
  return `4${Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0')}`;
}

function generateLoremIpsum(sentences: number) {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return lorem.split('.').slice(0, sentences).join('.') + '.';
}

function generateWords(count: number) {
  const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(' ');
  return words.sort(() => 0.5 - Math.random()).slice(0, count).join(' ');
}

function generateJSONStructure() {
  return JSON.stringify({
    id: generateRandomInteger(1, 1000),
    name: `${generateName('first')} ${generateName('last')}`,
    email: generateDummyEmail(),
    age: generateRandomInteger(18, 80),
  }, null, 2);
}

function generateBankAccountNumber() {
  return Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
}

function generateTransactionAmount() {
  return `$${generateRandomFloat(1, 1000)}`;
}

function generateCurrencyCode() {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];
  return currencies[Math.floor(Math.random() * currencies.length)];
}

function generateIPv4() {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

function generateIPv6() {
  return Array(8).fill(0).map(() => Math.floor(Math.random() * 65536).toString(16)).join(':');
}

function generateURL() {
  const protocols = ['http', 'https'];
  const domains = ['example.com', 'test.org', 'demo.net', 'sample.io'];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${protocol}://${domain}`;
}

function generateMACAddress() {
  return Array(6).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
}

function generateJSONSchema() {
  return JSON.stringify({
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      age: { type: 'integer', minimum: 0 },
    },
    required: ['id', 'name', 'email'],
  }, null, 2);
}

function generateSQLInsert() {
  const name = `${generateName('first')} ${generateName('last')}`;
  const email = generateDummyEmail();
  const age = generateRandomInteger(18, 80);
  return `INSERT INTO users (name, email, age) VALUES ('${name}', '${email}', ${age});`;
}

function generateAPIPayload() {
  return JSON.stringify({
    user: {
      id: generateRandomInteger(1, 1000),
      name: `${generateName('first')} ${generateName('last')}`,
      email: generateDummyEmail(),
      age: generateRandomInteger(18, 80),
    },
    token: generateJWTToken(),
    timestamp: generateTimestamp(),
  }, null, 2);
}

function generateHash(algorithm: 'md5' | 'sha256') {
  const data = Math.random().toString();
  return algorithm + '_' + data.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

function generateJWTToken() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ sub: generateRandomInteger(1, 1000), name: generateName('first'), iat: Math.floor(Date.now() / 1000) })).toString('base64');
  const signature = 'FAKE_SIGNATURE'; // In a real scenario, this would be cryptographically signed
  return `${header}.${payload}.${signature}`;
}

function generatePlaceholderImage() {
  const width = generateRandomInteger(100, 1000);
  const height = generateRandomInteger(100, 1000);
  return `/placeholder.svg?height=${height}&width=${width}`;
}

function generateRandomVideoLink() {
  return `https://example.com/video/${generateRandomInteger(1000, 9999)}.mp4`;
}

function generateRandomAudioLink() {
  return `https://example.com/audio/${generateRandomInteger(1000, 9999)}.mp3`;
}

function generateSeleniumTestData() {
  return JSON.stringify({
    url: generateURL(),
    username: generateUsername(),
    password: generatePassword(12, { uppercase: true, lowercase: true, numbers: true, symbols: true }),
    expectedTitle: 'Welcome to Test Page',
  }, null, 2);
}

function generateLoadTestingData() {
  return JSON.stringify({
    endpoint: `${generateURL()}/api/test`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${generateJWTToken()}`,
    },
    body: {
      id: generateRandomInteger(1, 1000),
      data: generateWords(10),
    },
  }, null, 2);
}

function generateSpecialCharacters() {
  return '!@#$%^&*()_+-=[]{}|;:,.<>?';
}

function generateBoundaryValues() {
  return JSON.stringify({
    minInteger: Number.MIN_SAFE_INTEGER,
    maxInteger: Number.MAX_SAFE_INTEGER,
    minFloat: Number.MIN_VALUE,
    maxFloat: Number.MAX_VALUE,
    emptyArray: [],
    singleItemArray: [1],
    longString: 'a'.repeat(1000),
  }, null, 2);
}

