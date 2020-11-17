import { mainKeyboard, sceneFactory, returnMessage } from '../../helpers/index.js';
import { onlyGroups } from '../../middlewares/index.js';

const scene = sceneFactory('start');
scene.enter(onlyGroups, ctx => returnMessage(ctx, ctx.i18n.t('start.enter'), mainKeyboard(ctx)));

export default scene;
