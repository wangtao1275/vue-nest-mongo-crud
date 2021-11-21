import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Employee } from '@libs/db/models/employee.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Employee
})
@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(@InjectModel(Employee) private readonly model: ReturnModelType<typeof Employee>) { }

  @Get('option')
  option(){
    return {
      title: "Employees Management",
      column: [
        { prop: "username", label: "Username", sortable: true, search: true, regex: true, span: 12, row: false },
        { prop: "anumber", label: "Anumber", sortable: true, search: true, span: 12, row: false },
        { prop: "team", label: "Team", sortable: true, search: true, regex: true, span: 24, row: true },
        { prop: "location", label: "Location", sortable: true, search: true, regex: true, span: 12, row: false },
        { prop: "avatar", label: "Avatar", type: 'upload', width: 120, listType: 'picture-img', row: false, action: 'upload' },
      ]
    }
  }
}
