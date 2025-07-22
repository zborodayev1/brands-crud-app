import bcrypt from 'bcrypt';
import { parentPort } from 'worker_threads';

parentPort.on('message', async (data) => {
  try {
    const { plainText, saltRounds } = data;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainText, salt);
    parentPort.postMessage({ hash });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
});
