import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Class, ApiService, Excercise } from 'src/app/site/shared';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

declare var $: any;
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css']
})
export class ExcerciseComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  excercise: Excercise = { id: null, user_id: null,title: '', description: null, class_id: null, date: '', file: ''};
  classes: Class[] = [];
  news: any;
  dataNews: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public formData = new FormData();
  // Init Form
  title = new FormControl('' , [ Validators.required ]);
  description = new FormControl('');
  class_id = new FormControl('' , [  Validators.required]);
  date = new FormControl(new Date() , [  Validators.required]);
  file = new FormControl('' , [  Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, ) { }
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
      }
  }
  ngOnInit() {
    console.log(`jQuery version: ${$.fn.jquery}`);
    // SummerNote

    $('#content').summernote({
      placeholder: 'Nội dung yêu cầu...',
      tabsize: 2,
      height: 100,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: true                  // set 0focus to editable area after initializing summernote
    });
    this.subscription = this.api.show('Classes/GetAll').subscribe(
      (res: any) => {
        this.classes = res.Data;
        console.log(res);
      })

    // Custom upload file input
    $(".showonhover").click(function(){
      $("#file").trigger('click');
    });
    this.loadNews();

  }

  // Submit Form
  onFormSubmit() {
    let month = this.date.value.getMonth()+1;
    let date =  this.date.value.getFullYear()+'-'+ month +'-'+ this.date.value.getDate();
    this.excercise.date = date;
    this.excercise.user_id = parseInt(sessionStorage.getItem('user_id'));
    this.excercise.description = $('#summernote').summernote('code');
    // form data
    this.formData.append('title', this.excercise.title);
    this.formData.append('description', this.excercise.description);
    this.formData.append('date', this.excercise.date.toString());
    this.formData.append('user_id', this.excercise.user_id.toString());
    this.formData.append('class_id', this.excercise.class_id.toString());
    const endpoint = 'student/exercise';
    this.subscription = this.api.store(this.formData, endpoint).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/trang-chu']);
      }
  );
  }
  uploadFile(event){
    let elem = event.target;
    if(elem.files.length > 0) {
      this.formData.append('file', elem.files[0], elem.files[0].name);
    }
  }
  loadNews(){
    let endpoint = `News/GetAll`;
    this.api.show(endpoint).subscribe(
      (res: any) => {
        this.news = res.Data;
        this.dataNews = new MatTableDataSource<Element>(this.news);
        this.dataNews.paginator = this.pagNews;
        this.totalSize = this.news.length;
        this.iterator();
        // console.log(this.url_upload);
      },
      err => {
        console.log(err);
      }
    );
}
private iterator() {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.news.slice(start, end);
  this.dataNews = part;
}
public handlePage(e: any) {
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.iterator();
}
}
