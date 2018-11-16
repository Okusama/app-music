import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from "../album";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

    @Output() onChangePageEvent: EventEmitter<{start:number, end:number}> = new EventEmitter();

    maxPage:number[] = [];
    numPerPage:number = 4;
    currentPage:number = 1;
    begin:number = 0;
    end:number = 0;

  constructor(private aS: AlbumService) {

  }

  ngOnInit() {
      this.maxPage = this.calcMaxPage();
      this.aS.sendCurrentNumberPage.subscribe( page => {
          this.currentPage = page;
      });
  }

    calcMaxPage():number[]{
      let nbItems = this.aS.getAlbums().length;
      let maxPerpage = this.numPerPage;
      let maxPage = Math.ceil(nbItems/maxPerpage);
      let array = [];
      for(let i = 1; i <= maxPage; i++){
          array.push(i);
      }
      return array;
    }

    calcNbAlbumPaginate(currentPage:number):{start:number, end:number}{
      this.aS.currentPage(currentPage);
        this.currentPage = currentPage;
        this.begin = (currentPage - 1) * this.numPerPage;
        this.end = this.begin + this.numPerPage;
        return {start :this.begin, end: this.end};
    }

    onClickPrev(){
        let newCurrentPage = this.currentPage - 1;
        if (newCurrentPage < 0) {
            newCurrentPage = this.maxPage.length;
        }
        this.onChangePage(this.calcNbAlbumPaginate(newCurrentPage));
    }

    onClickNext(){
        let newCurrentPage = this.currentPage + 1;
        if (newCurrentPage > this.maxPage.length) {
            newCurrentPage = 1;
        }
        this.onChangePage(this.calcNbAlbumPaginate(newCurrentPage));
    }

    onClickPage(page){
        this.onChangePage(this.calcNbAlbumPaginate(page));
    }

    onChangePage(pagination){
        this.onChangePageEvent.emit(pagination);
    }

}
