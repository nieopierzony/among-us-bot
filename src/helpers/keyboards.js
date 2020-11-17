import Telegraf from 'telegraf';

const { Markup, Extra } = Telegraf;

export function backKeyboard(ctx) {
  return Markup.keyboard([ctx.i18n.t('keys.back')])
    .resize()
    .extra();
}

export function regionsKeyboard(ctx) {
  return Extra.HTML().markup(m =>
    m.inlineKeyboard(
      [
        [
          m.callbackButton(ctx.i18n.t('keys.regions.europe'), 'region::eu'),
          m.callbackButton(ctx.i18n.t('keys.regions.america'), 'region::na'),
        ],
        [m.callbackButton(ctx.i18n.t('keys.regions.asia'), 'region::as')],
      ],
      {},
    ),
  );
}

export function mainKeyboard(ctx) {
  return Markup.keyboard([[ctx.i18n.t('keys.newGame')]])
    .resize()
    .extra();
}
