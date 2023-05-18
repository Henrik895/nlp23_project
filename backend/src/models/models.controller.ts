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

@Controller('models')
export class ModelsController {
    constructor(private readonly http: HttpService) {}

    private getModel(name: string): Model | undefined {
        return models.find(model => model.name === name);
    }

    @Get()
    getAllModels(): ModelsDto {
        // TODO: exclude api property
        return {models};
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
