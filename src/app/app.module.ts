import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { DescriptionComponent } from './description/description.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { PaginateComponent } from './paginate/paginate.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    DescriptionComponent,
    LoginComponent,
    Page404Component,
    PaginateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
