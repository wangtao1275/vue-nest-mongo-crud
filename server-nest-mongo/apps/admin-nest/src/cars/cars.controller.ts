import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Car } from '@libs/db/models/car.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Car
})
@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(@InjectModel(Car) private readonly model: ReturnModelType<typeof Car>) { }

  @Get('option')
  option(){
    return {
      title: "Cars Management",
      column: [
        { prop: "brand", label: "Brand", sortable: true, search: true, regex: true, span: 8, row: false },
        { prop: "name", label: "Name", sortable: true, search: true, regex: true, span: 8, row: false },
        { prop: "country", label: "Country", sortable: true, search: true, regex: true, span: 8, row: false },        
        { prop: "image", label: "Image", type: 'upload', width: 120, listType: 'picture-img', row: false, action: 'upload' },
      ]
    }
  }
}
