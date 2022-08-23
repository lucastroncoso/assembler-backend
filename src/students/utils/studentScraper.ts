import { spawn } from 'child_process';

async function studentScraper(url: string): Promise<string> {
  const linkedinUsername = process.env.LINKEDIN_USERNAME;
  const linkedinPassword = process.env.LINKEDIN_PASSWORD;
  return new Promise(function (success, nosuccess) {
    const pyprog = spawn('python', [
      'test.py',
      url,
      linkedinUsername,
      linkedinPassword,
    ]);

    pyprog.stdout.on('data', function (data) {
      success(data.toString());
    });

    pyprog.stderr.on('data', (data) => {
      nosuccess(data.toString());
    });
  });
}

export default studentScraper;
