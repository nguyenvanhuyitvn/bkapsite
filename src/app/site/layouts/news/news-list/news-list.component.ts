import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SearchComponent } from './../../components/search/search.component';
import { News, ApiService, Config } from './../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  public search: String = "Tìm kiếm";
  public categories: String = "Danh mục";
  news: any;
  newsCatalog: any;
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  endpoint: any;
  template: any;
  subscription: Subscription;
  // create images url
  urlCfg= new Config;
  imgURL: any = this.urlCfg.url;
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loadNews();
    // this.loadCatalogs();
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  loadNews(){
    let result = new Array();
    this.route.params.subscribe(params => {
      this.endpoint = `News/GetAll`;
      const CategoryId = params['id'];
      this.newsCatalog = params['id'];
      console.log(CategoryId);
      this.subscription = this.api.show(this.endpoint).subscribe(
        res => {
          let k = 0;
          result =[];
          console.log(res.Data);
          for(const i in res.Data){
            if(res.Data[i].CategoryId == CategoryId) {
              result[k] = res.Data[i];
              k++;
              this.news = result;
              this.dataSource = new MatTableDataSource<Element>(this.news);
              this.dataSource.paginator = this.paginator;
              this.totalSize = this.news.length;
              this.iterator();
            }
          }

        },
        err => {
          console.log(err);
        }
        );
    });
  }


  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.news.slice(start, end);
    this.dataSource = part;
  }

}
