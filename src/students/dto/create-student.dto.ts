import { IsString, IsNotEmpty, IsMongoId } from '@nestjs/class-validator';

export class CreateStudentDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

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
