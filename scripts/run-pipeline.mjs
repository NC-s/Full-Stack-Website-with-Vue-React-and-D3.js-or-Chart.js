import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pipelinePath = resolve(__dirname, '../server/data_pipeline.py');

const candidates = [
  { command: 'python3', args: [] },
  { command: 'python', args: [] },
  { command: 'py', args: ['-3'] }
];

let selected = null;

for (const candidate of candidates) {
  const result = spawnSync(candidate.command, [...candidate.args, '--version'], {
    stdio: 'ignore'
  });

  if (result.status === 0) {
    selected = candidate;
    break;
  }
}

if (!selected) {
  console.error('Unable to locate a Python 3 interpreter (tried python3, python, py -3).');
  process.exit(1);
}

const child = spawn(selected.command, [...selected.args, pipelinePath], {
  stdio: 'inherit'
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(`Failed to start data pipeline: ${error.message}`);
  process.exit(1);
});
