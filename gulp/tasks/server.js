import bs from 'browser-sync'
import { optHTML } from './html.js';
import { styles } from './styles.js';
import { scripts } from './scripts.js';
import { assets } from './assets.js';
import pkg from 'gulp';

const {series, watch} = pkg

export const server = bs.create();

export const initServer = () => {
  return server.init({
    server: [$.conf.outputPath, $.conf.app],
    startPath: $.conf.htmlPages,
    notify: false, // уведомления отключены
    port: 3000,
    browser: 'google chrome'
  });
}

export const initWatcher = () => {
  watch(`${$.conf.app}/${$.conf.htmlPages}/**/*.html`, series(optHTML));
  watch(`${$.conf.app}/${$.conf.pathStyles}/**/*.scss`, series(styles));
  watch(`${$.conf.app}/${$.conf.pathJS}/**/*.js`, series(scripts));
  watch(`${$.conf.src}/${$.conf.pathAssets}/**/*`, series(assets));
}
