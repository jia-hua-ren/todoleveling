export interface UserData {
  id: string
  name: string
  email: string
  picture: string
  exp: number
  level: number
}

export type Task = {
  id: number
  title: string
  completed: boolean
}
