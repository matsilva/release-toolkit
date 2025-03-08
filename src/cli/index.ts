#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { createCommand } from './commands/create.js';

const program = new Command();

program
  .name('xrelease')
  .description('xrelease (pronounced cross-release) helps you setup automated releases for your project for any language')
  .version('0.1.0');

// Initialize command
program
  .command('init')
  .description('Initialize xrelease')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-l, --language <type>', 'Project language (node, go)', 'node')
  .action((options) => {
    initCommand(options);
  });

// Add command
program
  .command('add')
  .description('Add individual components to your project')
  .argument('<component>', 'Component to add (workflow, changelog, hooks)')
  .action(addCommand);

// Create command
program
  .command('create')
  .description('Create a new release')
  .option('--ci', 'Run in CI mode (non-interactive)')
  .option('--bump <type>', 'Version bump type (patch, minor, major)', 'patch')
  .option('--branch <name>', 'Override the release branch (default: from config)')
  .option('-c, --config <path>', 'Path to config file (default: .xrelease.yml)')
  .action((options) => {
    createCommand(options);
  });

// Error handling
program.on('command:*', () => {
  console.error(chalk.red('Invalid command'));
  console.log(`See ${chalk.blue('--help')} for a list of available commands.`);
  process.exit(1);
});

program.parse();
