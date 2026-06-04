import { Article } from "./article.interface"
<<<<<<< Updated upstream

export interface Feed{
  totalArticles: number
  articles: Article[]
}
=======
 
export interface Feed{
  totalArticles: number
  content: Article[],
  totalPages:number,
  last:boolean,
  totalElements:number
}
 
 
>>>>>>> Stashed changes
