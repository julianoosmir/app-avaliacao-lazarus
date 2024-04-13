import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isUserLoggedIn();
  }




  handleLogout() {
    this.authenticationService.logout();
  }
}
