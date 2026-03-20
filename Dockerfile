# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7
FROM node:24.14.0-alpine
WORKDIR /birthdaybot
COPY package*.json ./

# Force install EVERYTHING (including typescript/tsc)
RUN npm install
# Copy the rest of the source files into the image.
COPY . .
RUN npm run build

RUN if [ ! -d /birthdaybot-config ]; then \
      mkdir -p /birthdaybot-config && echo "Created missing /birthdaybot-config folder"; \
    fi

RUN mv data/messages.json /birthdaybot-config;

RUN if [ ! -f /birthdaybot-config/discord_token.txt ]; then \
      echo "XXX" > /birthdaybot-config/discord_token.txt && echo "Created missing discord token text file, need to update with correct token"; \
    else \
      echo "Discord token text file found!"; \
    fi


RUN [ -f /birthdaybot-config/discord-config.json ] echo "Existing config found!" || echo <<EOF > /birthdaybot-config/discord-config.json
{
    "GUILD_ID":"XXX",
    "CHANNEL_ID":"XXX",
    "ROLE_ID":"XXX",
    "TIMEZONE": "America/Toronto"
}
EOF

RUN [ -f /birthdaybot-config/db-config.json ] echo "Existing config found!" || echo <<EOF > /birthdaybot-config/db-config.json
{
    "USERNAME":"xxx",
    "HOST":"xxx",
    "DATABASE":"xxx",
    "PASSWORD":"xxx",
    "PORT":"xxx"
}
EOF

RUN chown -R node:node /birthdaybot-config
# Use production node environment by default.
ENV NODE_ENV production
# Run the application as a non-root user.
USER node

# Run the application.
CMD npm start