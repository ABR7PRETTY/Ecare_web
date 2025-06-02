import { Component } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Cours } from '../../models/cours';
import { CoursService } from '../../services/cours.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-cours',
  imports: [CommonModule,FormsModule,EditorModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {

  cours :Cours = new Cours(); 
  coursSelect :Cours = new Cours(); // Par défaut
  tableauCours : Array<Cours> = [];
  tableauCategorie : Array<Categorie> = [];
  page:number=1;
  voir:Boolean = false;
  categorieId: number=0;
  currentCat: Categorie = new Categorie();
  currentUser : User = new User();


  constructor(private coursService : CoursService, private categorieService : CategorieService, private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getCurrentuser();

    this.route.paramMap.subscribe(params => {
      this.categorieId = Number(params.get('id'));
      if(this.categorieId){
        this.getAllCours(this.categorieId);
        this.getCurrentCat(this.categorieId);
      }
      
    });
  }

  getSafeHtml(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }


    annuler() {
      this.page = 1;
      this.coursSelect = new Cours();
    }
    pageAjout(){
      this.page = 2;
    }

    pageModif(cours: Cours) {
      this.coursSelect = cours;
      this.coursSelect.categorieId = this.categorieId;
      this.page = 3;

    }

    pageSup(cours: Cours) {
      this.coursSelect = cours;
    }

  onFileSelected(event: any) {
    this.cours.medias = Array.from(event.target.files);  // Convertit en tableau
  }
  onFileSelectedModif(event: any) {
    this.coursSelect.medias = Array.from(event.target.files);  // Convertit en tableau
  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((value:Array<Categorie>) => {
      this.tableauCategorie = value;
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  getCurrentCat(id:number) {
    this.categorieService.findCategorie(id).subscribe((value:Categorie) => {
      this.currentCat = value;
    },
    (error:String) => {
      console.log(error);
    },
    () => {

    }
    )

  }

  add() {
    if (this.cours) {
      if(this.categorieId){
        this.cours.categorieId= this.categorieId;
      }
      this.coursService.saveCours(this.cours)
        .subscribe(response => {
          if(this.categorieId){
            this.getAllCours(this.categorieId);
          }
          
          alert('Cours Enrégistrer avec succès')
          this.page=1;
        }, error => {
          console.error("Erreur lors de l'ajout :", error);
          alert(error)
        });
    } else {
      alert("Veuillez remplir tous les champs et sélectionner au moins un fichier !");
    }
  }

  getAllCours(id : number) {
    this.coursService.getAllCours(id).subscribe((value:Array<Cours>) => {
      this.tableauCours = value;
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  update() {
      this.coursService.updateCours(this.coursSelect.id,this.coursSelect).subscribe(
        (response: Cours) => {
          console.log('Cours modifié', response);
          this.page = 1;
          this.coursSelect = new Cours();
          alert('Cours modifiée avec succès !');
          if(this.categorieId){
            this.getAllCours(this.categorieId);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

    Voir(cours : Cours){
      this.coursSelect=cours;
      this.voir = true;

    }
    
  

  delete() {
      this.coursService.deleteCours(this.coursSelect.id).subscribe(
        response => {
          this.tableauCours = this.tableauCours.filter(cours => cours.id !== this.coursSelect.id);
          this.page = 1;
          alert('Cours supprimé avec succès !');
          if(this.categorieId){
            this.getAllCours(this.categorieId);
          }
          this.coursSelect = new Cours();
        },
        (error) => {
          console.log(error);
        }
        
    );}

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
