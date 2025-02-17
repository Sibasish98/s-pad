import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackBarService } from './snack-bar.service'
import { SNACK_BAR_STATUS } from '../constants/snackbar.constant'

@Injectable({
  providedIn: 'root'
})
export class ToolUtilityService {

  quickToolBarEvent: Subject<any>;

  constructor(
    private snackBarService: SnackBarService
  ) {
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
      this.snackBarService.openSnackBar('Formated as JSON',3000, SNACK_BAR_STATUS.SUCCESS)
      return formatedJSON;
    } catch (error) {
      this.snackBarService.openSnackBar(error as string,3000, SNACK_BAR_STATUS.ERROR)
      console.error(error)
      return
    }
  }

  saveToFile(fileName: string,content: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${fileName}.txt`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }
}
