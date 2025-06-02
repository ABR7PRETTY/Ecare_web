import { Component } from '@angular/core';
import { NumeroVert } from '../../models/numero';
import {  NumeroVertService} from '../../services/numero.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-numero',
  imports: [CommonModule,FormsModule],
  templateUrl: './numero.component.html',
  styleUrl: './numero.component.css'
})
export class NumeroVertComponent {

  numero :NumeroVert = new NumeroVert(); 
  numeroSelect :NumeroVert = new NumeroVert(); // Par défaut
  tableauNumeroVert : Array<NumeroVert> = [];
  page:number=1;
  voir:Boolean = false;
  modifVisible: boolean = false;
  supVisible: boolean = false;
  saveVisible: boolean = false;


  constructor(private numeroService : NumeroVertService){}

  ngOnInit(): void {
    this.getAllNumeroVert();
      }


    annuler() {
      this.page = 1;
      this.numeroSelect = new NumeroVert();
    }
    pageAjout(){
      this.page = 2;
    }

    pageModif(numero: NumeroVert) {
      this.numeroSelect = numero;
      this.page = 3;
    }

    pageSup(numero: NumeroVert) {
      this.numeroSelect = numero;
      this.page = 4;
    }

  add() {
      this.numeroService.saveNumeroVert(this.numero)
        .subscribe(response => {
          console.log(response)
            this.getAllNumeroVert();
          this.page=1;
          this.saveVisible = true;
          setTimeout(() => {
            this.saveVisible = false;
          }
          , 3000); // Masquer le message après 2 secondes
          this.numero = new NumeroVert();
        }, error => {
          console.error("Erreur lors de l'ajout :", error);
        });
  }

  getAllNumeroVert() {
    this.numeroService.getAllNumeroVert().subscribe((value:Array<NumeroVert>) => {
      this.tableauNumeroVert = value;
      console.log(value);
      console.log(this.tableauNumeroVert[0].numero)
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  update() {
      this.numeroService.updateNumeroVert(this.numeroSelect.id,this.numeroSelect).subscribe(
        (response: NumeroVert) => {
          console.log('NumeroVert modifié', response);
          this.getAllNumeroVert();
          this.page = 1;
          this.modifVisible = true;
          setTimeout(() => {
            this.modifVisible = false;
          }, 3000); // Masquer le message après 2 secondes
          this.numeroSelect = new NumeroVert();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  delete() {
      this.numeroService.deleteNumeroVert(this.numeroSelect.id).subscribe(
        response => {
          this.tableauNumeroVert = this.tableauNumeroVert.filter(numero => numero.id !== this.numeroSelect.id);
          this.page = 1;
          this.getAllNumeroVert();
          this.supVisible = true;
          setTimeout(() => {
            this.supVisible = false;
          }, 3000); // Masquer le message après 2 secondes
          this.numeroSelect = new NumeroVert();
        },
        (error) => {
          console.log(error);
        }
        
    );}


}
