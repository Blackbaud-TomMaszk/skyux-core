import {
  Injectable,
  OnDestroy
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/takeUntil';

import 'rxjs/add/operator/takeWhile';

import {
  SkyMediaQueryElementOptions
} from './media-query-element-options';

@Injectable()
export class SkyMediaQueryElementService implements OnDestroy {

  private isActive = false;

  private ngUnsubscribe = new Subject<void>();

  private observers: {
    breakpoints: SkyMediaQueryElementOptions;
    callback: (breakpoint: string) => void;
    element: any;
    lastWidth?: number;
  }[] = [];

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onResize(
    element: any,
    breakpoints: SkyMediaQueryElementOptions,
    callback: (breakpoint: string) => void
  ): void {

    this.observers.push({
      breakpoints,
      element,
      callback
    });

    if (!this.isActive) {
      this.isActive = true;
      this.addEventListeners();
    }
  }

  private addEventListeners(): void {
    Observable.interval(500)
      .takeUntil(this.ngUnsubscribe)
      .takeWhile(() => this.isActive)
      .subscribe(() => {
        this.checkElementWidths();
      });
  }

  private checkElementWidths(): void {
    const length = this.observers.length;

    if (length === 0) {
      this.isActive = false;
      return;
    }

    for (let i = 0; i < length; i++) {

      const observer = this.observers[i];
      const width = observer.element.offsetWidth;

      // Remove the observer if the element no longer exists on the page.
      if (width === 0 && !document.body.contains(observer.element)) {
        this.observers.splice(i, 1);
        continue;
      }

      if (width === observer.lastWidth) {
        continue;
      }

      observer.lastWidth = width;

      if (width >= observer.breakpoints.lgMin) {
        observer.callback('lg');
        continue;
      }

      if (width >= observer.breakpoints.mdMin) {
        observer.callback('md');
        continue;
      }

      if (width >= observer.breakpoints.smMin) {
        observer.callback('sm');
        continue;
      }

      observer.callback('xs');
    }
  }
}
