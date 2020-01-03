import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User, Class, Students } from './../../../shared';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, RequiredValidator } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { Config } from './../../../shared';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
declare var $: any;


@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  public flag: boolean=false;
  public imagePath;
  public message: string;
  editUserForm: FormGroup;
  genders: any[] = [ {id:0, name:'Nam'}, {id:1, name:'Nữ'}];
  public formImages = new FormData();
  subscription: Subscription;
  subscription1: Subscription;
  students: Students={ Code: '', Name: '', ClassName:'', Email: '', Phone: '', Address: '', Password: '', Image: '',Token:'', Birthday: null, Gender: 0, Status: 0 };
  classes: Class[];
   // Init Form
   Code = new FormControl({value: '', disabled: true} );
   Name = new FormControl('', [ Validators.required ]);
   ClassName = new FormControl('' , [ Validators.required]);
   Email = new FormControl('' , [ Validators.required]);
   Phone = new FormControl('' , [ Validators.required]);
   Address = new FormControl('');
   Password = new FormControl('' , [ Validators.required]);
   Image = new FormControl('' , [ Validators.required]);
   Token = new FormControl('' , [ Validators.required]);
   Birthday = new FormControl({value: '', disabled: true} );
   Gender = new FormControl('' , [ Validators.required]);
   Status = new FormControl('' , [ Validators.required]);
   matcher = new MyErrorStateMatcher();
   imgURL: any ='';
  // Constructor
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private api: ApiService) {}
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
      }
  }
  ngOnInit() {
    this.loadClass();
    this.loadUser();
    $('#upfile1').click(function () {
          $("#file1").trigger('click');
        });
    $(".showonhover").click(function(){
          $("#file1").trigger('click');
        });
  }
  loadUser() {
    let urlCfg= new Config;
    const code = (sessionStorage.getItem('user_id'));
    this.subscription = this.api.getStudentByCode(code).subscribe(
      (res: any) => {
        this.students = res.Data;
        const imgName = res.Data.Image;
        this.imgURL = `${urlCfg.url}/${imgName}`;
        console.log(this.imgURL);
      })
  }
  loadClass(){
    const endpoint = 'Classes/GetAll';
    this.api.show(endpoint).subscribe(
      (res: any) => {
            this.classes = res.Data;
            console.log(this.classes);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  // Submit Form
  onFormSubmit() {
    const imgEndpoint = `Students/Uploads`;
    const endpoint = `Students/Edit`;
    if ( this.flag ) {
      this.subscription = this.api.updateFile(this.formImages, imgEndpoint).subscribe(
        (res: any) => {
          console.log(res);
          if(res.StatusCode == 200){
            this.students.Image = res.Data;
            this.subscription1 = this.api.update(this.students, endpoint).subscribe(
              ( res: any) => {
                  console.log(res);
                  this.router.navigate(['/sinh-vien/thong-tin']);
              }
            );
          }
        });

    }else
    {
        this.subscription1 = this.api.update(this.students, endpoint).subscribe(
          ( res: any) => {
            this.router.navigate(['/sinh-vien/thong-tin']);
          }
        );
    }
  }
  uploadImage(event){
    let elem = event.target;
    if(elem.files.length > 0) {
      this.flag = true;
      this.formImages.append('image', elem.files[0], elem.files[0].name);
      var reader = new FileReader();
      this.imagePath = elem;
      reader.readAsDataURL(elem.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  getTime(){
    console.log(this.students.Birthday);
  }
}
