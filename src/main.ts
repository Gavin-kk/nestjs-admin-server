import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-flow';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { Log4jsLogger } from '@nestx-log4js/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
dotenv.config();
const logger = new Logger('main.ts');

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../upload'), {
    prefix: '/static/',
  });

  const config = new DocumentBuilder()
    .setTitle('nestjs后台管理系统api')
    .setDescription('这是商城后台管理系统项目')
    .setVersion('1.0')
    .addTag('我是一个标签')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // 第一个参数是路径 就是你要在那个url路径访问到这个 api 文档
  SwaggerModule.setup('api-docs', app, document);

  app.useLogger(app.get(Log4jsLogger));
  // 使用日志框架
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  // 开启cors跨域
  app.enableCors();
  //配置静态资源
  await app.listen(process.env.APP_PORT);
}

bootstrap().then(() => {
  logger.log(
    `listen in http://${process.env.APP_HOST}:${process.env.APP_PORT}`,
  );
  logger.log(
    `Document in http://${process.env.APP_HOST}:${process.env.APP_PORT}/api-docs`,
  );
});
