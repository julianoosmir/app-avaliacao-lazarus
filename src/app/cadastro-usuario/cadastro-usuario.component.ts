import { Component, Input } from '@angular/core';
import { UsuarioDto } from '../models/usuarioDto';
import { UsuarioService } from '../core/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { User } from '../models/usuarioModel';
import { UsuarioResponse } from '../models/usuarioResponse';
import { PerfilService } from '../core/perfil.service';
import { Perfil } from '../models/Perfil';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent {

  usuario = new UsuarioDto();
  user!: User;
  @Input() nome? = '';
  @Input() senha: string | undefined;
  @Input() ativo: boolean | undefined;
  perfis: Perfil[] = [];
  perfilsSelecionados!: Perfil[];
  @Input() perfil = new Perfil();
  @Input() perfilId: number[] | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.getUserLocation();
    this.getPerfils();
  }
  getPerfils() {
    return this.perfilService.getPerfils().subscribe((perfis: Perfil[]) => {
      this.perfis = perfis;
    });
  }
  salvarCampos() {
    this.usuario.nome = this.nome;
    this.usuario.ativo = this.ativo;
    this.usuario.perfils = this.perfilsSelecionados.map(p => p.id);
    this.usuario.senha = this.senha? this.senha : "";
    if (this.user) {
      this.usuario.id = this.user.id;
    }
    console.log(this.usuario)
  }
  salvar() {
    this.salvarCampos();
    if (this.user) {
      this.usuarioService.alterar(this.usuario).subscribe(() => {
        this.showSnackbarTopPosition('alterado com sucesso', '', 3000);
      });
    } else {
      this.usuarioService.salvar(this.usuario).subscribe(
        () => {
          this.showSnackbarTopPosition('salvo com sucesso', '', 3000);
        }
      );
    }
  }

  getUserLocation() {
    if (this.location.getState()) {
      let stateLocation = this.location.getState() as any;
      let userLocation = stateLocation.user as UsuarioResponse;
      console.log(this.location.getState(), userLocation);
      if (userLocation) {
        this.usuarioService
          .getById(userLocation.id)
          .subscribe((response: User) => {
            this.usuario.id = response.id;
            this.ativo = response.ativo;
            this.nome = response.nome;
            this.perfis = response.perfis as Perfil[];
            this.perfilId = this.perfis.map(p=> p.id);
            this.user = response;
          });
      }
    }
  }

  showSnackbarTopPosition(
    content: string,
    action: string | undefined,
    duration: any
  ) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  perfilChange(event: any) {
    console.log(event)
    return event;
  }
}
