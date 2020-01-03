import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService, Supports } from './../../shared';
@Component({
  selector: 'app-supports',
  templateUrl: './supports.component.html',
  styleUrls: ['./supports.component.css']
})
export class SupportsComponent implements OnInit {

  supports: Supports[] = [];
  news: any;
  dataNews: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  user_id = parseInt(sessionStorage.getItem('user_id'));
  constructor(private api: ApiService) {}

  displayedColumns: string[] = ['title', 'class_id', 'description', 'support_room', 'date', 'status'];
  dataSource: MatTableDataSource<Supports>
  endpoint = `student/support/${this.user_id}`;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public  supportRoom = [
    { id: 1, name: 'Trung tâm phần mềm'},
    { id: 2, name: 'Trung tâm BKNET' }
  ];

  ngOnInit() {
    this.loadSupport();
    this.loadNews();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadSupport() {
    this.api.show(this.endpoint).subscribe(
      (res: any) => {
            this.supports = res;
              // tslint:disable-next-line: forin
            for (const i in this.supportRoom) {
                for (const j in this.supports) {
                  if (this.supports[j].support_room == this.supportRoom[i].id) {
                      this.supports[j]['room'] = this.supportRoom[i].name;
                  }
                }
             }
            this.dataSource = new MatTableDataSource(this.supports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.supports);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  loadNews(){
      let resault = new Array();
      this.endpoint = `news`;
      this.api.show(this.endpoint).subscribe(
        (res: any) => {
          let k = 0;
          for(const i in res){
            if(res[i].cate_id == 1) {
              resault[k] = res[i];
              k++;
              this.news = resault;
              this.dataNews = new MatTableDataSource<Element>(this.news);
              this.dataNews.paginator = this.pagNews;
              this.totalSize = this.news.length;
              this.iterator();
            }
          }
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

}
