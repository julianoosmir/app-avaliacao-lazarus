import { Perfil } from "./Perfil";

export class User{
  id!: number;
  nome?: string;
  senha?:string;
  ativo?: boolean;
  perfis?: Perfil[];
}
