export const db_path = (process.env.NODE_ENV === 'production') ? "/birthdaybot-data/birthdaybot.db":"data/birthdaybot.db";
export const discordConfig_path = (process.env.NODE_ENV === 'production') ? "/birthdaybot-data/discord-config.json":"data/discord-config.json";
export const messages_path = (process.env.NODE_ENV === 'production') ? "/birthdaybot-data/messages.json":"data/messages.json";