import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../shared';
import { User } from './../../../shared/models';
import { Config } from './../../../shared';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Students } from 'src/app/site/shared';
@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css']
})
export class StdInfoComponent implements OnInit {
  code = sessionStorage.getItem('user_id');
  students: Students={ Code: '', Name: '', ClassName:'', Email: '', Phone: '', Address: '', Password: '', Image: '',Token:'', Birthday: null, Gender: 0, Status: 0 };

  constructor(private api: ApiService) {}
  urlCfg = new Config;
  imgURL: any='assets/img/no-image.png';
  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    let urlCfg= new Config;
    this.api.getStudentByCode(this.code).subscribe(
      (res: any) => {
            this.students = res.Data;
            console.log(this.students);
            const imgName = this.students.Image;
            this.imgURL = `${urlCfg.url}${imgName}`;
            console.log(this.imgURL);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
