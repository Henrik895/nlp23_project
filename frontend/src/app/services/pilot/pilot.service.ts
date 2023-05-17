import { Injectable } from '@angular/core';
import { PilotApiService } from '../pilotApi/pilot-api.service';
import { ResponseDto } from '../dtos/response.dto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  constructor(private readonly pilotApiService: PilotApiService) {}

  async complete(input: string): Promise<string> {
    const response: ResponseDto | undefined = await firstValueFrom(
      this.pilotApiService.complete(input)
    );
    return response?.text ?? 'Error';
  }  
}
