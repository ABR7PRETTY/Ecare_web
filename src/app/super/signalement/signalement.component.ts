import { Component } from '@angular/core';
import { Alerte } from '../../models/alerte';
import { AlerteService } from '../../services/alerte.service';
import { InterventionService } from '../../services/intervention.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-alerte',
  imports: [CommonModule,FormsModule],
  templateUrl: './signalement.component.html',
  styleUrl: './signalement.component.css'
})
export class SignalementComponentSuper {

  tableauAlerte : Array<Alerte> = [];
  page:number=1;
  popupVisible: boolean = false;
  voir:Boolean = false;
  alerteSelect : Alerte = new Alerte();


  constructor(private alerteService : AlerteService,private interventionService: InterventionService , private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.getAllAlerte();
      }


    annuler() {
      this.page = 1;
      this.alerteSelect = new Alerte();
    }

    pageSup(alerte: Alerte) {
      this.alerteSelect = alerte;
    }

  getAllAlerte() {
    this.alerteService.getAllAlerte().subscribe((value:Array<Alerte>) => {
      this.tableauAlerte = value.reverse();
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

    Voir(alerte : Alerte){
      this.alerteSelect=alerte;
      this.voir = true;

    }
    
  delete() {
      this.alerteService.deleteAlerte(this.alerteSelect.id).subscribe(
        response => {
          this.tableauAlerte = this.tableauAlerte.filter(alerte => alerte.id !== this.alerteSelect.id);
          this.page = 1;
            this.getAllAlerte();
            this.popupVisible = true;
            setTimeout(() => {
              this.popupVisible = false;
            }
            , 3000); // 2 seconds delay
          this.alerteSelect = new Alerte();
        },
        (error) => {
          console.log(error);
        }
        
    );
  }
  }