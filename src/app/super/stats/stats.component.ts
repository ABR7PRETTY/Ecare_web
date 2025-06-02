import { Component } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { AuthentificationService } from '../../services/authentification.service';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  totalCours: number = 0;
  totalCategories: number =0;
  totalHopital: number =0;
  totalUser: number =0;

  constructor(private coursService: CoursService, private userService: AuthentificationService, 
    private categorieService: CategorieService
  ){}

  ngOnInit(): void{
    this.getTotalCours();
    this.getTotalCategorie();
    this.getTotalUser();
  }

  getTotalCours(){
          this.coursService.TotalCours().subscribe((value:number) => {
            this.totalCours = value;
          },
          (error:String) => {
            console.log(error);
          },
          () => {
      
          }
          )

  }


getTotalCategorie(){
  this.categorieService.TotalCategories().subscribe((value:number) => {
    this.totalCategories = value;
  },
  (error:String) => {
    console.log(error);
  },
  () => {

  }
  )

}

getTotalUser(){
  this.userService.TotalUsers().subscribe((value:number) => {
    this.totalUser = value;
  },
  (error:String) => {
    console.log(error);
  },
  () => {

  }
  )

}

}
