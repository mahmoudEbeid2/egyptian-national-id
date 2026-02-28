#!/usr/bin/env node
import { Command } from "commander";
import {
  analyzeCommand,
  filterCommand,
  statsCommand,
  generateCommand,
  validateCommand,
} from "./commands";

const program = new Command();

program
  .name("egyid")
  .description("Egyptian National ID CLI Tool")
  .version("1.0.0");

analyzeCommand(program);
filterCommand(program);
statsCommand(program);
generateCommand(program);
validateCommand(program);

program.parse();

