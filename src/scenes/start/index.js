import I18n from 'telegraf-i18n';
import { mainKeyboard, sceneFactory } from '../../helpers/index.js';
import { onlyGroups } from '../../middlewares/index.js';

const { match } = I18n;
const scene = sceneFactory('start');

scene.enter(onlyGroups, ctx => ctx.replyWithHTML(ctx.i18n.t('start.enter'), mainKeyboard(ctx)));

scene.hears(match('keys.newGame'), ctx => ctx.scene.enter('checkGameCode'));
scene.on('message', ({ replyWithHTML, i18n }) => replyWithHTML(i18n.t('errors.menuError')));

export default scene;
