import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../super/header/header.component';
import { FooterComponent } from '../super/footer/footer.component';
import { AsideComponent } from '../super/aside/aside.component';
import { StatsComponent } from '../super/stats/stats.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsideComponent
   ,StatsComponent,CommonModule
  ],
  templateUrl: './super.component.html',
  styleUrl: './super.component.css'
})
export class SuperComponent {

}
