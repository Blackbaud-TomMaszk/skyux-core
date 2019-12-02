import {
  Component,
  ElementRef
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

@Component({
  selector: 'sky-overlay-child-demo',
  templateUrl: './overlay-demo-example.component.html'
})
export class OverlayDemoExampleComponent {

  public closeClicked = new Subject<void>();

  constructor(
    public elementRef: ElementRef
  ) { }

  public close(): void {
    this.closeClicked.next();
    this.closeClicked.complete();
  }
}
