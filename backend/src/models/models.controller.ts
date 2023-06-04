import { 
    Controller, 
    Param, 
    Get,
    Post, 
    Body,
    BadRequestException,
    InternalServerErrorException 
} from '@nestjs/common';
import { ResponseDto } from './dtos/response.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Model, models } from './models';
import { ModelsDto } from './dtos/models.dto';
import { ClassifyResponseDto } from './dtos/classify-response.dto';

@Controller('models')
export class ModelsController {
    private readonly classifier = process.env.NODE_ENV === 'production' ? 'http://model_classifier:8000' : 'http://127.0.0.1:8000';

    constructor(private readonly http: HttpService) {}

    private getModel(name: string): Model | undefined {
        return models.find(model => model.name === name);
    }

    @Get()
    getAllModels(): ModelsDto {
        // TODO: exclude api property
        return {models};
    }

    @Post('classify')
    async classifyText(@Body() body: ResponseDto): Promise<ClassifyResponseDto> {
        const res = (await firstValueFrom(
            this.http.post(this.classifier, body, {headers: {'Content-Type': 'application/json'}})
                .pipe(
                    catchError((err) => {
                        console.log(err);
                        throw new InternalServerErrorException('Classifier error');
                    })
                )
        ))?.['data'];

        if (!res) {
            throw new InternalServerErrorException('Classifier result missing');
        };

        return res;
    }

    @Post(':name')
    async completeText(@Param('name') name: string, @Body() body: ResponseDto): Promise<ResponseDto> {
        const model: Model | undefined = this.getModel(name);
        if (!model) {
            throw new BadRequestException(`Model ${name} not available`);
        };

        const res = (await firstValueFrom(
            this.http.post(model.api, body, {headers: {'Content-Type': 'application/json'}})
                .pipe(
                    catchError((err) => {
                        console.log(err);
                        throw new InternalServerErrorException(`${model.name} API request error`);
                    })
                )
        ))?.['data'];

        if (!res?.text) {
            throw new InternalServerErrorException('API response is missing completed text');
        };

        return {text: res.text};
    }
}
