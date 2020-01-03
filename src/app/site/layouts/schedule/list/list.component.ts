import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { ApiService, Documents, News } from 'src/app/site/shared';
import { Config } from 'src/app/site/shared/config/config';
import { Helper } from 'src/app/site/shared/helper/helper';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  news: News[]=[];
  imgURLDefault: any ='assets/img/no-image.png';
  urlCfg = new Config;
  imgURL = this.urlCfg.url;
  documents: Documents[]=[];
  code = (sessionStorage.getItem('user_id'));
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  displayedColumns: string[] = ['DocName', 'DocLink', 'DocTypeName','DocImage', 'view'];
  dataSource: MatTableDataSource<Documents>;
  dataNotice: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  endpoint = `Documents/GetAll`;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.loadDocuments();
    this.loadNews();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  loadDocuments() {
    const urlCfg = new Config;
    this.api.show(this.endpoint).subscribe(
      (res: any) => {
            var k=0;
            var j=0;
            console.log(res.Data);
            // this.documents = res.Data;
            for(const i in res.Data) {
              if(res.Data[i]['DocTypeId']==1){
                this.documents[j] = res.Data[i];
                j++;
              }
            }
            for( const m in this.documents ) {
              // const imgName = this.documents[m]['DocImage'];
              this.documents[k]['imgURL'] = `${urlCfg.url}${this.documents[m]['DocImage']}`;
              k++;
            }
            console.log(this.documents);
      },
      (err: any) => {
        console.log(err);
      }
    );
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
