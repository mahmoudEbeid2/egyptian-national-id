import { Command } from "commander";
import { parse } from "../../core";

export function analyzeCommand(program: Command) {
  program
    .command("analyze")
    .argument("<nationalId>", "Egyptian National ID")
    .description("Analyze a single national ID")
    .action((nationalId: string) => {
      try {
        const result = parse(nationalId);
        console.log(JSON.stringify(result, null, 2));
      } catch (err: any) {
        console.error("Error:", err.message);
      }
    });
}
