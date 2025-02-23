const esbuild = require('esbuild');
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

async function startEsbuild() {
  try {
    const ctx = await esbuild.context({
      entryPoints: ['app/javascript/key-quest/src/index.tsx'],
      bundle: true,
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
      },
      assetNames: '[name]-[hash]'
    });

    console.log('👀 Esbuild is watching for file changes...');
    await ctx.watch(); // Correct method for watching
  } catch (error) {
    console.error('❌ Esbuild failed to start:', error);
    process.exit(1);
  }
}

startEsbuild();
