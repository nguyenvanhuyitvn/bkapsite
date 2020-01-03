import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, learningDocument, learningCategory,Config, News } from '../../../shared';
import { Helper } from 'src/app/site/shared/helper/helper';
@Component({
  selector: 'app-docs-details',
  templateUrl: './docs-details.component.html',
  styleUrls: ['./docs-details.component.css']
})
export class DocsDetailsComponent implements OnInit {
  urlCfg = new Config;
  imgURL = this.urlCfg.url;
  public search: String = "Tìm kiếm";
  public categories: String = "Danh mục";
  title: string="TITLE";
  // tslint:disable-next-line: max-line-length
  docs: learningDocument = { id:null, documentsName: '', documentsCate: null, documentsDescription: '', file:'', image:'', slug:'', status: null};
  endpoint: any;
  news: News[]=[];
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.loadDocuments();
    this.loadNews();
  }
  loadDocuments(){
    this.route.params.subscribe(params => {
      this.endpoint = `Documents/Get`;
      this.api.getDetail(this.docs, this.endpoint ,params['id']).subscribe(
        res => { this.docs = res.Data; console.log(res) },
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
