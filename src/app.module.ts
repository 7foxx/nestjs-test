import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TestController } from './test/test.controller'
import { ListModule } from './list/list.module'
import { ConfigModule } from './config/config.module'
import { UploadModule } from './upload/upload.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '951299034.glf', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'test', //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    ListModule,
    ConfigModule.ForRoot({
      path: 'Fox',
    }),
    UploadModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
