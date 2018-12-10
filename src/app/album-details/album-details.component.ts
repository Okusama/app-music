import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  @Output() onStop: EventEmitter<Album> = new EventEmitter();

  @Input() album:Album;
  list: List[] = [];
  songs: string[];

  constructor(private albumService: AlbumService) {

  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.getAlbumList();
  }

  getAlbumList(){
      if(this.album){
          console.log(this.album);
          this.songs = this.albumService.getAlbumList(this.album.id).list;
      }
  }

  play(album: Album){
    this.onPlay.emit(album);
  }

  stop(album: Album) {
    this.onStop.emit(album);
  }

}
