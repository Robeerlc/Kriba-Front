import { Article } from "./article.interface"
 
export interface Feed{
  totalArticles: number
  content: Article[],
  totalPages:number,
  last:boolean,
  totalElements:number
}
 
 
