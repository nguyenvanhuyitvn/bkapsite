import { Directive } from "@angular/core";
declare var $: any;
@Directive({
  selector: "[appOwlcarousel]"
})
export class OwlcarouselDirective {
  constructor() {
    $(".rc-carousel").carousel.owlCarousel({
      loop: true,
      items: 4,
      lazyLoad: true,
      margin: 10,
      autoplay:false,
      dots: true,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left' aria-hidden='true'></i>",
        "<i class='fa fa-angle-right' aria-hidden='true'></i>"
      ]

    });
  }
}
