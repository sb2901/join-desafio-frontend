import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){

    if(this.loginForm.valid){

      this.authService.login(this.loginForm.value)
      .subscribe(
        {
          next: (data: any) => {
            if(this.authService.isLoggedIn()){
              this.router.navigate(['/home']);
            }
          },
          error:  (error:any) =>{
            console.log(error);
            if(error?.status === 403){
              console.log('Usuario ou senha inválido');
            }
          }
        });
      }
  }
}