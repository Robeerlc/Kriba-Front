import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { RegisterPage } from './pages/LoginPage/loginPage.component';
import { RegisterPageComponent } from './pages/registerPage/registerPage.component';
import { FavoriteAricle } from './pages/favoriteArticle/favoriteArticle.component';
import { NewPageComponent } from './pages/newsPage/newPage.component';
import { StatsPageComponent } from './pages/statisticsPage/statisticsPage.component';
import { Subscriptionpage } from './pages/subscriptionPage/subscriptionpage';
<<<<<<< Updated upstream
=======
import { UserPageComponent } from './pages/userPage/userPage.component';
>>>>>>> Stashed changes

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
  },
  {
    path: 'saved',
    component: FavoriteAricle
  },
  {
    path: 'statistics',
    component: StatsPageComponent,
  },
  {
    path: 'new',
    component: NewPageComponent,
  },
  {
    path: 'subs',
    component: Subscriptionpage,
  },
<<<<<<< Updated upstream
  
=======
  {
    path:'user',
    component:UserPageComponent
  }

>>>>>>> Stashed changes
];
