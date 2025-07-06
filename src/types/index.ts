// src/types/index.ts
export type MenuItemType = {
  _id: string
  name: string
  description: string
  price: string
  createdAt?: string
  updatedAt?: string
}

// User type used for authentication and admin
export interface UserType {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}
