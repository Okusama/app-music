import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

export enum Color {
  Violet = "violet",
  Orange = "orange"
}

export interface Music { id: number; name: string; color: Color}

@Injectable()
export class MusicListService {

  private _musics: Music[] = [
      { id: 11, name: "Future Legend", color: Color.Violet },
      { id: 12, name: "Diamond Dogs", color: Color.Violet },
      { id: 13, name: "Sweet Thing", color: Color.Violet },
      { id: 14, name: "Candidate", color: Color.Violet },
      { id: 15, name: "Rock'n'Roll with Me", color: Color.Violet },
      { id: 16, name: "1984", color: Color.Violet },
      { id: 17, name: "Big Brother", color: Color.Violet },
  ];

  constructor() { }

  musics(): Observable<Music[]> {
    let musics = of(
        this._musics
    );
    return musics.pipe( music => music);
  }

  setColor(id: number): (Color.Violet | Color.Orange)[]{
    return this._musics.map( music => {
      if (music.id === id){
        return music.color = music.color === Color.Violet ? Color.Orange : Color.Violet;
      }
    });
  }

}
