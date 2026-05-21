import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { RegisterInterface } from '../../../interfaces/register.interface';
import { RegisterService } from '../../../service/register-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  registerError: string = "";

  constructor(private fb: FormBuilder, private registerService:RegisterService,  private router: Router){
    this.registerForm=this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

  register(): void{
    if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched(); //Muestra los errores
        return;
      }

     const registerData = this.registerForm.value as RegisterInterface;
     this.registerService.register(registerData).subscribe({
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
