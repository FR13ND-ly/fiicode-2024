import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionEditorDialogComponent } from './suggestion-editor-dialog.component';

describe('SuggestionEditorDialogComponent', () => {
  let component: SuggestionEditorDialogComponent;
  let fixture: ComponentFixture<SuggestionEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionEditorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
