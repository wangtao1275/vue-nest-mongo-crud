import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
export type CarDocument = DocumentType<Car>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Car {
  @ApiProperty({ description: 'Brand', example: 'Ford' })
  @prop()
  brand: string;

  @ApiProperty({ description: 'Name', example: 'Focus' })
  @prop()
  name: string;

  @ApiProperty({ description: 'Country', example: 'US' })
  @prop()
  country: string;

  @ApiProperty({ description: 'Image', example: 'http://localhost:3002/uploads/d647181a94cd9a2c87eee88eecc7cdf4' })
  @prop()
  image: string;
}
