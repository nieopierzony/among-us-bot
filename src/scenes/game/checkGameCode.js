import { backKeyboard, sceneFactory, returnMessage } from '../../helpers/index.js';
import Game from '../../models/Game.js';

const scene = sceneFactory('checkGameCode');

scene.enter(ctx => {
  const { i18n, group } = ctx;
  // Check if group already has a game
  if (group && group.game && group.game.state === 'active') {
    scene.leave();
    return returnMessage(ctx, i18n.t('errors.groupHasActiveGame'), backKeyboard(ctx));
  } else {
    returnMessage(ctx, i18n.t('checkGameCode.enter'), backKeyboard(ctx));

    // When the waiting time is over
    scene.options.ttl = 20;
    return setTimeout(() => returnMessage(ctx, i18n.t('checkGameCode.timeOver')), scene.ttl * 1000);
  }
});

// Listen to the code of the game
scene.on('message', async ctx => {
  const msgContent = ctx.message.text;
  try {
    // Check if it's a valid game code
    if (validateGameCode(msgContent)) {
      // Check if a game code is not used
      const gameData = await Game.findOne({ gameCode: msgContent });
      if (gameData) {
        throw new Error('errors.gameCodeIsUsing');
      }

      ctx.group.gameCode = msgContent;
      ctx.scene.enter('checkRegion');
    } else {
      throw new Error('errors.unknown');
    }
  } catch (err) {
    returnMessage(ctx, ctx.i18n.t(err.message, { errCode: 1, msgContent }));
  }
});

// Valid chars in a V2 (6-character) Among Us lobby code.
const V2 = 'QWXRTYLPESDFGHUJKZOCVBINMA';

function validateGameCode(code) {
  code = code.trim().toUpperCase();
  if (code.length !== 6) {
    throw new Error('errors.invalidCode.sixLetters');
  }

  if ([...code].some(x => !V2.includes(x))) {
    throw new Error('errors.invalidCode.characters');
  }

  return true;
}

export default scene;
