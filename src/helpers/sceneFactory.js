import TelegrafI18n from 'telegraf-i18n';
import Scene from 'telegraf/scenes/base.js';

const { match } = TelegrafI18n;

export default name => {
  const scene = new Scene(name);

  scene.hears(match('keys.back'), ctx => ctx.scene.enter('menu'));
  scene.command('restart', ctx => ctx.scene.enter('menu'));

  return scene;
};
