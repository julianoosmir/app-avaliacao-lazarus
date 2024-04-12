import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BasicSnackBarComponent } from './basic-snack-bar/basic-snack-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TableModule } from 'primeng/table';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { InputTextModule } from 'primeng/inputtext';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './core/token.interceptor';
import { MultiSelectModule } from 'primeng/multiselect';
import { CadastroPerfilComponent } from './cadastro-perfil/cadastro-perfil.component';
import { MenuComponent } from './menu/menu.component';
import { PerfisComponent } from './perfis/perfis.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BasicSnackBarComponent,
    UsuariosComponent,
    CadastroUsuarioComponent,
    CadastroPerfilComponent,
    MenuComponent,
    PerfisComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
