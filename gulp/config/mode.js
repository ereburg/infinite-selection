export const setMode = (isProduction = false) => {
  return (cb) => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    $.conf.isProd = isProduction
    $.conf.outputPath = isProduction ? $.conf.prod : $.conf.dev
    cb()
  }
}
