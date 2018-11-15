import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";

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
}
