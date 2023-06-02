import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDto } from 'src/app/services/dtos/model.dto';

@Component({
  selector: 'app-chosen-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chosen-model.component.html',
})
export class ChosenModelComponent {
  @Input() model?: ModelDto;
}
