import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { RegisterPage } from './pages/LoginPage/loginPage.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [


  {
    path: 'home',
    component:HomePageComponent
  },

  {
    path: '',
    component: RegisterPage
  },
  {
    path: 'register',
    component:RegisterPageComponent
  }
  
];
