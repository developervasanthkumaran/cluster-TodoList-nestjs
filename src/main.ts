import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const options = new DocumentBuilder().setVersion('0.0.1').setTitle('cluster-b').setDescription("cluster-b-endpoints").build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app,document);
  await app.listen(8000);
}
bootstrap();
