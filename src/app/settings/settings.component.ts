import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ThemesComponent } from "./themes/themes.component";
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-settings',
  imports: [MatTabsModule, MatDialogModule, MatSelectModule, MatIconModule, ThemesComponent, MatButton],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
