import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RoleGuardServiceService } from './core/role-guard-service.service';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroPerfilComponent } from './cadastro-perfil/cadastro-perfil.component';
import { PerfisComponent } from './perfis/perfis.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuarios', component: UsuariosComponent,
    canActivate: [RoleGuardServiceService], data: {
      role: ['ADMIN', 'USER']
    }
  },
  {
    path: 'cadastro-usuario', component: CadastroUsuarioComponent,
    canActivate: [RoleGuardServiceService], data: {
      role: ['ADMIN']
    }
  },
  {
    path: 'cadastro-perfil', component: CadastroPerfilComponent,
    canActivate: [RoleGuardServiceService], data: {
      role: ['ADMIN']
    }
  },
  {
    path: 'perfils', component: PerfisComponent,
    canActivate: [RoleGuardServiceService], data: {
      role: ['ADMIN', 'USER']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
