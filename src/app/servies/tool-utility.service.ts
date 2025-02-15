import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolUtilityService {

  quickToolBarEvent: Subject<any>;

  constructor() {
     this.quickToolBarEvent = new Subject<any>();
   }
   //get user activity from quick tool bar 
   getQuickToolBarEvents(){
    return this.quickToolBarEvent.asObservable();
   }

   setQuickToolBarEvent(event:any){
    this.quickToolBarEvent.next(event)
   }

   formatJson(text: any) {
    try {
      const parsed = JSON.parse(text || '');
      const formatedJSON = (JSON.stringify(parsed, null, 2)); // Format JSON with indentation
      //this.errorMessage = ''; // Clear errors if successful
      return formatedJSON;
    } catch (error) {
      console.error(error)
      return
    }
  }
}
