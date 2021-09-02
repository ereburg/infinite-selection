import del from 'del'

export const clean = (cb) => del([$.conf.dev, $.conf.prod]).then(() => cb())
