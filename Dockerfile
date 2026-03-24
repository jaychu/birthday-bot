# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/


FROM node:20-bookworm-slim
WORKDIR /birthdaybot
COPY package*.json ./


RUN apt-get update
RUN apt-get install -y sqlite3

# Force install EVERYTHING (including typescript/tsc)
RUN npm install
# Copy the rest of the source files into the image.
COPY . .
RUN npm run build

RUN if [ ! -d /birthdaybot-data ]; then \
      mkdir -p /birthdaybot-data && echo "Created missing /birthdaybot-data folder"; \
    fi

RUN mv data/messages.json /birthdaybot-data/messages.json;

RUN if [ ! -f /birthdaybot-data/discord_token.txt ]; then \
      echo "XXX" > /birthdaybot-data/discord_token.txt && echo "Created missing discord token text file, need to update with correct token"; \
    else \
      echo "Discord token text file found!"; \
    fi


RUN [ -f /birthdaybot-data/discord-config.json ] echo "Existing config found!" || echo <<EOF > /birthdaybot-data/discord-config.json
{
    "GUILD_ID":"XXX",
    "CHANNEL_ID":"XXX",
    "ROLE_ID":"XXX",
    "TIMEZONE": "America/Toronto"
}
EOF

#RUN chown -R node:node /birthdaybot-data
# Use production node environment by default.
ENV NODE_ENV production
# Run the application as a non-root user.
#USER node

# Run the application.
CMD npm start