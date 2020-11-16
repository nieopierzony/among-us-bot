export default (ctx, next) => {
  if (!['supergroup', 'group'].includes(ctx.chat.type)) {
    return ctx.replyWithHTML(ctx.i18n.t('errors.onlyGroups'));
  } else {
    return next();
  }
};
