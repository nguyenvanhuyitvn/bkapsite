import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../shared/models';
import { UserService } from './../../shared/services';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  users: User[] = [];
  userForm: FormGroup;
  constructor(private formBuiler: FormBuilder, private route: ActivatedRoute, public userService: UserService, public router: Router) { }

  ngOnInit() {
    this. createForm();
  }
  onFormSubmit(){
    this.userService.login(this.userForm.value ).subscribe(
      (res: any) => {
        console.log(res);
        if(res.StatusCode == 200) {
          alert("Vui lòng kiểm tra email!");
        }else{
          alert("Xin vui lòng kiểm tra lại email")
        }

      },
      (err: any) => {
        console.log(err);
      }
    )
  }
  createForm(){
    this.userForm = this.formBuiler.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
}
