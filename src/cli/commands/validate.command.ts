import { Command } from "commander";
import { validate } from "../../core";

export function validateCommand(program: Command) {
  program
    .command("validate")
    .argument("<nationalId>", "Egyptian National ID")
    .description("Check if a national ID is mathematically and structurally valid")
    .action((nationalId: string) => {
      const isValid = validate(nationalId);
      if (isValid) {
        console.log(`✅ Valid National ID: ${nationalId}`);
        process.exit(0);
      } else {
        console.error(`❌ Invalid National ID: ${nationalId}`);
        process.exit(1);
      }
    });
}
