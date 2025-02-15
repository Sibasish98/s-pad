import { Component, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolUtilityService } from '../../services/tool-utility.service'
import { QUICK_TOOL_BAR_EVENTS } from '../../constants/event.constant'

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  TOOL_BAR = QUICK_TOOL_BAR_EVENTS;

  constructor(
    private toolUtilService: ToolUtilityService
  ){

  }

  onQuickToolBarButtonClick(eventName: string){
      this.toolUtilService.setQuickToolBarEvent(eventName)
  }
}
