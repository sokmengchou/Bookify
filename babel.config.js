module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@styles': ['./app/_styles'],
          '@customs': ['./customs'],
        },
      },
    ],
  ],
};
