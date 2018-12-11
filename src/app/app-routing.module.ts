import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumsComponent} from "./albums/albums.component";
import {LoginComponent} from "./login/login.component";
import {DescriptionComponent} from "./description/description.component";
import {Page404Component} from "./page404/page404.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {GuardService} from './GuardService';

const routes: Routes = [
    {
        path: "albums",
        component: AlbumsComponent
    },
    {
        path: "",
        redirectTo: "/albums",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "album/:id",
        component: DescriptionComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [GuardService]
    },
    {
        path: "404",
        component: Page404Component
    },
    {
        path: "**",
        redirectTo: "/404"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
