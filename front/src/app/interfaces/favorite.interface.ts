import { LoginInterface } from "./loginInterface";

export interface SavedNew {
  externalArticleId: string;
  title: string;
  url: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export interface Favorite {
  loginRequest: LoginInterface;
  savedNew: SavedNew;
}

