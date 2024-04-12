import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

  //authDto?: AuthDto;

  constructor(private auth: AuthenticationService, public router: Router,private snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const roles = next.data['role'] as string[];

    const role_user = this.auth.getRole();

    if(roles.indexOf(role_user) >= 0){
      return true
    }else{
      this.showSnackbarTopPosition('Você não tem acesso','',3000);
      this.router.navigateByUrl("/");
      return false;

    }

  }
  showSnackbarTopPosition(content: string, action: string | undefined, duration: any): void {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

}
