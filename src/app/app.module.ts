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
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import {HttpClientModule} from '@angular/common/http';
import * as firebase from 'firebase';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminModule} from './admin/admin.module';
import {ShareModule} from './share/share.module';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrXKxNH2hXPV1U8IdwMuOWXOgcgUqgx7U",
    authDomain: "app-music-712e7.firebaseapp.com",
    databaseURL: "https://app-music-712e7.firebaseio.com",
    projectId: "app-music-712e7",
    storageBucket: "app-music-712e7.appspot.com",
    messagingSenderId: "661265087257"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    DescriptionComponent,
    LoginComponent,
    Page404Component,
    AudioPlayerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AdminModule,
      ShareModule
  ]
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
