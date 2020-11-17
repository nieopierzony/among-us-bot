import {} from 'dotenv/config.js';

import { resolve, dirname } from 'path';
import cachegoose from 'cachegoose';
import mongoose from 'mongoose';
import Telegraf from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

import { onlyGroups, registerUser } from './middlewares/index.js';
import { startScene, checkGameCode, checkRegion } from './scenes/index.js';

const { BOT_TOKEN, DB_URL } = process.env;
const bot = new Telegraf(BOT_TOKEN);
const i18n = new TelegrafI18n({
  useSession: true,
  defaultLanguage: 'ru',
  directory: resolve(dirname(process.argv[1]), 'locales'),
  templateData: {
    pluralize: TelegrafI18n.pluralize,
  },
});

const { Stage, session } = Telegraf;
const stage = new Stage([startScene, checkGameCode, checkRegion]);

bot.use(session({ ttl: 60 * 5 }));
bot.use(
  session({
    property: 'group',
    getSessionKey: ctx => {
      if (ctx.from && ctx.chat && ['supergroup', 'group'].includes(ctx.chat.type)) {
        return `${ctx.chat.id}`;
      }
      return null;
    },
    ttl: 60 * 5,
  }),
);

bot.use(i18n.middleware());
bot.use(stage.middleware());
bot.use(registerUser);

bot.start(({ scene }) => scene.enter('start'));
bot.command(onlyGroups, ({ scene }) => scene.enter('start'));
bot.on('message', ({ scene }) => scene.enter('start'));

bot.startPolling();
bot.launch();

cachegoose(mongoose);
mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  err => {
    if (err) throw err;
    console.log('[Database] Mongo database was successfully connected.');
  },
);
