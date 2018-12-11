import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AlbumService} from '../../album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  constructor(private fb: FormBuilder, private aS: AlbumService) { }

  albumForm: FormGroup = new FormGroup({
      name: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
      ]),
  });

  ngOnInit() {

  }

  get name(){
    return this.albumForm.get("name");
  }

  onSubmit(){
    console.log(this.albumForm.value["name"]);
  }


}
