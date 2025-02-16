import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  installPromptEvent: any; // Store the install event
  showInstallButton = false; 

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault(); // Prevent default Chrome behavior
    this.installPromptEvent = event;
    this.showInstallButton = true; // Show the install button
  }

  installPWA() {
    if (this.installPromptEvent) {
      this.installPromptEvent.prompt(); // Show the install prompt
      this.installPromptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.installPromptEvent = null;
        this.showInstallButton = false; // Hide the button after interaction
      });
    }
  }
}
