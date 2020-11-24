import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { CustomConfigModule } from './config/custom-config.module';
import { CustomConfigService } from './config/custom-config.service';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { from } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async (customConfigService: CustomConfigService) => ({
        ...customConfigService.createGatewayOptions(),
      }),
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
