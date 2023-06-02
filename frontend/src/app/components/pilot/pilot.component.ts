import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PilotService } from '../../services/pilot/pilot.service';
import { ModelSelectorService } from '../../services/model-selector/model-selector.service';
import { ChosenModelComponent } from '../chosen-model/chosen-model.component';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChosenModelComponent],
  templateUrl: './pilot.component.html',
})
export class PilotComponent {
  loading: boolean = false;

  constructor(
    private readonly modelSelectorService: ModelSelectorService,
    private readonly pilotService: PilotService
  ) {}

  inputForm: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  activeModel = this.modelSelectorService.activeModel;

  async submit(): Promise<void> {
    const currentInput: string = this.inputForm.get('input')!.value;

    this.loading = true;
    const completedText: string = await this.pilotService.complete(currentInput);
    this.inputForm.get('input')!.setValue(completedText);
    this.loading = false;
  }

  resetForm(): void {
    this.inputForm.reset({
      text: '',
    });
  }
}
