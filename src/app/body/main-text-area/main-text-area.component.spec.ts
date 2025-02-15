import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTextAreaComponent } from './main-text-area.component';

describe('MainTextAreaComponent', () => {
  let component: MainTextAreaComponent;
  let fixture: ComponentFixture<MainTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTextAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
