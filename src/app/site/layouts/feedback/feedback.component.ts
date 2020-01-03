import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable, Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { Feedback, ApiService, Config } from '../../shared';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Helper } from '../../shared/helper/helper';

declare var $: any;
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  public config = new Config;
  public imgUrl = this.config.url;
  type: any;
  title: any;
  subscription: Subscription;
  feedback: Feedback = { FeedbackId: 0, Code: '', FbTitle: '' , FbContent: '', CreatedDate: '',Status: 0};
  news: any;
  dataNews: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // Autocomplete
  public  types = [
    { id: 1, name: 'Chương trình đào tạo'},
    { id: 2, name: 'Hoạt động giảng dạy' },
    { id: 3, name: 'Cơ sở vật chất' },
    { id: 4, name: 'Dịch vụ đào tạo' }
  ];
  filteredClasses: Observable<string[]>;
  // Datepicker
  minDate = new Date(2019, 0, 1);
  maxDate = new Date(2100, 0, 1);
  // Init Form
  FbTitle = new FormControl('' , [ Validators.required ]);
  FbContent = new FormControl();
  CreatedDate = new FormControl(new Date() , [  Validators.required]);
  // type = new FormControl();
  Status = new FormControl();
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, ) { }
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
      }
  }
  ngOnInit() {
    // SummerNote
    console.log(this.types);
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
    // let month = this.date.value.getMonth()+1;
    // let date =  this.date.value.getFullYear()+'-'+ month +'-'+ this.date.value.getDate();
    // this.feedback.date = date;
    // console.log(this.feedback.date);
    // tslint:disable-next-line: radix
    const CreatedDate = new Date();
    this.feedback.CreatedDate = CreatedDate.toLocaleString();
    const formData = new FormData();
    // formData.append('FbTitle', this.title);
    // formData.append('FbContent', this.feedback.FbContent);
    // formData.append('Code', this.feedback.Code);
    // formData.append('CreatedDate', this.feedback.CreatedDate);
    // formData.append('Status', this.feedback.Status.toString());
    this.feedback.Code = sessionStorage.getItem('user_id');
    this.feedback.FbContent = $('#summernote').summernote('code');
    console.log(this.feedback);

    const endpoint = 'Feedbacks';
    this.subscription = this.api.store(this.feedback, endpoint).subscribe(
      (res: any) => {
        console.log(res);
        // this.router.navigate(['/trang-chu']);
      }
  );
  }
  loadNews(){
    let helper= new Helper;
    let sortArray = helper.compareObjectArray('NewsId', 'desc');
    let endpoint = `News/GetAll`;
    this.api.show(endpoint).subscribe(
      (res: any) => {
        this.news = res.Data;
        this.news.sort(sortArray);
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
getTitle(){
  this.title = this.feedback.FbTitle? this.feedback.FbTitle:'Đóng góp ý kiến' ;
  console.log(this.title);
}
getType(){
  // this.feedback.FbTitle = '';
  this.feedback.FbTitle = "["+ this.type + "] " + this.title;
  // this.FbTitle = this.title;
  // console.log(this.FbTitle);
}
}
