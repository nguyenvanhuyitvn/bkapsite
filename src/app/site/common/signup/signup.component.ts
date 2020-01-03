import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService, ApiService } from './../../shared/services';
import { Subscription } from 'rxjs';
import { Class, Students } from '../../shared/models';
import { ErrorStateMatcher } from '@angular/material/core';

declare var $: any;
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  submitted = false;
  // tslint:disable-next-line: max-line-length
  students: Students= { Code: '', Name: '', ClassName:'', Email: '', Phone: '', Address: '', Password: '', Image: '',Token:'', Birthday: '', Gender: 0, Status: 0 };
  classes: Class[];
  // Init Form
  Code = new FormControl({value: '', disabled: true} );
  Name = new FormControl('', [ Validators.required ]);
  ClassName = new FormControl('' , [ Validators.required]);
  Email = new FormControl('' , [ Validators.required ], this.isCodeUnique.bind(this));
  Phone = new FormControl('' , [ Validators.required ], this.isCodeUnique.bind(this));
  Address = new FormControl('');
  Password = new FormControl('' , [ Validators.required]);
  Image = new FormControl('' , [ Validators.required]);
  Token = new FormControl('' , [ Validators.required]);
  Birthday = new FormControl({value: '', disabled: true} );
  Gender = new FormControl('' , [ Validators.required]);
  Status = new FormControl('' , [ Validators.required]);
  matcher = new MyErrorStateMatcher();
  color = 'accent';
  imgURL: any ='assets/img/no-image.png';
  public imagePath;
  public formImages = new FormData();
  genders: any[] = [ {id:0, name:'Nam'}, {id:1, name:'Nữ'}];
  is_added: number;
  message: string;
  subscription: Subscription;
  subscription1: Subscription;
    constructor(private api: ApiService, private router: Router) { }
    ngOnInit() {
      this.loadClass();
      $('#avatar').click( function() {
        $('#image').trigger('click');
      });
    }
    get f(){ return this.signUpForm.controls;}
    onFormSubmit() {
        // form data
        const endpoint = `Students`;
        const imgEndpoint = `Students/Uploads`;
        if(this.students.Status == 1)
          {
            this.students.Status = 1;
            console.log(this.students.Status)
          }else{
            this.students.Status = 0;
            console.log(this.students.Status)
          }
        this.subscription = this.api.updateFile(this.formImages, imgEndpoint).subscribe(
            (res: any) => {
              if(res.StatusCode == 200){
                this.students.Image = res.Data;
                this.subscription1 = this.api.store(this.students, endpoint).subscribe(
                  (res: any) => {
                    this.router.navigate(['/xac-thuc']);
                  }
                );
              }
            }
        );
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
    uploadImage(event){
      let elem = event.target;
      if(elem.files.length > 0) {
        this.formImages.append('image', elem.files[0], elem.files[0].name);
        var reader = new FileReader();
        this.imagePath = elem;
        reader.readAsDataURL(elem.files[0]);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        }
      }
    }
    isCodeUnique(control: FormControl) {
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api.getStudentByCode(control.value).subscribe(
            (res: any) => {
                console.log(res);
                if(res.StatusCode == 200){
                  resolve({ 'isCodeUnique': true, 'res': console.log(res) });
                } else{
                  resolve(null)
                }
            },
            (err) => { resolve(null); });
        }, 1000);
      });
      return q;
    }
    ngOnDestroy(){
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
      if(this.subscription1) {
        this.subscription1.unsubscribe();
      }
    }
}
