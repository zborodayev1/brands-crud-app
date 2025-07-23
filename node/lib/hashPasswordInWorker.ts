import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import * as env from '../config/env';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workerPath = join(__dirname, '../workers/passwordHasher.js');

export const hashPasswordInWorker = (plainText: string) => {
  return new Promise((resolvePromise, rejectPromise) => {
    const worker = new Worker(workerPath);

    worker.once('message', (message) => {
      if (message.error) {
        rejectPromise(new Error(message.error));
      } else {
        resolvePromise(message.hash);
      }
      worker.terminate();
    });

    worker.once('error', rejectPromise);
    worker.postMessage({ plainText, saltRounds: env.SALT_ROUNDS });
  });
};
