import { Component } from '@angular/core';
import { Intervention } from '../../models/intervention';
import { InterventionService } from '../../services/intervention.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-intervention',
  imports: [CommonModule,FormsModule],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.css'
})
export class InterventionComponentSuper {

  tableauTraitement : Array<Intervention> = [];
  tableauAcheve : Array<Intervention> = [];
  type:string = "en cours";
  page:number=1;
  voir:Boolean = false;
  popupVisible: boolean = false;
  interventionSelect : Intervention = new Intervention();


  constructor(private interventionService: InterventionService , private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.getAllIntervention();
      }


    annuler() {
      this.page = 1;
      this.interventionSelect = new Intervention();
    }

    pageSup(intervention: Intervention) {
      this.interventionSelect = intervention;
    }

  getAllIntervention() {
    this.interventionService.getAllIntervention().subscribe((value:Array<Intervention>) => {
      this.tableauTraitement = value.filter(intervention => intervention.statut !== 'Achevé').reverse();
      this.tableauAcheve = value.filter(intervention => intervention.statut === 'Achevé').reverse();
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

    Voir(intervention : Intervention){
      this.interventionSelect=intervention;
      this.voir = true;

    }
    

  delete() {
    this.interventionService.deleteIntervention(this.interventionSelect.id).subscribe(
      response => {
        this.tableauTraitement = this.tableauTraitement.filter(intervention => intervention.id !== this.interventionSelect.id);
        this.page = 1;
          this.getAllIntervention();
          this.popupVisible = true;
          setTimeout(() => {
            this.popupVisible = false;
          }
          , 3000);
          
        this.interventionSelect = new Intervention();
      },
      (error) => {
        console.log(error);
      }
      
  );
}
}

