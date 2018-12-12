import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AlbumService} from '../../album.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

    @ViewChild("fileInput") fileInput;
    albumForm: FormGroup;

  constructor(private fb: FormBuilder, private aS: AlbumService, private router: Router) {
      this.albumForm = fb.group({
          name: new FormControl('', [
              Validators.required,
              Validators.minLength(5)
          ]),
          duration: new FormControl('', [
              Validators.required,
              Validators.minLength(1)
          ]),
          ref: new FormControl('', [
              Validators.required,
              Validators.minLength(3)
          ]),
          title: new FormControl('', [
              Validators.required,
              Validators.minLength(3)
          ]),
          desc: new FormControl('', [
              Validators.required,
              Validators.minLength(5)
          ])
      });
  }

  ngOnInit() {

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
      let file = this.fileInput.nativeElement;
      if (file.files && file.files[0]){
          let fileToUpload = file.files[0];
          console.log(fileToUpload);
            this.aS.uploadAlbumImage(fileToUpload).then( snapshot => {
                console.log(snapshot);
                return snapshot.ref.getDownloadURL();
            }).then( url => {

                let album = {
                    name: this.albumForm.value["name"],
                    duration: this.albumForm.value["duration"],
                    ref: this.albumForm.value["ref"],
                    title: this.albumForm.value["title"],
                    description: this.albumForm.value["desc"],
                    status: "off",
                    id: "",
                    url: url,
                    urlRef: fileToUpload.name
                };

                this.aS.addAlbum(album).subscribe( album => {
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

            });
      }



  }

}
