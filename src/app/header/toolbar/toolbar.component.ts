import { Component, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolUtilityService } from '../../services/tool-utility.service'
import { QUICK_TOOL_BAR_EVENTS } from '../../constants/event.constant'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service'

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule, MatSlideToggleModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  TOOL_BAR = QUICK_TOOL_BAR_EVENTS;
  isDarkModeActive: any = false

  constructor(
    private toolUtilService: ToolUtilityService,
    private themeService: ThemeService
  ){

  }

  onQuickToolBarButtonClick(eventName: string){
      this.toolUtilService.setQuickToolBarEvent(eventName)
  }

  onToggleDarkMode(toggle:any){
    this.isDarkModeActive = !this.isDarkModeActive
    this.themeService.toggleTheme();
  }
  reset(){
    localStorage.clear();
    window.location.reload();
  }
}
