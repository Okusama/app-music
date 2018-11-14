import { Injectable } from '@angular/core';
import {Album, List} from "./album";
import { ALBUMS, ALBUM_LISTS } from "./mock-albums";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

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
