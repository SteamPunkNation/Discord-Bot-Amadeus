const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const system = '(Amadeus System) ';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Output to console that bot is online.
client.once(Events.ClientReady, () => {
	console.log(system + `Logged in as ${client.user.tag}`);
	console.log(system + 'Now online!');
});

// Check if latest message is a command.
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	// Execute command if errors catch case.
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: system + 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: system + 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Check if message from user (NOT BOTS) contains Amadeus mention, if so reply back to user with same message.
client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;

	if (message.mentions.has(client.user)) {
		console.log(system + `Received mention from ${message.author.username}: ${message.content}`);
		message.reply(`Hi ${message.author} I am Amadeus. You said ${message.content}`);
	}
});

client.login(token);