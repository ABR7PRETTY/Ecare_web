import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule, Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-categorie',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {

  super : Boolean = false;
  page : number = 1;
  tableauCategorie: Array<Categorie> = [];
  categorieSelect : Categorie = new Categorie();
  categorieAjout : Categorie = new Categorie();
  titre: string = '';
  description: string = '';
  image: File | null = null;
  imageModif: File | null = null;
  hoveredIndex : number | null = null;

  constructor(private categorieService: CategorieService,private authService: AuthentificationService , private router: Router) {};


  ngOnInit(): void {
    this.getAllCategories();
    if(this.authService.getRole()=="SUPERADMIN"){
      this.super=true;
    }
    }

    pageAjout() {
      this.page = 2;
    }

    pageModif(categorie: Categorie) {
      this.categorieSelect = categorie;
      this.page = 3;
    }

    pageSup(categorie: Categorie) {
      this.categorieSelect = categorie
      this.page = 4;
    }

    annuler() {
      this.page = 1;
      this.categorieSelect=new Categorie();
    }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((value:Array<Categorie>) => {
      this.tableauCategorie = value;
      console.log(this.tableauCategorie[0].image)
    },
    (error:String) => {

    },
    () => {

    }
    )

  }


  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  onFileSelectedModif(event: any) {
    this.imageModif = event.target.files[0];
  }

  add() {
    if (this.categorieAjout) {
      if(this.image){
        this.categorieAjout.image=this.image;
      }
      this.categorieService.saveCategorie(this.categorieAjout).subscribe(
        (response) => {
          console.log('Catégorie enregistrée', response);
          alert('Catégorie ajoutée avec succès !');
          this.getAllCategories();
          this.page = 1;
          this.categorieAjout= new Categorie ;
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs !');
    }
  }

  update() {
      if(this.imageModif){
        this.categorieSelect.image=this.imageModif;
      }
      this.categorieService.updateCategorie(this.categorieSelect.id, this.categorieSelect).subscribe(
        (response: Categorie) => {
          console.log('Catégorie modifiée', response);
          this.page = 1;
          this.categorieSelect = new Categorie;
          alert('Catégorie modifiée avec succès !');
          this.getAllCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    }


  delete() {
      this.categorieService.deleteCategorie(this.categorieSelect.id).subscribe(
        response => {
          this.tableauCategorie = this.tableauCategorie.filter(categorie => categorie.id !== this.categorieSelect.id);
          this.page = 1;
          alert(response)
        },
        (error) => {
          console.log(error);
        }
        
    );
  }

  goToCours(categorieId: number) {
    const url = ['/cours', categorieId];
    console.log('URL générée:', url);
    this.router.navigate(url);
  }

}
