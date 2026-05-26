import { Source } from "./source.interface"

export interface Article{
  externalId: string
  id:string
  title: string
  description: string
  content: string
  url:string
  image: string
  publishedAt: string
  category: string
  source:Source
}
