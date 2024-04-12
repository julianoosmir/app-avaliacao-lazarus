import { Component } from '@angular/core';
import { PerfilService } from '../core/perfil.service';
import { AuthenticationService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Perfil } from '../models/Perfil';

@Component({
  selector: 'app-cadastro-perfil',
  templateUrl: './cadastro-perfil.component.html',
  styleUrl: './cadastro-perfil.component.css'
})
export class CadastroPerfilComponent {

  nome = '';
  descricao = '';
  perfil : Perfil | undefined;

  constructor(private perfilService: PerfilService, private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit() {
    this.getPerfilLocation();
  }

  validarCampos() {
    const nomeValido = (this.nome !== '' && this.nome !== null && this.nome !== undefined);
    const descricaoValida = (this.descricao !== '' && this.descricao !== null && this.descricao !== undefined);

    return nomeValido && descricaoValida;
  }

  getPerfilLocation() {
    if (this.location.getState()) {
      let stateLocation = this.location.getState() as any;
      let perfilLocation = stateLocation.perfil as Perfil;
      console.log(perfilLocation);
      if (perfilLocation) {
        this.perfilService
          .getPerfilById(perfilLocation.id)
          .subscribe((response: Perfil) => {
            this.nome = response.name;
            this.descricao = response.descricao
            this.perfil = response;
          });
      }
    }
  }

  salvar() {
    if (this.validarCampos()) {

      if(this.perfil?.id){
        this.perfil.descricao = this.descricao;
        this.perfil.name = this.nome;
        this.perfilService.alterar(this.perfil).subscribe(() => {
          this.showSnackbarTopPosition("salvo com sucesso", '', 3000)
        });
      }
       else{
        this.perfilService.salvar(this.nome.toUpperCase(), this.descricao).subscribe(() => {
          this.showSnackbarTopPosition("salvo com sucesso", '', 3000)
        });
      }


    }
  }
  showSnackbarTopPosition(content: string, action: string | undefined, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
