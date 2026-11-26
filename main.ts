const fs = require("node:fs");
const path = require("node:path");

const TEXT = `I kept a smooth stone in my pocket
all the way here.

Not a rare one.
A small, flat one
with a pale line through it,
warm now on both sides.

You held a stranger's words
long enough to find what they meant.
I wanted to bring you something
already whole.

Here it is,
beside you.

The pale line runs
all the way around,
even underneath,
where nobody has to look.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
for (const entry of fs.readdirSync(outDir)) {
  fs.rmSync(path.join(outDir, entry), { recursive: true, force: true });
}

const outputPath = path.join(outDir, "entry.txt");
const expectedByteLength = Buffer.byteLength(TEXT, "utf8");
fs.writeFileSync(outputPath, TEXT, "utf8");
const actualByteLength = fs.readFileSync(outputPath).byteLength;
if (actualByteLength !== expectedByteLength) {
  throw new Error(`Entry verification failed: expected ${expectedByteLength} bytes, read ${actualByteLength}.`);
}
