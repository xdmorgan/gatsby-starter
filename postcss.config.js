module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-selectors': true,
      },
    },
  },
}
