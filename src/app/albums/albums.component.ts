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
      this.albumService.getAlbums().subscribe(
          albums => {console.log(albums)}
      )
  }

   ngOnInit() {
        this.getAlbums();
    }

   getAlbums() {
        this.albumService.paginate(0, 4).subscribe(albums => {
            this.albums = albums;
        });
    }

  onSelect(album){
    this.albumService.getAlbum(album.id).subscribe( albums => {
        this.selectedAlbum = albums;
    });
  }

  playParent(event){
    this.statutPlay = event.id;
    this.albumService.switchOn(event);
  }

  searchParent(event){
      this.albums = event;
  }

  pageParent(event){
    this.albumService.paginate(event.start, event.end).subscribe( albums => {
        this.albums = albums;
    });
  }

}
