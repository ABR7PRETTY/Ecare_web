import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthSuper implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()&& this.authService.getRole()=="SUPERADMIN") {
      return true;
    }
    
    this.router.navigate(['/login']);
    console.log("redirection echoué")
    return false;
  }
}
