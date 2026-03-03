// Dummy authentication for demo purposes
// In production, use a proper auth solution like NextAuth.js or Supabase Auth

export interface User {
  id: string
  email: string
  name: string
}

export const DEMO_CREDENTIALS = {
  email: "admin@gregory.dev",
  password: "admin123",
}

export function validateCredentials(email: string, password: string): User | null {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    return {
      id: "1",
      email: DEMO_CREDENTIALS.email,
      name: "Gregory Odhiambo",
    }
  }
  return null
}
