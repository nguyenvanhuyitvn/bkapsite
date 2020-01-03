import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareEqualValidatorDirective } from './directive/confirm-equal-validator.directive';
import { CheckNumberDirective } from './directive/check-number.directive';
import { OwlcarouselDirective } from './directive/owlcarousel.directive';
@NgModule({
  declarations: [CompareEqualValidatorDirective, CheckNumberDirective, OwlcarouselDirective],
  imports: [
    CommonModule
  ],
  exports: [CompareEqualValidatorDirective, CheckNumberDirective]
})
export class SharedModule { }
