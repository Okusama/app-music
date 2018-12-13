import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs/index";
import {Album, List} from "./album";
import { ALBUMS, ALBUM_LISTS } from "./mock-albums";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import * as _ from "lodash";
import * as firebase from "firebase/app"

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
            map(albums => {
                let response = [];
                console.log(albums);
                _.forEach(albums, (v, k) => {
                    if(v){
                        v.id = k;
                        response.push(v);
                    }
                });
                return response;
            }),
            map(albums => {
                console.log(albums);
                return albums.sort(
                    (a, b) => {
                        return b.duration - a.duration
                    }
                );
            })
        )
    }

    getAlbum(id: string): Observable<Album> {
        return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
            map(album => album) // JSON
        )
    }

    getAlbumList(id: string): List {
        return ALBUM_LISTS.find(list => list.id === id);
    }

    paginate(start: number, end: number): Observable<Album[]> {
        return this.getAlbums().pipe(map(albums => {
            return albums.sort(
                (a, b) => {
                    return b.duration - a.duration
                }
            ).slice(start, end);
        }));
    }

    currentPage(page: number) {
        return this.sendCurrentNumberPage.next(page);
    }

    search(word: string): Observable<Album[]> {
        return this.getAlbums().pipe(map(albums => {
            const response: Album[] = [];
            _.forEach(albums, (v, k) => {
                if (v.name.includes(word)) {
                    response.push(v);
                }
            });
            return response;
        }));
    }

    switchOn(album: Album) {
        album.status = "on";
        this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(
            e => e,
            error => console.warn(error),
            () => {
                this.subjectAlbum.next(album);
            }
        )
    }


    switchOff(album: Album) {
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

    addAlbum(album: Album): Observable<Object>{
        return this.http.post(this.albumsUrl + "/.json", album);
    }

    updateAlbum(album: Album): Observable<Object>{
        return this.http.put(this.albumsUrl + `/${album.id}/.json`, album);
    }

    deleteAlbum(album: Album): Observable<Object>{
        if (album.hasOwnProperty("urlRef")){
            firebase.storage().ref().child(album.urlRef).delete().then()
        }
        return this.http.delete(this.albumsUrl + `/${album.id}/.json`);
    }

    clear() {
        const url = "https://projet-angular-cee02.firebaseio.com/albums";
        const album = {};
        for (let i = 0; i < 10; i++) {
            this.http.put<void>(url + `/${i}/.json`, album).subscribe(
                e => e,
                error => console.warn(error),
                () => {
                    console.log("put");
                }
            )
        }
    }

    uploadAlbumImage(fileToUpload: any): firebase.storage.UploadTask{
        let storagRef = firebase.storage().ref();
        return storagRef.child(fileToUpload.name).put(fileToUpload);
    }

}

