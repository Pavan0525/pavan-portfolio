import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const resumePdf = 'Pavan_Kumar_Resume.pdf';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        resume: resolve(rootDir, 'resume.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-resume-pdf',
      closeBundle() {
        const outputDir = resolve(rootDir, 'dist');
        mkdirSync(outputDir, { recursive: true });
        copyFileSync(resolve(rootDir, resumePdf), resolve(outputDir, resumePdf));
      },
    },
  ],
});