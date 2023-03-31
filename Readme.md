# Amadeus Discord Bot

Amadeus is a Discord bot that can provide users with various commands, including gifme, help, quoteoftheday, and whoareyou. It also uses OpenAI's GPT to respond to users with specific roles in specific servers listed in the config.json file.

## Usage

To use Amadeus you can use the following commands:

- /gifme: Returns a random GIF based on the anime Steins;Gate and Steins;Gate 0.
- /help: Displays a list of available commands and their descriptions.
- /quoteoftheday: Returns a random quote of the day.
- /whoareyou: Returns a description of what Amadeus is and what it can do.
  > To interact with the bot using OpenAI's GPT, you must have the correct role assigned to your user in the specific server listed in the config.json file, and mention the bot in the chat for it to reply back.

## Installation

If you wish to run Amadeus locally, follow these steps:

1. Clone the repository: git clone https://github.com/SteamPunkNation/Discord-Bot-Amadeus.git
2. Install dependencies: npm install
3. Set up your config.json file with your Discord bot token, OpenAI API key, and other configuration options.
   > Note the original config.json file does not exist, you must rename temp-config.json to config.json and replace the values needed.
4. Run the bot: npm run start
   > You must leave the console running in order to keep the bot online.

## Configuration

The config.json file contains the following options:

- token: Your Discord bot token.
- openaiKey: Your OpenAI API key.
- system: The prefix for system messages logged by the bot.
- guildId: The ID of the server in which the bot will listen for chat input.
- allowedRoles: An array of roles that are allowed to use the GPT feature.

## Credits

Amadeus was created by [SteamPunkNation](https://github.com/SteamPunkNation> "Github") using the [Discord.js](https://discord.js.org/ "Discord.js") library and OpenAI's [GPT-3 ](https://openai.com/ "Chat GPT") API.

## License

Amadeus is licensed under the [MIT License](https://github.com/SteamPunkNation/Discord-Bot-Amadeus/blob/main/LICENSE "MIT License").
