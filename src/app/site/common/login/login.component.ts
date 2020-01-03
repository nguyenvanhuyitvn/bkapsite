import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/services';
import { User } from './../../shared/models';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  userForm: FormGroup;
  constructor(private formBuiler: FormBuilder, private route: ActivatedRoute, public userService: UserService, public router: Router) { }

  ngOnInit() {
    this. createForm();
    this.checkLogin();
  }
  onFormSubmit(){
    this.userService.login(this.userForm.value ).subscribe(
      (res: any) => {
        console.log(res);
        if(res.StatusCode == 200) {
          alert("Đăng nhập thành công");
          sessionStorage.setItem('user_id', res.Data['Code']);
          sessionStorage.setItem('username', res.Data['Name']);
          // console.log(sessionStorage.getItem('user_id'));
          localStorage.setItem('isLogged', JSON.stringify(res));
          this.checkLogin();
          // this.router.navigate(['/trang-chu']);
        }else{
          alert("Đăng nhập không thành công!")
        }

      },
      (err: any) => {
        console.log(err);
      }
    )
  }
  createForm(){
    this.userForm = this.formBuiler.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  checkLogin(){
    if(localStorage.getItem('isLogged')){
       console.log('ok');
        this.router.navigate(['/trang-chu']);
    }
  }


}
