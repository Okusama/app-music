import { Component, OnInit } from '@angular/core';
import {MusicListService, Music, Color} from '../music-list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
    providers: [MusicListService]
})
export class MusicListComponent implements OnInit {

    musics: Music[] = [];

  constructor(private mls: MusicListService) { }

  ngOnInit() {
    this.getMusicList();
  }

  getMusicList() {
      this.mls.musics().subscribe( musics => {
          this.musics = musics;
      });
  }

  setColor(id: number){
      this.mls.setColor(id);
  }

}
