import { Component } from '@angular/core';
import { ToolbarComponent } from "./header/toolbar/toolbar.component";
import { MainTextAreaComponent } from "./body/main-text-area/main-text-area.component";

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, MainTextAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 's-pad';

  formatJson(){
    
  }
}
