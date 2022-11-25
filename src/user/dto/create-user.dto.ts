import { IsNotEmpty, IsString, Length } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  @Length(5, 10)
  name: string

  @IsNotEmpty()
  age: number
}
