import { Component, OnInit } from '@angular/core';
import { Album } from "../album";
import {AlbumService} from "../album.service";
import {interval} from "rxjs/index";
import {take} from "rxjs/internal/operators";
import {promise} from "selenium-webdriver";
import map = promise.map;

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

    currentAlbum:Album;
    duration:number = 0;
    count = interval(1000);
    ratio:number = 0;

  constructor(private aS: AlbumService) { }

  ngOnInit() {

      this.aS.subjectAlbum.subscribe( album => {
            this.currentAlbum = album;
            this.duration = album.duration;
          this.calcDuration();
      });

  }

  calcDuration(){
      this.count.pipe(
          take(this.duration / 60),
      ).subscribe( x => {
          this.ratio = (this.duration / 60) * (x/100);
      });
  }

}
