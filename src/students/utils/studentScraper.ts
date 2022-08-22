import { spawn } from 'child_process';

async function studentScraper(url: string): Promise<string> {
  return new Promise(function (success, nosuccess) {
    const pyprog = spawn('python', ['test.py', url]);

    pyprog.stdout.on('data', function (data) {
      success(data.toString());
    });

    pyprog.stderr.on('data', (data) => {
      nosuccess(data.toString());
    });
  });
}

export default studentScraper;
