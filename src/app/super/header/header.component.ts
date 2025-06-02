import { Component } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser : User = new User();

  ngOnInit(): void {
    this.getCurrentuser()
  }

  constructor(private userService: AuthentificationService){}

  getCurrentuser() {
        this.userService.getUser().subscribe((value:User) => {
          this.currentUser = value;
        },
        (error:String) => {
          console.log(error);
        },
        () => {
    
        }
        )
    
      }
  
  }

