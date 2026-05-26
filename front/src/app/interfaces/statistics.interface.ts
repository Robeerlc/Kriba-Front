import { CategoryStats } from "./categoryStats.interface";

export interface Statistics{
  generalData: CategoryStats[],
  totalArticlesRead: number
}
