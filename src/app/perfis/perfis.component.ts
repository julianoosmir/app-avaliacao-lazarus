import { Component } from '@angular/core';
import { PerfilService } from '../core/perfil.service';
import { AuthenticationService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perfil } from '../models/Perfil';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrl: './perfis.component.css'
})
export class PerfisComponent {


  role = '';
  perfils: Perfil[] = [];

  constructor(private perfilService: PerfilService, private authenticationService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPerfils();
    this.role = this.getRole();
  }

  getPerfils() {
    return this.perfilService.getPerfils().subscribe((perfils: Perfil[]) => {
      this.perfils = perfils;
    })
  }
  getRole() {
    return this.authenticationService.getRole();
  }
  showSnackbarTopPosition(content: string, action: string | undefined, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  deletar(id: number) {
    this.perfilService.delete(id).subscribe(() => {
      this.showSnackbarTopPosition("salvo com sucesso", '', 3000)
      this.getPerfils();
    });
  }
}
