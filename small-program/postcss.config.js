module.exports = {
  'plugins': {
    'postcss-cssnext': {},
    'postcss-pxtorem': {
      'rootValue': 96,
      'propList': ['*'],
      'selectorBlackList': [/^body$/, /^html$/],
      'replace': true,
      'minPixelValue': 2
    }
  }
}
