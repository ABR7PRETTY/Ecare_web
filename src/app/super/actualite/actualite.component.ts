import { Component } from '@angular/core';
import { Actualite } from '../../models/actualite';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ActualiteService } from '../../services/actualite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-actualite',
  imports: [CommonModule,FormsModule,EditorModule],
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css'
})
export class ActualiteComponent {

  actualite :Actualite = new Actualite(); 
  actualiteSelect :Actualite = new Actualite(); // Par défaut
  tableauActualite : Array<Actualite> = [];
  tableauCategorie : Array<Categorie> = [];
  page:number=1;
  voir:Boolean = false;
  modifVisible: boolean = false;
  supVisible: boolean = false;
  saveVisible: boolean = false;
  currentUser : User = new User();


  constructor(private actualiteService : ActualiteService, private categorieService : CategorieService, private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getCurrentuser();
    this.getAllActualite();
      }


    annuler() {
      this.page = 1;
      this.actualiteSelect = new Actualite();
    }
    pageAjout(){
      this.page = 2;
    }

    getSafeHtml(content: string) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }

    pageModif(actualite: Actualite) {
      this.actualiteSelect = actualite;
      this.page = 3;
      console.log('date',this.actualiteSelect.date_fin);
      console.log(this.actualiteSelect);
    }

    pageSup(actualite: Actualite) {
      this.actualiteSelect = actualite;
    }

  onFileSelected(event: any) {
    this.actualite.medias = Array.from(event.target.files);  // Convertit en tableau
  }
  onFileSelectedModif(event: any) {
    this.actualiteSelect.medias = Array.from(event.target.files);  // Convertit en tableau
  }


  add() {
      this.actualiteService.saveActualite(this.actualite)
        .subscribe(response => {
            this.getAllActualite();
          this.page=1;
          this.saveVisible = true;
          setTimeout(() => {
            this.saveVisible = false;
          }
          , 3000); // Masquer le message après 2 secondes
        }, error => {
          console.error("Erreur lors de l'ajout :", error);
          alert(error)
        });
  }

  getAllActualite() {
    this.actualiteService.getAllActualite().subscribe((value:Array<Actualite>) => {
      this.tableauActualite = value;
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  update() {
      this.actualiteService.updateActualite(this.actualiteSelect.id,this.actualiteSelect).subscribe(
        (response: Actualite) => {
          console.log('Actualite modifié', response);
          this.getAllActualite();
          this.page = 1;
          this.actualiteSelect = new Actualite();
          this.modifVisible = true;
          setTimeout(() => {
            this.modifVisible = false;
          }
          , 3000);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    Voir(actualite : Actualite){
      this.actualiteSelect=actualite;
      this.voir = true;

    }
    
  delete() {
      this.actualiteService.deleteActualite(this.actualiteSelect.id).subscribe(
        response => {
          this.tableauActualite = this.tableauActualite.filter(actualite => actualite.id !== this.actualiteSelect.id);
          this.page = 1;
            this.getAllActualite();
          this.actualiteSelect = new Actualite();
          this.supVisible = true;
          setTimeout(() => {
            this.supVisible = false;
          }
          , 3000);
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
