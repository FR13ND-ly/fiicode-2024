import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionCreatorDialogComponent } from './suggestion-creator-dialog.component';

describe('SuggestionCreatorDialogComponent', () => {
  let component: SuggestionCreatorDialogComponent;
  let fixture: ComponentFixture<SuggestionCreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionCreatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
