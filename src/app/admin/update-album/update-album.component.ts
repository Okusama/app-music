import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from '../../album.service';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {

    albumForm: FormGroup;
    id: string;

    constructor(private fb: FormBuilder, private aS: AlbumService, private router: Router, private route:ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get("id");
        this.initForm();
        this.aS.getAlbum(this.id).subscribe( album => {
            this.albumForm = this.fb.group({
                name: new FormControl(album.name, [
                    Validators.required,
                    Validators.minLength(5)
                ]),
                duration: new FormControl(album.duration, [
                    Validators.required,
                    Validators.minLength(1)
                ]),
                ref: new FormControl(album.ref, [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                title: new FormControl(album.title, [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                desc: new FormControl(album.description, [
                    Validators.required,
                    Validators.minLength(5)
                ])
            });
        });
    }

    ngOnInit() {

    }

    initForm(){
          this.albumForm = this.fb.group({
              name: new FormControl("", [
                  Validators.required,
                  Validators.minLength(5)
              ]),
              duration: new FormControl("", [
                  Validators.required,
                  Validators.minLength(1)
              ]),
              ref: new FormControl("", [
                  Validators.required,
                  Validators.minLength(3)
              ]),
              title: new FormControl("", [
                  Validators.required,
                  Validators.minLength(3)
              ]),
              desc: new FormControl("", [
                  Validators.required,
                  Validators.minLength(5)
              ])
          });
    }

    get name(){
        return this.albumForm.get("name");
    }

    get duration(){
        return this.albumForm.get("duration");
    }

    get ref(){
        return this.albumForm.get("ref");
    }

    get title(){
        return this.albumForm.get("title");
    }

    get desc(){
        return this.albumForm.get("desc");
    }

    onSubmit(){
      console.log(this.albumForm.value["name"]);
        let album = {
            name: this.albumForm.value["name"],
            duration: this.albumForm.value["duration"],
            ref: this.albumForm.value["ref"],
            title: this.albumForm.value["title"],
            description: this.albumForm.value["desc"],
            status: "off",
            id: this.id
        };

        this.aS.updateAlbum(album).subscribe( album => {
            console.log(album);
        }, error => {
            console.error(error);
        }, () => {
            this.router.navigate(["/admin"], {
                queryParams: {
                    message: "success"
                }
            });
        });
    }

}
