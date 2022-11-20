import { DynamicModule, Module } from '@nestjs/common';

interface Options {
  path: string;
}

@Module({})
export class ConfigModule {
  static ForRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
    };
  }
}
