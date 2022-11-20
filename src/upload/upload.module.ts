import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 设置存放路径
        destination: join(__dirname, '../images'),
        filename(req, file, callback) {
          console.log(file)

          const FileName = `${new Date().getTime()} ${extname(
            file.originalname,
          )}`
          return callback(null, FileName)
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
