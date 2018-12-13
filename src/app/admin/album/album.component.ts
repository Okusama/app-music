import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../../album.service';
import {Album} from '../../album';
import {Router} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

    albums: Album[] = [];
    showModal: boolean = false;
    album;

    constructor(private albumService: AlbumService, private router: Router) { }

    ngOnInit() {
        this.getAlbums();
    }

    getAlbums() {
        this.albumService.paginate(0, 4).subscribe(albums => {
            console.log(albums);
            this.albums = albums;
        });
    }

    pageParent(event){
        this.albumService.paginate(event.start, event.end).subscribe( albums => {
            this.albums = albums;
        });
    }

    deleteAlbum(album: Album): void {
        this.showModal = true;
        this.album = album;
    }

    choice($event) {
        this.showModal = $event.showModal;
    }

    yes() {
        this.showModal = false;
        this.albumService.deleteAlbum(this.album).subscribe(album => {
            console.log(album);
        }, error => {
            console.error(error);
        }, () => {
            this.getAlbums();
        });
    }

    no() {
        this.showModal = false;
    }

}
