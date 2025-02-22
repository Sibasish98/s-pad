import { Component, HostListener, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { ToolUtilityService } from '../../services/tool-utility.service'
import { QUICK_TOOL_BAR_EVENTS } from '../../constants/event.constant'
import {MatTabsModule} from '@angular/material/tabs';
import { DocumentTab } from '../../model/tab-data-model'
import { MatIconModule } from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-main-text-area',
  imports: [ReactiveFormsModule, MatTabsModule, MatIconModule, MatTooltipModule],
  templateUrl: './main-text-area.component.html',
  styleUrl: './main-text-area.component.scss'
})
export class MainTextAreaComponent implements OnInit{

 activeTabIndex: any;
 tabCounter = 0;
 tabs:any = [];
 languages = ['json', 'javascript', 'sql'];
 showTooltip = false;
 tooltipPosition = { x: 0, y: 0 };
 selectedText = '';


 @HostListener('window:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) {

   if (event.shiftKey && event.key.toLowerCase() === 'n') {
     event.preventDefault(); 
     this.addTab();
   }
 }


 constructor(
  private toolUtilityService: ToolUtilityService
 ){
  this.loadTabs();
 }

 updateLineNumbers(tab: DocumentTab) {
  const text = tab.mainTextAreaInput.value || '';
  const lineCount = text.split("\n").length;
  tab.lineCount = Array.from({ length: lineCount }, (_, i) => i + 1);
  this.highlightCode(tab);
  this.saveTabs();
}

ngOnInit(): void {
  this.toolUtilityService.getQuickToolBarEvents().subscribe(event => {
    this.onQuickToolbarEvent(event)
  })
}

onQuickToolbarEvent(event:string){
  const mainTextArea = this.tabs[this.activeTabIndex]
  switch (event){
    case QUICK_TOOL_BAR_EVENTS.FORMAT_JSON:
    const formatedJson = this.toolUtilityService.formatJson(mainTextArea.mainTextAreaInput.value)
    if (formatedJson)
      mainTextArea.mainTextAreaInput.setValue(formatedJson as string)
    break;
    case QUICK_TOOL_BAR_EVENTS.DOWNLOAD:
      this.toolUtilityService.saveToFile(mainTextArea.name,mainTextArea.mainTextAreaInput.value);
    break;
    case QUICK_TOOL_BAR_EVENTS.SAVE_AS:
      this.toolUtilityService.saveAsFile(mainTextArea.name,mainTextArea.mainTextAreaInput.value)
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
    tabCount: this.tabCounter,
    activeTabIndex: this.activeTabIndex
  }));
  localStorage.setItem('tabsData', JSON.stringify(cleanTabs));
}

loadTabs() {
  const savedTabs = JSON.parse(localStorage.getItem('tabsData') || '[]');
  if (savedTabs.length > 0) {
    this.tabCounter = savedTabs[0].tabCount;
    this.activeTabIndex = savedTabs[0].activeTabIndex
    this.tabs = savedTabs.map((tab: any) => {
      const control = new FormControl(tab.mainTextAreaInput);


      return {
        id: tab.id,
        name: tab.name,
        lineCount: tab.lineCount,
        mainTextAreaInput: control
      };
    });
    this.highlightCode(this.tabs[this.activeTabIndex])
    this.tabs.forEach((_:any) => {
      _.mainTextAreaInput.valueChanges.subscribe(() => {
        this.updateLineNumbers(_);
      });
    })
   // this.activeTabIndex = this.tabs.length ? this.tabs[0].id : null;
  } else {
    this.addTab();
  }
}

highlightCode(tab: DocumentTab) {
  setTimeout(() => {
    const codeElement = document.getElementById(`code-block-${tab.id}`);
    console.log('ele ',codeElement)
    if (codeElement) {
      const highlighted = Prism.highlight(
        tab.mainTextAreaInput.value || '',
        Prism.languages['json'],
        'json'
      );
      codeElement.innerHTML = highlighted.replace(/\n/g, '<br>') + '<br>';
    }
  }, 0);
}

highlightAll() {
  this.tabs.forEach((tab: any) => this.highlightCode(tab));
}

syncScroll(event: Event, tab: DocumentTab) {
  const textArea = event.target as HTMLTextAreaElement;
  const codeElement = document.getElementById(`code-block-${tab.id}`);
  
  if (codeElement) {
      codeElement.scrollTop = textArea.scrollTop; // Sync vertical scroll
      codeElement.scrollLeft = textArea.scrollLeft; // Sync horizontal scroll
  }
}

onTabChange(event: any){
  this.highlightCode(this.tabs[event.index])
}

showActionButtons(event: MouseEvent, tab: DocumentTab) {
  const textarea = event.target as HTMLTextAreaElement;
  const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  console.log('selected text ',selection)
  if (selection) {
      this.selectedText = selection;
      this.tooltipPosition = { x: event.clientX + 10, y: event.clientY - 30 };
      this.showTooltip = true;
  } else {
      this.showTooltip = false;
  }
}

copySelectedText() {
  if (this.selectedText) {
      navigator.clipboard.writeText(this.selectedText).then(() => {
          this.showTooltip = false;
      });
  }
}

}
