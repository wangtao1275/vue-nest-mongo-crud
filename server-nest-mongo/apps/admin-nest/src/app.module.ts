import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';
import { CarsModule } from './cars/cars.module';


@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      dest: 'uploads'
    }),
    
    EmployeesModule,    
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
