import { LoginInterface } from "./loginInterface";

export interface Subscribe {
  loginRequest: LoginInterface;
  externalSourceId: string;
  sourceName: string;
}