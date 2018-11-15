import { Injectable } from '@angular/core';
import {Album, List} from "./album";
import { ALBUMS, ALBUM_LISTS } from "./mock-albums";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    numPerPage:number = 4;
    currentPage:number = 1;
    begin:number = 0;
    end:number = 0;

  constructor() { }

  getAlbums():Album[]{
    return ALBUMS.sort((a, b) => b.duration - a.duration);
  }

  getAlbum(id:string):Album{
    return ALBUMS.find(album => album.id === id);
  }

  getAlbumList(id:string):List{
      return ALBUM_LISTS.find(list => list.id === id);
  }

  paginate(start:number, end:number):Album[]{
      return ALBUMS.sort(
          (a, b) => { return b.duration - a.duration }
      ).slice(start, end);
  }

  getCurrentPage():number{
      return this.currentPage;
  }

  calcNbAlbumPaginate(currentPage:number):Album[]{
      this.currentPage = currentPage;
      this.begin = (currentPage - 1) * this.numPerPage;
      this.end = this.begin + this.numPerPage;
      return this.paginate(this.begin, this.end);
  }

  search(word:string):Album[]{
      let response = [];
      ALBUMS.forEach(item => {
         if (item.name.includes(word)){
             response.push(item);
         }
      });
      return response;
  }

}

/*function triAbulle(tab, comp, foo) {
    foo();
    for (let i = tab.length; i > 0; i--) {
        for (let j = 0; j < (i - 1); j++) {
            // on appelle la fonction dans la condition
            if ( comp(tab[j], tab[j+1]) ) {
                // permuter les valeurs
                let tmp = tab[j + 1];
                tab[j + 1] = tab[j];
                tab[j] = tmp;
            }
        }
    }

    return tab;
}

console.log(triAbulle([6, 8, 1, 2], (a,b) => a > b, () => console.log('ici')))*/

