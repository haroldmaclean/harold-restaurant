// src/types/index.ts

// Menu Item Type
export type MenuItemType = {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  createdAt?: string
  updatedAt?: string
}

// Cart Item Type extends MenuItemType and adds quantity
export type CartItem = MenuItemType & {
  quantity: number
}

// User type used for authentication and admin
export interface UserType {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}
