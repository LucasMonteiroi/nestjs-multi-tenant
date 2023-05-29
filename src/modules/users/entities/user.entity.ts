import { Role } from "@prisma/client"

export interface User {
    id: string
    name: string
    username: string
    email: string
    password: string
    active: boolean
    role: Role
}