import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SuperComponent } from './super/super.component'
import { CategorieComponent } from './super/categorie/categorie.component';
import { CoursComponent } from './super/cours/cours.component';
import { LoginComponent } from './authentification/login/login.component';
import { AuthSuper } from './services/authSuper';
import { AuthAdmin } from './services/authAdmin';
import { ActualiteComponent } from './super/actualite/actualite.component';
import { NumeroVertComponent } from './super/numero/numero.component';
import { HopitalComponent } from './super/hopital/hopital.component';
import { CompteComponent } from './super/comptes/comptes.component';
import { SignalementComponent } from './admin/signalement/signalement.component';
import { InterventionComponent } from './admin/intervention/intervention.component';
import { SignalementComponentSuper } from './super/signalement/signalement.component';
import { InterventionComponentSuper } from './super/intervention/intervention.component';
import { ApprenantComponent } from './super/apprenant/apprenant.component';

export const routes: Routes = [
  {path:'login', component: LoginComponent},
  {
    path: 'super',
    component: SuperComponent,
    canActivate:[AuthSuper],
    children: [
      { path: 'categorie', component: CategorieComponent },
      { path: 'cours/:id', component: CoursComponent },
      { path: 'actualite', component: ActualiteComponent},
      { path: 'numero', component: NumeroVertComponent},
      { path: 'hopitaux', component: HopitalComponent},
      { path: 'compte', component: CompteComponent},
      { path: 'apprenant', component: ApprenantComponent},
      { path: 'signalement', component: SignalementComponentSuper },
      { path: 'intervention', component: InterventionComponentSuper },
      { path: '', redirectTo: 'categorie', pathMatch: 'full' } // Redirection par défaut vers body1
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthAdmin],
    children: [
      { path: 'signalement', component: SignalementComponent },
      { path: 'intervention', component: InterventionComponent },
      { path: '', redirectTo: 'signalement', pathMatch: 'full' } // Redirection par défaut vers body1
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Route par défaut
];