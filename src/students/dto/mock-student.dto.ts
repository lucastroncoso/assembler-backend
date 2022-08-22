import { CreateStudentDto } from './create-student.dto';

export const StudentMock = (): CreateStudentDto => {
  return {
    name: 'John Doe',
    age: 20,
    classGroup: '1A',
    gender: 'Male',
  };
};
