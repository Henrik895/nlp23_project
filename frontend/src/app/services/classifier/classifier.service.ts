import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ClassifierApiService } from "../classifier-api/classifier-api.service";
import { ClassifierResponseDto } from "../dtos/classifier-response.dto";

@Injectable({
    providedIn: 'root'
})
export class ClassifierService {
    constructor(
        private readonly classifierApiService: ClassifierApiService
    ) {}

    async classify(text: string): Promise<ClassifierResponseDto> {
        const res = await firstValueFrom(
            this.classifierApiService.classify(text)
        );
        if (!res) {
            return {'label': 'Error', confidence: 100};
        };
        return res;
    }
}