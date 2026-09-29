import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module.js';
import { DEFAULT_API_VERSION } from './common/versioning/api-version.const.js';
import { apiVersionExtractor } from './common/versioning/api-version.extractor.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { bufferLogs: true },
  );

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');

  // Version is negotiated via the version header (see apiVersionExtractor)
  // so URLs stay stable. Missing or unsupported versions use the default.
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor: apiVersionExtractor,
    defaultVersion: DEFAULT_API_VERSION,
  });

  // Open CORS for now (no frontend defined). Restrict via FRONTEND_URL later.
  app.enableCors({ origin: true });

  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(compress);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Public read-only API for the portfolio (language and version via headers)')
    .setVersion('1.0')
    .addTag('profile')
    .addTag('projects')
    .addTag('experience')
    .addTag('skills')
    .addTag('education')
    .addTag('certifications')
    .addTag('publications')
    .addTag('case-studies')
    .addTag('health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}
await bootstrap();
