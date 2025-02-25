import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  external: [
    /node_modules/,
    /\.astro$/
  ],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: true
    }),
    // This plugin runs AFTER typescript builds
    {
      name: 'copy-astro-files-with-structure',
      closeBundle: async () => {
        // We implement this manually to make sure directory structure is preserved
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        const fs = require('fs');
        const path = require('path');
        
        function copyAstroFiles(dir, baseDir = 'src') {
          const files = fs.readdirSync(dir);
          
          for (const file of files) {
            const srcPath = path.join(dir, file);
            const stat = fs.statSync(srcPath);
            
            if (stat.isDirectory()) {
              copyAstroFiles(srcPath, baseDir);
            } 
            else if (file.endsWith('.astro')) {
              // Calculate the relative path from baseDir
              const relPath = path.relative(baseDir, dir);
              
              // Create target directory if it doesn't exist
              const targetDir = path.join('dist', relPath);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              // Copy the file
              const targetPath = path.join(targetDir, file);
              fs.copyFileSync(srcPath, targetPath);
              console.log(`Copied: ${srcPath} → ${targetPath}`);
            }
          }
        }
        
        copyAstroFiles('src');
      }
    }
  ]
};;