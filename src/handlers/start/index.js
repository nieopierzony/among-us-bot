export default async ({ i18n, message, replyWithHTML }) => {
  try {
    replyWithHTML('<b>Привет!</b>');
  } catch (err) {
    await replyWithHTML(i18n.t('errors.unknown'));
    console.error(
      `[%s] Произошла ошибка при использовании команды start. | UserID: %d`,
      new Date().toTimeString(),
      message.from.id,
      err,
    );
  }
};
