import Telegraf from 'telegraf';

const { Markup } = Telegraf;

export function getBackKeyboard(ctx) {
  return Markup.keyboard([ctx.i18n.t('keys.back')])
    .resize()
    .extra();
}

export function mainKeyboard(ctx) {
  return Markup.keyboard([[ctx.i18n.t('keys.newGame')]])
    .resize()
    .extra();
}
