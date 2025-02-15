import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { ToolUtilityService } from '../../servies/tool-utility.service'
import { QUICK_TOOL_BAR_EVENTS } from '../../constants/event.constant'

@Component({
  selector: 'app-main-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './main-text-area.component.html',
  styleUrl: './main-text-area.component.scss'
})
export class MainTextAreaComponent implements OnInit{
 mainTextAreaInput =  new FormControl(''); 
 lineDetails: any;
 lineCount: any;
 constructor(
  private toolUtilityService: ToolUtilityService
 ){
  this.mainTextAreaInput.valueChanges.subscribe(_ => {
      this.updateLineNumbers()
  })
 }

 updateLineNumbers() {
  const text = this.mainTextAreaInput.value || '';
  const lineCount = text.split("\n").length;
  this.lineCount = Array.from({ length: lineCount }, (_, i) => i + 1);
}

ngOnInit(): void {
  this.toolUtilityService.getQuickToolBarEvents().subscribe(event => {
    this.onQuickToolbarEvent(event)
  })
}

onQuickToolbarEvent(event:string){
  switch (event){
    case QUICK_TOOL_BAR_EVENTS.FORMAT_JSON:
    const formatedJson = this.toolUtilityService.formatJson(this.mainTextAreaInput.value)
    this.mainTextAreaInput.setValue(formatedJson as string)
    break;
  }
}

}
