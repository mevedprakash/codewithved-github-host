import { Injectable } from '@angular/core';
declare var gtag: any;
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}
  trackEvent(eventName: string, eventLabel: string) {
    gtag('event', eventName, {
      // the label that will show up in the dashboard as the events name
      event_label: eventLabel,
    });
  }
}
