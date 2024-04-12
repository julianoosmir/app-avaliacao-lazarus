import { URL_PERFIL } from '../constants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getPerfils(): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(URL_PERFIL)
  }
  getPerfilById(id?:number): Observable<Perfil>{
    return this.http.get<Perfil>(URL_PERFIL + '/' + id)
  }

  alterar(perfil:Perfil){
    return this.http.put(URL_PERFIL + '/' + perfil.id,perfil);
  }

  salvar(name:string,descricao:string){
    const data = { name : name,descricao : descricao}

    return this.http.post(URL_PERFIL,data);
  }
  delete(id?:number){
    return this.http.delete(URL_PERFIL + '/' + id);
  }
}
