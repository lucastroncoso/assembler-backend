import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { StudentMock } from './dto/mock-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let studentModel = Model<Student>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    studentModel = mongoConnection.model(Student.name, StudentSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        { provide: getModelToken(Student.name), useValue: studentModel },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should return the saved object', async () => {
      const student = await controller.create(StudentMock());
      expect(student).toBeDefined();
      expect(student.name).toBe(StudentMock().name);
      expect(student.age).toBe(StudentMock().age);
      expect(student.classGroup).toBe(StudentMock().classGroup);
      expect(student.gender).toBe(StudentMock().gender);
    });

    describe('findAll', () => {
      it('Should return an array of students', async () => {
        await new studentModel(StudentMock()).save();
        const students = await controller.findAll();
        expect(students).toBeDefined();
        expect(students.length).toBe(1);
        expect(students[0].name).toBe(StudentMock().name);
      });
    });
  });
});
