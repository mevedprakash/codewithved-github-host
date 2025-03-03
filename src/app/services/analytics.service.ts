import { Injectable } from '@angular/core';
declare var gtag: any;
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}
  trackEvent(eventName: string, value: string) {
    try {
      if (!gtag) {
        return;
      }
      gtag('event', eventName, {
        value: value,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
