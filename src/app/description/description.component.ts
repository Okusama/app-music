import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Album } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

    album: Album;

  constructor(private route:ActivatedRoute, private aS: AlbumService) {

  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get("id");
      this.aS.getAlbum(id).subscribe(album => {
          this.album = album;
      });
  }

}
