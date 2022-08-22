import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  classGroup: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}

export default CreateStudentDto;
