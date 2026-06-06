import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { RegisterPage } from './pages/LoginPage/loginPage.component';
import { RegisterPageComponent } from './pages/registerPage/registerPage.component';
import { FavoriteAricle } from './pages/favoriteArticle/favoriteArticle.component';
import { NewPageComponent } from './pages/newsPage/newPage.component';
import { StatsPageComponent } from './pages/statisticsPage/statisticsPage.component';
import { Subscriptionpage } from './pages/subscriptionPage/subscriptionpage';
import { UserPageComponent } from './pages/userPage/userPage.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saved',
    component: FavoriteAricle,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: StatsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: NewPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subs',
    component: Subscriptionpage,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  }
];
