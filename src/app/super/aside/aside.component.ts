import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-aside',
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  showSubmenu: boolean = false;


  constructor(private authService : AuthentificationService, @Inject(Router) private router: Router){}

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }

  isSubLinkActive(): boolean {
    return this.router.url.includes('/compte') || this.router.url.includes('/comptes');
  }

  Deconnection(){
    this.authService.logout();
  }

}
