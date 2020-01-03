import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Documents, ApiService, Config } from "src/app/site/shared";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  title: string = "TITLE";
  docs: Documents = {
    DocId: null,
    DocName: "",
    DocDescription: "",
    DocLink: "",
    DocTypeId: 0,
    DocTypeName: "",
    DocImage: "",
    DocStatus: 0
  };
  documents: Documents[] = [];
  endpoint: any;
  urlCfg = new Config();
  imgURL: any = "assets/img/no-image.png";
  // sidebar
  dataSource: MatTableDataSource<Documents>;
  dataNews: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) pagNews: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // end sidebar
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit() {
    this.loadDetailDoc();
    this.loadDocuments();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  loadDetailDoc() {
    this.route.params.subscribe(params => {
      this.endpoint = `Documents/Get`;
      const id = params["id"];
      this.api.getDetail(this.docs, this.endpoint, id).subscribe(
        res => {
          this.docs = res.Data;
          this.imgURL = `${this.urlCfg.url}${res.Data.DocImage}`;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  loadDocuments() {
    const urlCfg = new Config;
    this.api.show("Documents/GetAll").subscribe(
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
            this.dataSource = new MatTableDataSource(this.documents);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.documents);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.documents.slice(start, end);
    this.dataNews = part;
  }
}
