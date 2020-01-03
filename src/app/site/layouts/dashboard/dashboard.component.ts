import { Component, OnInit, AfterViewInit } from '@angular/core';
import { News, ApiService, Course } from 'src/app/site/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '../../shared/config/config';
import { Helper } from '../../shared/helper/helper';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  myCarouselOptions= {
    items: 4,
    dots: false,
    nav: false,
    margin: 10,
    autoplay: true,
    center: true,
    lazyLoad: true,
    startPosition: 0,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        dots: false
      },
      480: {
        items: 2,
        nav: true,
        dots: false
      },
      768: {
        items: 3,
        nav: true,
        dots: false
      },
      992: {
        items: 5,
        nav: true,
        dots: false
      },
      1199: {
        items: 5,
        nav: true,
        dots: false
      }
    }
  };
  teacherOptions= {
    items: 4,
    dots: false,
    nav: false,
    margin: 10,
    autoplay: true,
    center: true,
    lazyLoad: true,
    startPosition: 0,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        dots: false
      },
      480: {
        items: 2,
        nav: true,
        dots: false
      },
      768: {
        items: 3,
        nav: true,
        dots: false
      },
      992: {
        items: 4,
        nav: true,
        dots: false
      },
      1199: {
        items: 4,
        nav: true,
        dots: false
      }
    }
  };
  Options= {
    items: 1,
    dots: false,
    nav: false,
    margin: 10,
    autoplay: true,
    center: true,
    lazyLoad: true,
    startPosition: 1,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        dots: false
      },
      480: {
        items: 2,
        nav: true,
        dots: false
      },
      768: {
        items: 2,
        nav: true,
        dots: false
      },
      992: {
        items: 2,
        nav: true,
        dots: false
      },
      1199: {
        items: 2,
        nav: true,
        dots: false
      }
    }
  };
  mainSliderOption = {
    items: 1,
    dots: false,
    nav: false,
    autoplay: true,
    center: true,
    lazyLoad: true,
    startPosition: 0,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    responsiveClass: true,
    onInitialized(){}
  };
  courses: Course[] = [];
  techNews: News[] = [];
  studentNews: News[] = [];
  urlCfg = new Config;
  url =  this.urlCfg.url;
  helper = new Helper;
  sortArray = this.helper.compareObjectArray('NewsId', 'desc');
  endpoint: any;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit() {
      this.loadTechNews();
      this.loadStudentNews();
      this.loadCourse();

    //   $('.slides').nivoSlider({
    //     effect: 'random',                 // Specify sets like: 'fold,fade,sliceDown'
    //     slices: 15,                       // For slice animations
    //     boxCols: 8,                       // For box animations
    //     boxRows: 4,                       // For box animations
    //     animSpeed: 500,                   // Slide transition speed
    //     pauseTime: 3000,                  // How long each slide will show
    //     startSlide: 0,                    // Set starting Slide (0 index)
    //     directionNav: true,               // Next & Prev navigation
    //     controlNav: true,                 // 1,2,3... navigation
    //     controlNavThumbs: false,          // Use thumbnails for Control Nav
    //     pauseOnHover: true,               // Stop animation while hovering
    //     manualAdvance: false,             // Force manual transitions
    //     prevText: 'Prev',                 // Prev directionNav text
    //     nextText: 'Next',                 // Next directionNav text
    //     randomStart: false,               // Start on a random slide
    //     beforeChange() {},       // Triggers before a slide transition
    //     afterChange() {},        // Triggers after a slide transition
    //     slideshowEnd() {},       // Triggers after all slides have been shown
    //     lastSlide() {},          // Triggers when last slide is shown
    //     afterLoad() {}           // Triggers when slider has loaded
    // });


  }

  onLoggedout() {
    localStorage.removeItem('isLogged');
  }

  loadCourse() {
    this.endpoint = `Course/GetAll`;
    this.api.show(this.endpoint).subscribe(
      res => {
        this.courses = res.Data;
        console.log(this.courses);
        this.courses = this.courses.slice(0,3);
      },
        err => {
          console.log(err);
        }
        );
  }
  loadTechNews() {
      const results = new Array();
      this.endpoint = `News/GetAll`;
      this.api.show(this.endpoint).subscribe(
        res => {
          let k = 0;
          for (const i in res.Data) {
            if (res.Data[i].CategoryId == 1) {
              results[k] = res.Data[i];
              k++;
              results.sort(this.sortArray);
              this.techNews = results.slice(0, 3);
            }
          }
        },
        err => {
          console.log(err);
        }
        );
  }
  loadStudentNews() {
      const results = new Array();
      this.endpoint = `News/GetAll`;
      this.api.show(this.endpoint).subscribe(
        res => {
          let k = 0;
          for (const i in res.Data) {
            if (res.Data[i].CategoryId == 14) {
              results[k] = res.Data[i];
              k++;
              results.sort(this.sortArray);
              this.studentNews = results.slice(0, 3);
            }
          }
        },
        err => {
          console.log(err);
        }
        );
  }

}
