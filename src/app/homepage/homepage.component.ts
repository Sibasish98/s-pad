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

  texts: string[] = [
    "console.log('Welcome to S Pad +-');",
    "SELECT * FROM notepad WHERE type = 'Ultimate';",
    'cout << "Notepad, Redefined!";',
    "print('Hello, Developers!')"
  ];
  currentText: string = '';
  index: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 100; // Speed of typing in ms

  ngOnInit(): void {
    this.startTypingEffect();
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

  openPWA() {
    //window.location.href = "yourapp://open";
  }

  startTypingEffect() {
    setInterval(() => {
      if (this.charIndex < this.texts[this.index].length) {
        this.currentText += this.texts[this.index][this.charIndex];
        this.charIndex++;
      } else {
        setTimeout(() => {
          this.currentText = '';
          this.charIndex = 0;
          this.index = (this.index + 1) % this.texts.length;
        }, 1000);
      }
    }, this.typingSpeed);
  }
}
