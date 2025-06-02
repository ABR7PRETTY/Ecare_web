import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Errauth:Boolean = false;
  username = '';
  password = '';

  constructor(private authService: AuthentificationService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveRole(response.role);
        console.log('Login success', response);
        this.Errauth=false;
        if (response.role=="SUPERADMIN"){
          this.router.navigate(['/super']);
        }else {
          this.router.navigate(['/admin'])
        }
        
      },
      error: (err) => {
        this.Errauth=true;
        console.error('Erreur de connexion', err);
      }
    });
  }
  

}
