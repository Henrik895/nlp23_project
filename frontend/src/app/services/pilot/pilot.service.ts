import { Injectable } from '@angular/core';
import { PilotApiService } from '../pilot-api/pilot-api.service';
import { ResponseDto } from '../dtos/response.dto';
import { firstValueFrom } from 'rxjs';
import { ModelSelectorService } from '../model-selector/model-selector.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  constructor(
    private readonly modelSelectorService: ModelSelectorService,
    private readonly pilotApiService: PilotApiService,
    private readonly toastr: ToastrService,
  ) {}

  async complete(input: string): Promise<string> {
    const activeModel = this.modelSelectorService.activeModel();
    if (!activeModel) {
      this.toastr.error('Model not selected');
      return 'Error';
    };

    const response: ResponseDto | undefined = await firstValueFrom(
      this.pilotApiService.complete(input, activeModel)
    );
    return response?.text ?? 'Error';
  }  
}
