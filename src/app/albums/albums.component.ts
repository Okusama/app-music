import { Component, OnInit } from '@angular/core';
import { Album } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page Principale Albums Music";
  albums: Album[] = [];
  selectedAlbum: Album;
  statutPlay:string;

  constructor(private albumService: AlbumService) {
    console.log(this.count());
  }

  ngOnInit() {
      this.getAlbums();
  }

  getAlbums(){
      //this.albums = this.albumService.paginate(1,3);
      this.albums = this.albumService.getAlbums();
  }

  onSelect(album){
    this.selectedAlbum = this.albumService.getAlbum(album.id);
  }

  playParent(event){
    this.statutPlay = event.id;
  }

  searchParent(event){
      this.albums = event;
  }

  count():number{
      return this.albumService.getAlbums().length;
  }

}
