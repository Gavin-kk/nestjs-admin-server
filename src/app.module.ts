import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './module/auth/auth.module';
import { ClassifyModule } from './module/classify/classify.module';
import { CommodityModule } from './module/commodity/commodity.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { UploadModule } from './module/upload/upload.module';
import { RoleModule } from './module/role/role.module';
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig),
    Log4jsModule.forRoot(),
    AuthModule,
    ClassifyModule,
    CommodityModule,
    UploadModule,
    RoleModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
