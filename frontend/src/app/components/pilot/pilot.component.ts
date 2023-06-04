import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PilotService } from '../../services/pilot/pilot.service';
import { ModelSelectorService } from '../../services/model-selector/model-selector.service';
import { ChosenModelComponent } from '../chosen-model/chosen-model.component';
import { ClassifierResponseDto } from '../../services/dtos/classifier-response.dto';
import { ClassifierService } from '../../services/classifier/classifier.service';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChosenModelComponent],
  templateUrl: './pilot.component.html',
})
export class PilotComponent {
  loading: boolean = false;
  classification: ClassifierResponseDto | undefined;

  constructor(
    private readonly modelSelectorService: ModelSelectorService,
    private readonly pilotService: PilotService,
    private readonly classifierService: ClassifierService,
  ) {}

  inputForm: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  activeModel = this.modelSelectorService.activeModel;

  async submit(): Promise<void> {
    const currentInput: string = this.inputForm.get('input')!.value;

    this.loading = true;
    this.classification = undefined;

    const completedText: string = await this.pilotService.complete(currentInput);
    
    this.inputForm.get('input')!.setValue(completedText);
    this.loading = false;

    this.classification = await this.classifierService.classify(completedText);
  }

  resetForm(): void {
    this.classification = undefined;
    this.inputForm.reset({
      text: '',
    });
  }
}
