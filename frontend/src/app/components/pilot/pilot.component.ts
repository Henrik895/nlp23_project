import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PilotService } from '../../services/pilot/pilot.service';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pilot.component.html',
})
export class PilotComponent {
  loading: boolean = false;

  constructor(private readonly pilotService: PilotService) {}

  inputForm: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

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
