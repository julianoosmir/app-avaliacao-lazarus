import { Perfil } from "./Perfil";

export interface UsuarioResponse {
  id: number,
  nome: string,
  username: string,
  senha:string,
  perfil: Perfil[]
}
