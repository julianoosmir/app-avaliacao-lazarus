import { Perfil } from "./Perfil";

export class UsuarioDto {
  id?: number;
  nome: string | undefined;
  perfils: number[] | undefined;
  senha:string | undefined;
  ativo: boolean | undefined
}
