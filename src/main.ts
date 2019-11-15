import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Environments from "dotenv";

async function bootstrap() {
  Environments.config();
  
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Eventalizer')
    .setDescription('Back-end API for the Eventalizer application.')
    .setVersion('1.0')
    .addTag('eventalizer')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}


bootstrap();
