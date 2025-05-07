import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './shared/config/validation.config';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
