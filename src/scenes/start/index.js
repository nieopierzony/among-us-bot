import I18n from 'telegraf-i18n';
import { mainKeyboard, sceneFactory } from '../../helpers/index.js';

const { match } = I18n;
const scene = sceneFactory('start');

scene.enter(ctx => ctx.replyWithHTML(ctx.i18n.t('start.enter'), mainKeyboard(ctx)));
scene.hears(match('keys.newGame'), ctx => ctx.scene.enter('newGame'));
scene.on('message', ({ replyWithHTML, i18n }) => replyWithHTML(i18n.t('menu.wrong')));

export default scene;
