import { Command } from "commander";
import { generateId } from "../../core";
import { Gender } from "../../domain/Gender";

export function generateCommand(program: Command) {
  program
    .command("generate")
    .description("Generate a valid random Egyptian National ID")
    .option("-y, --year <number>", "Specific birth year (e.g., 1995)")
    .option("-m, --month <number>", "Specific birth month (1-12)")
    .option("-d, --day <number>", "Specific birth day (1-31)")
    .option("-g, --gov <number>", "Specific governorate code (e.g., 1 for Cairo)")
    .option("--male", "Generate a male ID")
    .option("--female", "Generate a female ID")
    .action((options) => {
      let gender: Gender | undefined;
      if (options.male) gender = "Male";
      if (options.female) gender = "Female";

      const opts = {
        birthYear: options.year ? Number(options.year) : undefined,
        birthMonth: options.month ? Number(options.month) : undefined,
        birthDay: options.day ? Number(options.day) : undefined,
        governorateCode: options.gov ? Number(options.gov) : undefined,
        gender,
      };

      try {
        const result = generateId(opts);
        console.log(`🎉 Generated ID: ${result}`);
      } catch (err: any) {
        console.error("❌ Generation Error:", err.message);
      }
    });
}
