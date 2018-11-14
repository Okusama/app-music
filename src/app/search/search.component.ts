import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm } from "@angular/forms";
import { AlbumService } from "../album.service";
import { Album } from "../album";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() onSearch: EventEmitter<Album[]> = new EventEmitter();
    @Input() album:Album;

  constructor(private albumService:AlbumService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
      this.onSearch.emit(this.albumService.search(form.value["word"]));
  }

}
