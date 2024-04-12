import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../core/auth.service';
import { UsuarioService } from '../core/usuario.service';
import { UsuarioResponse } from '../models/usuarioResponse';
import { Perfil } from '../models/Perfil';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  usuarios: UsuarioResponse[] = [];
  role = '';
  constructor(private usuarioService: UsuarioService,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.role = this.getRole();
    this.getUsuarios();
  }
  getRole(){
    return this.authenticationService.getRole();
  }

  getUsuarios() {
    this.usuarioService
      .listar()
      .subscribe((usuarios: UsuarioResponse[]) =>{
          this.usuarios = usuarios;
          console.log(this.usuarios)
      });
  }

  getPerfilName(perfis :Perfil[]){
    return perfis.map(p=> p.name).join(",")
  }

  deletar(id?:number){
    this.usuarioService.delete(id).subscribe(() =>{
        this.usuarios = this.usuarios.filter(forca => forca.id != id);
    })
  }

}
