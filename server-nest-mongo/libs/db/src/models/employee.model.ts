import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
export type EmployeeDocument = DocumentType<Employee>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Employee {
  @ApiProperty({ description: 'Username', example: 'Terry Wang' })
  @prop()
  username: string;

  @ApiProperty({ description: 'Anumber', example: 'A602500' })
  @prop()
  anumber: string;

  @ApiProperty({ description: 'Team', example: 'Platform Engineering and Cloud Advancement' })
  @prop()
  team: string;

  @ApiProperty({ description: 'Location', example: 'Dalian' })
  @prop()
  location: string;

  @ApiProperty({ description: 'Avatar', example: 'http://localhost:3002/uploads/d647181a94cd9a2c87eee88eecc7cdf4' })
  @prop()
  avatar: string;
}
