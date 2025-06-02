import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-aside',
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

  constructor(private authService : AuthentificationService){}

  Deconnection(){
    this.authService.logout();
  }
  
}
