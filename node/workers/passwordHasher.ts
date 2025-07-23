import bcrypt from 'bcrypt';
import { parentPort } from 'worker_threads';

if (!parentPort) {
  throw new Error('This module must be run in a worker thread');
}

parentPort.on('message', async (data) => {
  try {
    const { plainText, saltRounds } = data;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainText, salt);
    if (parentPort) {
      parentPort.postMessage({ hash });
    }
  } catch (error) {
    if (parentPort) {
      parentPort.postMessage({ error: (error as Error).message });
    }
  }
});
