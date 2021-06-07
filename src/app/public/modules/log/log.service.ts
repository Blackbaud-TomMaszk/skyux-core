import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkyLogService {
  public warn(
    message?: any,
    ...optionalParams: any[]
  ): void {
    /*istanbul ignore else */
    if (window.console) {
      window.console.warn.apply(window.console, arguments);
    }
  }
}
