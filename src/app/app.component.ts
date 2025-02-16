import { Component, HostListener, OnInit } from '@angular/core';
import { ToolbarComponent } from "./header/toolbar/toolbar.component";
import { MainTextAreaComponent } from "./body/main-text-area/main-text-area.component";
import { HomepageComponent } from "./homepage/homepage.component";

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, MainTextAreaComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'S Pad +-';
  isPWAmode:boolean = false;

  
  ngOnInit(): void {
    this.isPWAmode = this.isPWA();
  }

  isPWA(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone || // Fix TypeScript error
      (document.referrer === '' && window.matchMedia('(display-mode: standalone)').matches)
    );
  }

}
