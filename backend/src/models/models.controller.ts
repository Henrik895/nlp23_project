import { Controller, Get } from '@nestjs/common';
import { ResponseDto } from './dtos/response.dto';

@Controller('models')
export class ModelsController {
    @Get()
    getDummyOutput(): ResponseDto {
        return {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas risus odio, mollis a ultrices sed, gravida nec nunc. Suspendisse ultrices imperdiet vestibulum. Morbi ullamcorper tempus ipsum at accumsan. Proin hendrerit, metus eu tristique congue, nulla nibh efficitur sapien, id hendrerit mi felis ac purus. Donec massa nisi, ullamcorper in fringilla in, lobortis eu mi. Pellentesque blandit mi quis quam placerat, vitae tempor metus tempor. Duis eget vulputate velit.'
        }
    }
}
