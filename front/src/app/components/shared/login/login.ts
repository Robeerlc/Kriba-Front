import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { LoginService } from '../../../service/credentialsService.service';
import { LoginInterface } from '../../../interfaces/loginInterface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {

  loginForm: FormGroup;
  loginError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Para abreviar en el HTML
  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); //Muestra los errores
      return;
    }
    // Obtiene y transforma del HTML
    const credentials = this.loginForm.value as LoginInterface;
    this.loginService.login(credentials).subscribe({
      next: (userData) => {
        console.log('Usuario autenticado:', userData);
        this.loginError = "";
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error(err);
        this.loginError = err.message;
      }
    });
  }
}
