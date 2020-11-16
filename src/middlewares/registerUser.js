import User from '../models/User.js';

export default async (ctx, next) => {
  // Find user in DB
  const authorID = ctx.update.message ? ctx.update.message.from.id : ctx.update.callback_query.from.id;
  ctx.userData = await User.findOne({ id: authorID });

  // If there's no user, create it
  if (!ctx.userData) {
    ctx.userData = await User.create({ id: authorID });
  }

  // Update user's last activity time
  await User.findOneAndUpdate({ id: authorID }, { lastUpdated: Date.now() });
  next();
};
