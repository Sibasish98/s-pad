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
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data); 
  }

  getIcon() {
    switch (this.data.snackType) {
      case SNACK_BAR_STATUS.SUCCESS:
        return 'done';
      case SNACK_BAR_STATUS.ERROR:
        return 'error';
      case SNACK_BAR_STATUS.WARN:
        return 'warning';
      case SNACK_BAR_STATUS.INFO:
        return 'info';
      default:
        return '';
    }
  }
}
