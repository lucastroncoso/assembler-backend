import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let studentModel = Model<Student>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    studentModel = mongoConnection.model(Student.name, StudentSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: getModelToken(Student.name), useValue: studentModel },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
