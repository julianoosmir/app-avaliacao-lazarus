import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_USER, URL_USER_TODOS } from "../constants/api";
import { UsuarioDto } from "../models/usuarioDto";
import { User } from "../models/usuarioModel";
import { UsuarioResponse } from "../models/usuarioResponse";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  constructor(private http: HttpClient){

  }

  salvar(user: UsuarioDto) {
    return this.http.post(URL_USER, user);
  }

  alterar(user: UsuarioDto) {
    return this.http.put(URL_USER, user);
  }
  getById(id : number): Observable<User>{
    return this.http.get<User>(URL_USER + "/" + id);
  }

  delete(id?: number){
    return this.http.delete(URL_USER +"/"+ id);
  }

  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(URL_USER);
  }
}
