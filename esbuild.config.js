const esbuild = require('esbuild');
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

esbuild.build({
  entryPoints: ['app/javascript/key-quest/src/index.tsx'],
  bundle: true,
  // outdir: 'public/assets',
  // The above is necessary to force to generate application.js
  outfile: 'public/assets/application.js',
  plugins: [sassPlugin()],
  define: {
    'process.env.PUBLIC_URL': JSON.stringify('/')
  },
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx',
    '.sass': 'css',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.mp3': 'file', 
    '.wav': 'file',
    '.woff': 'file',
    '.woff2': 'file'
    // Add other loaders as needed for additional file types
  },
  // Ensure hashed filenames are used for caching
  assetNames: '[name]-[hash]'
}).catch(() => process.exit(1));
