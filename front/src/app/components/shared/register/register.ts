import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { RegisterInterface } from '../../../interfaces/register.interface';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/credentialsService.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  registerError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService){
    this.registerForm=this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    })
  }

  get username() {
    return this.registerForm.controls['username'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get repeatPassword() {
    return this.registerForm.controls['repeatPassword'];
  }

  register(): void{
    if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched(); 
        return;
    }

    if (this.registerForm.value.password != this.registerForm.value.repeatPassword) {
      this.registerError = "Las contraseñas no coinciden";
      return;
    }

     const registerData = this.registerForm.value as RegisterInterface;
     this.loginService.register(registerData).subscribe({
        next: (userData) => {
          console.log('Usuario registrado:', userData);
          this.registerError = "";
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.error(err);
          this.registerError = err.message;
        }
      });
    }

}
