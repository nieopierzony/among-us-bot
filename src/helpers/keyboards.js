import Telegraf from 'telegraf';

const { Extra } = Telegraf;

export function backKeyboard(ctx) {
  return Extra.HTML().markup(m => m.inlineKeyboard([m.callbackButton(ctx.i18n.t('keys.back'), 'back')]));
}

export function regionsKeyboard(ctx) {
  return Extra.HTML().markup(m =>
    m.inlineKeyboard([
      [
        m.callbackButton(ctx.i18n.t('keys.regions.europe'), 'region::EU'),
        m.callbackButton(ctx.i18n.t('keys.regions.america'), 'region::NA'),
      ],
      [m.callbackButton(ctx.i18n.t('keys.regions.asia'), 'region::AS')],
    ]),
  );
}

export function mainKeyboard(ctx) {
  return Extra.HTML().markup(m =>
    m.inlineKeyboard([m.callbackButton(ctx.i18n.t('keys.newGame'), 'new_game')]),
  );
}
