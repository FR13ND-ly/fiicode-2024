import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDetailsDialogComponent } from './suggestion-details-dialog.component';

describe('SuggestionDetailsDialogComponent', () => {
  let component: SuggestionDetailsDialogComponent;
  let fixture: ComponentFixture<SuggestionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
