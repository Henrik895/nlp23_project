import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pilot.component.html',
})
export class PilotComponent {
  loading: boolean = false;

  inputForm: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  async submit(): Promise<void> {
    const currentText: string | undefined = this.inputForm.get('text')?.value;
    if (!currentText) return;

    this.loading = true;
    // TODO: api call
    this.loading = false;
  }

  resetForm(): void {
    this.inputForm.reset({
      text: '',
    });
  }
}
