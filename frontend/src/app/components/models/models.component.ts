import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelSelectorService } from '../../services/model-selector/model-selector.service';
import { ModelDto } from '../../services/dtos/model.dto';
import { ChosenModelComponent } from '../chosen-model/chosen-model.component';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, ChosenModelComponent],
  templateUrl: './models.component.html',
})
export class ModelsComponent {
  constructor(
    private readonly modelSelectorService: ModelSelectorService
  ) {}

  activeModel = this.modelSelectorService.activeModel;
  models$ = this.modelSelectorService.models$;

  selectModel(model: ModelDto): void {
    this.modelSelectorService.selectModel(model);
  }
}
