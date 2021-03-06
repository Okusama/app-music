import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs/index";
import {Album, List} from "./album";
import { ALBUMS, ALBUM_LISTS } from "./mock-albums";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import * as _ from "lodash";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type" : "application/json",
    })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    sendCurrentNumberPage = new Subject<number>();
    subjectAlbum = new Subject<Album>();
    private albumsUrl = "https://app-music-712e7.firebaseio.com/albums";
    private albumListUrl = "https://app-music-712e7.firebaseio.com/albumsLists";

  constructor(private http: HttpClient) {

  }

  getAlbums(): Observable<Album[]> {
      return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
          map(albums => _.values(albums)),
          map(albums => {
              return albums.sort(
                  (a, b) => { return b.duration - a.duration }
              );
          })
        )
  }

  getAlbum(id:string): Observable<Album> {
      return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
          map(album => album) // JSON
      )
  }

  getAlbumList(id:string):List {
      return ALBUM_LISTS.find(list => list.id === id);
  }

  paginate(start: number, end: number): Observable<Album[]> {
      return this.getAlbums().pipe(map(albums => {
          return albums.sort(
              (a, b) => { return b.duration - a.duration }
          ).slice(start, end);
      }));
  }

  currentPage(page:number){
      return this.sendCurrentNumberPage.next(page);
  }

  search(word:string): Observable<Album[]> {
      return this.getAlbums().pipe(map( albums => {
          const response: Album[] = [];
          _.forEach(albums, (v,k) => {
              if (v.name.includes(word)) {
                  response.push(v);
              }
          });
          return response;
      }));
  }

  switchOn(album: Album) {
      album.status = "on";
      this.http.put<void>(this.albumsUrl+`/${album.id}/.json`, album).subscribe(
          e => e,
          error => console.warn(error),
          () => {
              this.subjectAlbum.next(album);
          }
      )
  }


    switchOff(album: Album){
        album.status = "off";
        console.log(album.id);
        this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(
            e => e,
            error => console.warn(error),
            () => {
                this.subjectAlbum.complete();
            }
        )
    }

    count(): Observable<number> {
        return this.getAlbums().pipe(map(albums => {
            return albums.length;
        }));
    }

}

