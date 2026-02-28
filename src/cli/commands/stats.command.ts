import { Command } from "commander";
import fs from "fs";
import { stats } from "../../engine";

export function statsCommand(program: Command) {
  program
    .command("stats")
    .argument("<file>", "Path to JSON file")
    .option("--key <key>", "Key containing national ID")
    .description("Get statistics from IDs")
    .action((file, options) => {
      try {
        const raw = fs.readFileSync(file, "utf-8");
        const data = JSON.parse(raw);

        if (!Array.isArray(data)) {
          throw new Error("JSON file must contain an array");
        }

        const ids = options.key
          ? data.map((item: any) => item?.[options.key]).filter(Boolean)
          : data;

        const result = stats(ids);

        console.log(JSON.stringify(result, null, 2));
      } catch (err: any) {
        console.error("Error:", err.message);
      }
    });
}
