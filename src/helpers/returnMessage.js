import Telegraf from 'telegraf';
const { Extra } = Telegraf;

export default (ctx, message, markup = Extra.HTML()) => {
  if (ctx.updateType === 'callback_query') {
    ctx.editMessageText(message, markup);
  } else {
    ctx.replyWithHTML(message, markup);
  }
};
