#!/usr/bin/env node
import { Command } from 'commander';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('my-cli')
  .description('A simple CLI that interacts with a script')
  .version('1.0.0');

  //make a chat function which sets up a while loop which can be cancelled with /exit
program
  .command('run-script <scriptPath>')
  .description('Run a specified script')
  .action((scriptPath) => {
    const fullPath = resolve(__dirname, scriptPath);
    exec(`node "${fullPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Script error: ${stderr}`);
        return;
      }
      console.log(`Script output: ${stdout}`);
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}