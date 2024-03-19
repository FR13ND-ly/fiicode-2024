import { JsonPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../core/feature/material/material.module';

@Component({
  selector: 'differences',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './differences.component.html',
  styleUrl: './differences.component.scss',
})
export class DifferencesComponent {
  @Input() data: any;
}
