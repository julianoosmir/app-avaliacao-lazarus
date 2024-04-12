import { JwtPayload } from "jwt-decode";
import { IRole } from "./IRole";

export interface JwtDto extends JwtPayload{
  role : IRole[]
}
