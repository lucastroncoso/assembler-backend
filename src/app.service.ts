import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return new Promise(function (success, nosuccess) {
      const pyprog = spawn('python', ['test.py', 'test']);

      pyprog.stdout.on('data', function (data) {
        success(data.toString());
      });

      pyprog.stderr.on('data', (data) => {
        nosuccess(data.toString());
      });
    });
  }
}
