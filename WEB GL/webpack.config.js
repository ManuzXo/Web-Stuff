const path = require('path');

module.exports = {
  entry: './src/index.ts',       // file principale
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',       // usa ts-loader per compilare TypeScript
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']  // permette import senza estensione
  },
  output: {
    filename: 'bundle.js',      // file finale
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'           // puoi usare 'production' per minificare
};
