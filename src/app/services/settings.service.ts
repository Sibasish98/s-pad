import { inject, Injectable } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  dialog = inject(MatDialog);
  constructor() { }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
        data: {name: 'abcd'},
        width: '600px',  // ✅ Adjust width to fit vertical tabs
        height: '500px', // ✅ Prevents overflow
        panelClass: 'settings-dialog' // ✅ Custom styling if needed
    });
  }
}
