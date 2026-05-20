import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { Login } from './components/shared/login/login';
import { RegisterPage } from './pages/LoginPage/loginPage.component';

export const routes: Routes = [


  {
    path: 'home',
    component:HomePageComponent
  },

  {
    path: ''
  ,
    component: RegisterPage
  }
];
