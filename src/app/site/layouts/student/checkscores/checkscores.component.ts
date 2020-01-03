import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, learningDocument, learningCategory,Config, News } from '../../../shared';
import { Helper } from 'src/app/site/shared/helper/helper';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-checkscores',
  templateUrl: './checkscores.component.html',
  styleUrls: ['./checkscores.component.css']
})
export class CheckscoresComponent implements OnInit, OnDestroy {
  urlCfg = new Config;
  imgURL = this.urlCfg.url;
  scoresUrl = this.urlCfg.scores;
  endpoint: any;
  news: News[]=[];
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.loadNews();
  }
  loadNews(){
    // sắp xếp mảng Object
    let helper= new Helper;
    let sortArray = helper.compareObjectArray('NewsId', 'desc');
    this.endpoint = `News/GetAll`;
    this.subscription = this.api.show(this.endpoint).subscribe(
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
  ngOnDestroy(){

  }
}
