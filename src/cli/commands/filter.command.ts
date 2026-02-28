import { Command } from "commander";
import fs from "fs";
import { filter } from "../../engine";

export function filterCommand(program: Command) {
  program
    .command("filter")
    .argument("<file>", "Path to JSON file")
    .option("--key <key>", "Key containing national ID")
    .option("--adult <value>", "Filter adults (true/false)")
    .description("Filter national IDs from file")
    .action((file, options) => {
      const raw = fs.readFileSync(file, "utf-8");
      const data = JSON.parse(raw);

      const result = filter(data, {
        key: options.key,
        isAdult: options.adult === "true",
      });

      console.log(JSON.stringify(result, null, 2));
    });
}
