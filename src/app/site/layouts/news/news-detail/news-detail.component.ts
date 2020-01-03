import { Component, OnInit } from '@angular/core';
import { News, NewsCatalog, ApiService, Config } from './../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../../../shared/helper/helper';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news: News = { Title: '', CategoryId: null, Content: '', Description:'', Created:'',Images:'', Status:0};
  newsAll: News[]=[];
  categories: any;
  endpoint: any;
  cate_endpoint: any;
  // create images url
  urlCfg= new Config;
  imgURL: any = this.urlCfg.url;
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.loadNewsById();
    this.loadCategories();
    this.loadNews();
  }
  loadNewsById(){
    this.route.params.subscribe(params => {
      this.endpoint = `News/Get/${params['NewsId']}`;
      this.api.getNewsDetail(this.news, this.endpoint).subscribe(
        res => {
          this.news = res.Data;
          let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          this.news['date'] = new Date(this.news.Created);
          this.news['month'] = months[this.news['date'].getMonth()];
          console.log(months[this.news['date'].getMonth()]);
        },
        err => { console.log(err); });
    })
  }
  loadCategories(){
    this.route.params.subscribe(params => {
      this.cate_endpoint = `Categories/GetAll`;
      this.api.show(this.cate_endpoint).subscribe(
        res => {this.categories = res.Data; console.log("Category:",res) },
        err => { console.log(err); });
    })
  }
  loadNews(){
    // sắp xếp mảng Object

    let helper= new Helper;
    let sortArray = helper.compareObjectArray('NewsId', 'desc');
    this.endpoint = `News/GetAll`;
    this.api.show(this.endpoint).subscribe(
      (res: any) => {
        var k=0;
        for(const i in res.Data){
          if(res.Data[i]['CategoryId'] == 14){
            this.newsAll[k] = res.Data[i];
            k++;
          }
        }
        this.newsAll.sort(sortArray);
        this.newsAll = this.newsAll.slice(0,5);
        console.log(this.newsAll);
      },
      err => {
        console.log(err);
      }
    );
  }
}
