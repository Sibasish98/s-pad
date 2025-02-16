import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { ToolUtilityService } from '../../services/tool-utility.service'
import { QUICK_TOOL_BAR_EVENTS } from '../../constants/event.constant'
import {MatTabsModule} from '@angular/material/tabs';
import { DocumentTab } from '../../model/tab-data-model'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-main-text-area',
  imports: [ReactiveFormsModule, MatTabsModule, MatIconModule],
  templateUrl: './main-text-area.component.html',
  styleUrl: './main-text-area.component.scss'
})
export class MainTextAreaComponent implements OnInit{

 activeTabIndex: any;
 tabCounter = 1;
 tabs:any = [];

 constructor(
  private toolUtilityService: ToolUtilityService
 ){
  this.loadTabs();
 }

 updateLineNumbers(tab: DocumentTab) {
  const text = tab.mainTextAreaInput.value || '';
  const lineCount = text.split("\n").length;
  tab.lineCount = Array.from({ length: lineCount }, (_, i) => i + 1);
  this.saveTabs();
}

ngOnInit(): void {
  this.toolUtilityService.getQuickToolBarEvents().subscribe(event => {
    this.onQuickToolbarEvent(event)
  })
}

onQuickToolbarEvent(event:string){
  switch (event){
    case QUICK_TOOL_BAR_EVENTS.FORMAT_JSON:
    const mainTextArea = this.tabs[this.activeTabIndex]
    const formatedJson = this.toolUtilityService.formatJson(mainTextArea.mainTextAreaInput.value)
    if (formatedJson)
      mainTextArea.mainTextAreaInput.setValue(formatedJson as string)
    break;
  }
  this.saveTabs();
}

addTab() {
  const newTab: DocumentTab = {
    id: this.tabCounter++,
    name: `Untitled ${this.tabCounter - 1}`,
    mainTextAreaInput: new FormControl(''),
    lineCount: [1]
  };
  this.tabs.push(newTab);
  newTab.mainTextAreaInput.valueChanges.subscribe(() => {
    this.updateLineNumbers(newTab);
  });
  this.activeTabIndex = this.tabs.length - 1; // Switch to the new tab
  this.saveTabs();
}

closeTab(index: number) {
  this.tabs.splice(index, 1);
  if (this.tabs.length === 0) {
    this.addTab(); // Ensure at least one tab remains open
  } else if (this.activeTabIndex >= this.tabs.length) {
    this.activeTabIndex = this.tabs.length - 1;
  }
  this.saveTabs();
}

saveTabs() {
  const cleanTabs = this.tabs.map((tab:any) => ({
    id: tab.id,
    name: tab.name,
    mainTextAreaInput: tab.mainTextAreaInput.value,
    lineCount: tab.lineCount,
  }));
  localStorage.setItem('tabsData', JSON.stringify(cleanTabs));
}

loadTabs() {
  const savedTabs = JSON.parse(localStorage.getItem('tabsData') || '[]');
  if (savedTabs) {
    this.tabs = savedTabs.map((tab:any)=> ({
      id: tab.id,
      name: tab.name,
      lineCount: tab.lineCount,
      mainTextAreaInput: new FormControl(tab.mainTextAreaInput)
    }));
    this.activeTabIndex = this.tabs.length ? this.tabs[0].id : null;
  } else {
    this.addTab();
  }
}

}
