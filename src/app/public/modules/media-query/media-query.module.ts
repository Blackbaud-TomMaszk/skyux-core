import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyMediaQueryElementService
} from './media-query-element.service';

import {
  SkyMediaQueryElementDirective
} from './media-query-element.directive';

import {
  SkyMediaQueryService
} from './media-query.service';

@NgModule({
  declarations: [
    SkyMediaQueryElementDirective
  ],
  providers: [
    SkyMediaQueryElementService,
    SkyMediaQueryService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyMediaQueryElementDirective
  ]
})
export class SkyMediaQueryModule { }
