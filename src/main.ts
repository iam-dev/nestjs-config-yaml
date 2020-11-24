import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpPort = configService.get<string>('http.port');
  const serviceEndpoints = configService.get<string>('serviceEndpoints');
  if (Array.isArray(serviceEndpoints)) {
    console.log(serviceEndpoints);
  }
  await app.listen(httpPort);
}
bootstrap();
