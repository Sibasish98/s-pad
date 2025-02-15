import { Component } from '@angular/core';
import { ToolbarComponent } from "./header/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [ ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 's-pad';
}
