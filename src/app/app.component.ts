import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Join Cadastro de Produtos';

  router = inject(Router);


  onInitClick(){
    this.router.navigate(['/home']);
  }

  onLogoutClick(){
    this.router.navigate(['/home']);
  }
}
