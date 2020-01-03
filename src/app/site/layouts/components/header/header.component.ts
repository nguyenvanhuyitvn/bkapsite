import { Component, OnInit } from '@angular/core';
import { NewsCatalog, ApiService } from './../../../shared';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username: String;
  public newsCatalog: NewsCatalog[] ;
  public endpoint: string="Categories";
  public register: Boolean = !localStorage.getItem('isLogged') ;
  constructor(private api: ApiService) {
    console.log(localStorage.getItem('isLogged'));
  }
  ngOnInit() {
    window.addEventListener('onclose', function(e){
      sessionStorage.removeItem('user_id');
    });
    if(sessionStorage.getItem('username')){
        this.username = sessionStorage.getItem('username');
    }
    this.loadCatalogs();
  }
  loadCatalogs() {
    const url= `${this.endpoint}/GetAll`;
    this.api.show(url).subscribe(
      (res: any) => {
            this.newsCatalog = res.Data;
            console.log(this.newsCatalog);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  onLoggedout() {
    localStorage.removeItem('isLogged');
  }
}
