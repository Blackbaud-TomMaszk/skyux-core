import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

import {
  SkyMediaQueryElementOptions
} from './media-query-element-options';

import {
  SkyMediaQueryElementService
} from './media-query-element.service';

@Directive({
  selector: '[skyMediaQueryElement]'
})
export class SkyMediaQueryElementDirective implements OnInit {

  @Input()
  public set skyMediaQueryElement(value: SkyMediaQueryElementOptions) {
    this._breakpoints = value;
  }

  public get breakpoints(): SkyMediaQueryElementOptions {
    return this._breakpoints || {
      smMin: 768,
      mdMin: 992,
      lgMin: 1200
    };
  }

  private _breakpoints: SkyMediaQueryElementOptions;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private mediaQueryContainerService: SkyMediaQueryElementService
  ) { }

  public ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;

    this.mediaQueryContainerService.onResize(nativeElement, this.breakpoints, (breakpoint) => {
      this.renderer.removeClass(nativeElement, 'sky-media-container-xs');
      this.renderer.removeClass(nativeElement, 'sky-media-container-sm');
      this.renderer.removeClass(nativeElement, 'sky-media-container-md');
      this.renderer.removeClass(nativeElement, 'sky-media-container-lg');

      this.renderer.addClass(
        nativeElement,
        `sky-media-container-${breakpoint}`
      );
    });
  }
}
