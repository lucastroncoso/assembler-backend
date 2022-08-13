import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
} from '@nestjs/class-validator';

export class UpdateStudentDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  age: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  classGroup: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender: string;
}

export default UpdateStudentDto;
