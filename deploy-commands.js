const { REST, Routes } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => path.extname(file) === '.js');

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Use Promise.all to deploy all commands simultaneously
		const results = await Promise.all([
			rest.put(Routes.applicationCommands(clientId), { body: commands }),
			// Use guild commands instead if you're developing on a guild-specific application
			// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }),
		]);

		console.log(`Successfully reloaded ${results.flat().length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
