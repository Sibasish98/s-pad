import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar/snackbar.component'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  openSnackBar(message: string, duration: number ,type: number,action?: string) {
    //this._snackBar.open(message, action, {duration});
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { message: message, snackType: type }
    });
  }
}
