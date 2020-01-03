import { Component, OnInit, ViewChild } from "@angular/core";
// import { SearchComponent } from './../components/search/search.component';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService, Config, Documents, News } from "../../shared";
import { MatSort } from '@angular/material';
import { Helper } from '../../shared/helper/helper';
@Component({
  selector: "app-learning-document",
  templateUrl: "./learning-document.component.html",
  styleUrls: ["./learning-document.component.css"]
})
export class LearningDocumentComponent implements OnInit {
  public search: String = "Tìm kiếm";
  public categories: String = "Danh mục";
  urlCfg = new Config;
  imgURL = this.urlCfg.url;
  documents: Documents[]=[];
  news: News[]=[];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  endpoint: any;
  // public config = new Config();
  // public url_upload = this.config.url_upload;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.loadNews();
    this.loadDocuments();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  loadDocuments() {
    const urlCfg = new Config;
    this.route.params.subscribe(params => {
      let DocTypeId = params["id"];
      this.endpoint = `Documents/GetAll`;
      this.api.show(this.endpoint).subscribe(
        res => {
          var k = 0;
          var j = 0;
          console.log(res.Data);
          // this.documents = res.Data;
          for (const i in res.Data) {
            if (res.Data[i]["DocTypeId"] == DocTypeId) {
              this.documents[j] = res.Data[i];
              j++;
            }
          }
          for (const m in this.documents) {
            this.documents[k]["imgURL"] = `${urlCfg.url}${this.documents[m]["DocImage"]}`;
            k++;
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
    const part = this.documents.slice(start, end);
    this.dataSource = part;
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
            this.news[k] = res.Data[i];
            k++;
          }
        }
        this.news.sort(sortArray);
        this.news = this.news.slice(0,5);
      },
      err => {
        console.log(err);
      }
    );
  }
}
