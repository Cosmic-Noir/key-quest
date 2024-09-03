const esbuild = require('esbuild');
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

esbuild.build({
  entryPoints: ['app/javascript/application.tsx'],
  bundle: true,
  outdir: 'public/assets',
  plugins: [sassPlugin()],
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx',
    '.sass': 'css',
    '.png': 'file',
    '.mp3': 'file', 
    '.wav': 'file'
    // Add other loaders as needed for additional file types
  }
}).catch(() => process.exit(1));
