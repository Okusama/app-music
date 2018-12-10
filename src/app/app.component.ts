import { Component } from '@angular/core';
import { interval, Observable } from "rxjs/index";
import { trigger, state, style, animate, transition } from "@angular/animations";
import {take} from "rxjs/internal/operators";
import {AuthService} from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    animations: [
        trigger("buttonAnimate",[
            state("open", style({
                height: "40px",
                opacity: 1,
                backgroundColor: "blue",
                color: "white",
                border: "1px solid white",
                borderRadius: "15px"
            })),
            state("close", style({
                height: "40px",
                opacity: 0.25,
                backgroundColor: "white",
                color: "blue",
                border: "1px solid blue",
                borderRadius: "15px"
            })),
            transition("open => close", [
                animate("2s")
            ]),
            transition("close => open", [
                animate("1s")
            ])
        ])
    ]
})
export class AppComponent {
  title = 'app-music';
  count = interval(1000);
  sec:number = 0;
  min:number = 0;
  hour:number = 0;
  isLogin:boolean = false;

  constructor(private aS: AuthService) {}

  ngOnInit() {
      this.count.pipe(
          take( 12*3600)
      ).subscribe(x => {
          this.hour = Math.floor(x / 3600);
          this.min = Math.floor((x - (this.hour * 3600))/60);
          this.sec = x - (this.hour * 3600) - (this.min * 60);
      });

      this.aS.authState.subscribe( isLogin => {
          console.log(isLogin);
          this.isLogin = isLogin;
      });


  }

  handleLogoutClick() {
      this.aS.logOut();
  }

}
