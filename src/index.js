import {} from 'dotenv/config.js';

import { resolve, dirname } from 'path';
import cachegoose from 'cachegoose';
import mongoose from 'mongoose';
import Telegraf from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';
import LocalSession from 'telegraf-session-local';

import { startCommand } from './handlers/index.js';
import { registerUser, onlyGroups, onlyGroupAdmins } from './middlewares/index.js';

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

bot.use(new LocalSession({ database: 'temp/sessions.json' }).middleware('group'));
bot.use(i18n.middleware());
bot.use(registerUser);

bot.command('start', onlyGroups, startCommand);

bot.startPolling();

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
