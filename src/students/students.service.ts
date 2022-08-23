import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './entities/student.entity';
import studentCraper from './utils/studentScraper';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentDocument> {
    let createdStudent;
    if (createStudentDto.url) {
      const linkedinInfo = await studentCraper(createStudentDto.url);
      createdStudent = new this.studentModel({
        ...createStudentDto,
        linkedinInfo,
      });
    } else {
      createdStudent = new this.studentModel(createStudentDto);
    }
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string) {
    return this.studentModel.findOne({ _id: id });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.studentModel.findByIdAndRemove(id);
  }
}
