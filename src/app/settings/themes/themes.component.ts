import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {APPLICATION_THEMES, EDITOR_THEME } from '../../constants/themes.constant'
import { ThemeService } from '../../services/theme.service'

@Component({
  selector: 'app-themes',
  imports: [MatSelectModule, FormsModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
    Application_Themes = APPLICATION_THEMES;
    Editor_Themes = EDITOR_THEME;

    applicationTheme: any;
    editorTheme: any;

    constructor(
      private themeService: ThemeService
    ){}

    applyTheme(event:string){
      switch (event){
        case 'Dark':
          this.themeService.enableDarkTheme();
          return;
        case 'Light':
          this.themeService.enableLightTheme();
          return;
      }
    }
}
