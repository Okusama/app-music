import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, query, stagger} from "@angular/animations";
import { Album } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
    animations: [
        trigger("loadAlbum",[
            transition("* => *",[
                query(":enter", [
                    style({
                        left:"-50%",
                        opacity: "0"
                    }),
                    stagger(500,[
                        animate("3s ease",
                            style({
                                transform: "translateX(50%)",
                                opacity: "1"
                            })
                        )
                    ]),
                ]),
            ])
        ])
    ]
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page Principale Albums Music";
  albums: Album[] = [];
  selectedAlbum: Album;
  statutPlay:string;

  constructor(private albumService: AlbumService) {
  }

    ngOnInit() {
        this.getAlbums();
    }

    getAlbums(){
        this.albums = this.albumService.paginate(0, 4);
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

  nextParent(event){
    this.albums = event;
  }

  prevParent(event){
      this.albums = event;
  }

  pageParent(event){
      this.albums = event;
  }

  count():number{
      return this.albumService.getAlbums().length;
  }

}
