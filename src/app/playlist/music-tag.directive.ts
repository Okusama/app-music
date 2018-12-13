import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {MusicListService} from './music-list.service';

@Directive({
  selector: '[appMusicTag]'
})
export class MusicTagDirective {
  @Input("appMusicTag") tagColor: string;

  constructor(private el: ElementRef, private mls: MusicListService) {
    el.nativeElement.style.backgroundColor = this.tagColor;
    console.log(this.mls.setColor())
  }

    @HostListener("mouseenter") onMouseEnter(){
        this.musictag(this.tagColor);
    }

    @HostListener("mouseleave") onMouseLeave(){
        this.musictag(null);
    }

    private musictag(color: string){
      this.el.nativeElement.style.backgroundColor = color;
    }

}
