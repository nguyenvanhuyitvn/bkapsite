import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { Supports, Class, ApiService } from './../../../shared';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
declare var $: any;
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-bknet',
  templateUrl: './bknet.component.html',
  styleUrls: ['./bknet.component.css']
})
export class BknetComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  supports: Supports = { id: null, user_id: null, title: '', description: null, class_id: null, support_room: 2, date: '', status: 0};
  classes: Class[] = [];
  news: any;
  dataNews: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filteredClasses: Observable<string[]>;
  // Datepicker
  minDate = new Date(2019, 0, 1);
  maxDate = new Date(2100, 0, 1);
  // Init Form
  title = new FormControl('' , [ Validators.required ]);
  description = new FormControl('');
  // tslint:disable-next-line: variable-name
  class_id = new FormControl('' , [  Validators.required]);
  date = new FormControl(new Date() , [  Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, ) { }
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
      }
  }
  ngOnInit() {
    this.subscription = this.api.show('classes').subscribe(
      (res: any) => {
        this.classes = res;
        console.log(res);
      }
  );
    // SummerNote
    $('#summernote').summernote({
      placeholder: 'Nội dung yêu cầu...',
      tabsize: 2,
      height: 100,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: true                  // set focus to editable area after initializing summernote
    });
    this.loadNews();
  }
  // Submit Form
  onFormSubmit() {
    let month = this.date.value.getMonth()+1;
    let date =  this.date.value.getFullYear()+'-'+ month +'-'+ this.date.value.getDate();
    this.supports.date = date;
    // tslint:disable-next-line: radix
    this.supports.user_id = parseInt(sessionStorage.getItem('user_id'));
    this.supports.description = $('#summernote').summernote('code');
    console.log(this.supports);

    const endpoint = 'student/support';
    this.subscription = this.api.store(this.supports, endpoint).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/trang-chu']);
      }
  );
  }
  loadNews(){
    let endpoint = `news`;
    this.api.show(endpoint).subscribe(
      (res: any) => {
        this.news = res;
        this.dataNews = new MatTableDataSource<Element>(this.news);
        this.dataNews.paginator = this.pagNews;
        this.totalSize = this.news.length;
        this.iterator();
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
