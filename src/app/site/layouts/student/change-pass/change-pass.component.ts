import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import { ApiService, User } from './../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { Students } from 'src/app/site/shared';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  code = (sessionStorage.getItem('user_id'));
  repassForm: FormGroup;
  students: Students={ Code: '', Name: '', ClassName:'', Email: '', Phone: '', Address: '', Password: '', Image: '',Token:'', Birthday: null, Gender: 0, Status: 0 };

  Email: '';
  OldPassword: '';
  NewPassword: '';
  ConfirmPassword='';
  public subscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private api: ApiService) { }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
      this.loadUser();
      this.createForm();
    }
  loadUser() {
      this.subscription = this.api.getStudentByCode(this.code).subscribe(
        (res: any) => {
          this.students = res.Data;
        })
    }
  onFormSubmit(){
      const endpoint =`Students/ChangePassword`;
      // console.log(`id=${this.id}`);
      if(this.repassForm.invalid){
        return;
      }
      this.subscription = this.api.changePassword(this.repassForm.value, endpoint).subscribe(
        (res: any) => {
          console.log(res);
          if(res.StatusCode == 400){
              // console.log(res.error);
              alert(res.Message);
            }
          else
            {
              // console.log(res.message);
              alert(`Đã cập nhật mật khẩu thành công!`);
              this.router.navigate(['/sinh-vien/thong-tin']);
            }
        }
      )
    }
  createForm(){
      this.repassForm = this.fb.group({
        Email: ['', Validators.required],
        OldPassword: ['', [Validators.required]],
        NewPassword: ['', [Validators.required]],
        ConfirmPassword: ['', Validators.required]
      })
    }


}
