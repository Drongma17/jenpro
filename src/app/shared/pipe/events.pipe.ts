import { Events } from './../model/events';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'events'
})
export class EventsPipe implements PipeTransform {
 
  transform(events: Events[], text: string): Events[] {
    if(text ==null || text == ""){
      return events;
    }
    return events.filter(n=>
      n.eventName.toLowerCase().includes(text) || n.eventName.toUpperCase().includes(text)
    );
  }
}
