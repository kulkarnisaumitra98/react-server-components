module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // This is crucial for React 17+ and React 18
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
};
