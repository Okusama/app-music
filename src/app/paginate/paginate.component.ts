import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

    @Output() onNext: EventEmitter<Album[]> = new EventEmitter();
    @Output() onPrev: EventEmitter<Album[]> = new EventEmitter();
    @Output() onPage: EventEmitter<Album[]> = new EventEmitter();

    maxPage:number[] = [];

  constructor(private aS: AlbumService) {

  }

  ngOnInit() {
      this.maxPage = this.calcMaxPage();
      console.log(this.maxPage);
  }

    calcMaxPage():number[]{
      let nbItems = this.aS.getAlbums().length;
      let maxPerpage = this.aS.numPerPage;
      let maxPage = Math.ceil(nbItems/maxPerpage);
      let array = [];
      for(let i = 1; i<=maxPage; i++){
          array.push(i);
      }
      return array;
    }

    onClickPrev(){
        let newCurrentPage = this.aS.getCurrentPage() - 1;
        if (newCurrentPage < 0) {
            newCurrentPage = this.maxPage.length;
        }
        this.onPrev.emit(this.aS.calcNbAlbumPaginate(newCurrentPage));
    }

    onClickNext(){
        let newCurrentPage = this.aS.getCurrentPage() + 1;
        if (newCurrentPage > this.maxPage.length) {
            newCurrentPage = 1;
        }
        this.onNext.emit(this.aS.calcNbAlbumPaginate(newCurrentPage));
    }

    onClickPage(numPage){
        this.onPage.emit(this.aS.calcNbAlbumPaginate(numPage));
    }

}
