import { FormControl } from "@angular/forms";

export interface DocumentTab {
    id: number;
    name: string;
    mainTextAreaInput: FormControl;
    lineCount: [number] | number[]
  }