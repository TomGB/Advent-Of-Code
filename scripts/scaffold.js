#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const day = process.argv[2];

if (!day) {
  console.error("Usage: npm run scaffold -- day01");
  process.exit(1);
}

// Validate day format
if (!/^day\d+$/.test(day)) {
  console.error("Invalid day format. Use: day01, day02, etc.");
  process.exit(1);
}

const templateDir = path.join(__dirname, "..", "template");
const targetDir = path.join(__dirname, "..", "2025", day);

// Check if day already exists
if (fs.existsSync(targetDir)) {
  console.error(`${day} already exists`);
  process.exit(1);
}

// Copy template to new day
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  copyDir(templateDir, targetDir);
  console.log(`✓ Created ${day}`);
  console.log(`✓ Ready to code at 2025/${day}`);
} catch (err) {
  console.error("Error creating day:", err.message);
  process.exit(1);
}
