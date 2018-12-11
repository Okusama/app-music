import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../album.service';
import {Album} from '../album';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    albums: Album[] = [];

  constructor(private albumService: AlbumService) { }

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

}
