import { Injectable } from '@angular/core';
declare var gtag: any;
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}
  trackEvent(eventName: string, value: string) {
    gtag('event', eventName, {
      value: value,
    });
  }
}
