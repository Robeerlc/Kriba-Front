import { Component } from '@angular/core';
import { Register } from "../../components/shared/register/register";

@Component({
  selector: 'app-register-page',
  imports: [Register],
  templateUrl: './registerPage.component.html',
  styleUrl: './registerPage.component.css',
})
export class RegisterPageComponent {}
