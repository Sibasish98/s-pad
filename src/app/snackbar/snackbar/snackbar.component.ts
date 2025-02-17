import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { SNACK_BAR_STATUS } from '../../constants/snackbar.constant'

@Component({
  selector: 'app-snackbar',
  imports: [MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  snackBarIcon: string=''
  snackBarIconColor: string='white'
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.setInitialData();
  }

  setInitialData() {
    switch (this.data.snackType) {
      case SNACK_BAR_STATUS.SUCCESS:
        this.snackBarIcon = 'done';
        this.snackBarIconColor = 'yellowgreen';
        break;
      case SNACK_BAR_STATUS.ERROR:
        this.snackBarIcon = 'error';
        this.snackBarIconColor = 'red';
        break;
      case SNACK_BAR_STATUS.WARN:
        this.snackBarIcon = 'warning';
        this.snackBarIconColor = 'yellow';
        break;
      case SNACK_BAR_STATUS.INFO:
        this.snackBarIcon = 'info';
        this.snackBarIconColor = 'blue';
        break;
    }
  }
}
