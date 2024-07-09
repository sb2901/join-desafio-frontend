import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardContent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  router = inject(Router);



  onClickCategory(){
    this.router.navigate(['/category']);
  }

  onClickProduct(){
    this.router.navigate(['/product']);
  }
}
