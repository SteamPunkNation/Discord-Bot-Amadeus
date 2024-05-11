require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');


// Local files
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

client.commands = new Collection();
// ========================================================//
function initCommands() {
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			}
			else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}
// ========================================================//
async function commandInteraction(interaction) {
	// If interaction is not command, do nothing
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	// If command doesn't exist, write to console and do nothing
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		// Report error to console
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}
// ========================================================//
const status = [
	{
		name: 'bot development',
		type: ActivityType.Streaming,
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	},
	{
		name: ' in the sandbox',
		// Type is Playing
	},
	{
		name: ' youtube tutorials',
		type: ActivityType.Watching,
	},
	{
		name: ' sweet nothings',
		type: ActivityType.Listening,
	},
];

// Init commands
initCommands();

// On command interaction
client.on(Events.InteractionCreate, interaction => {
	commandInteraction(interaction);
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`✅ Logged in as ${readyClient.user.tag}`);
	let rand = Math.floor(Math.random() * status.length);
	client.user.setActivity(status[rand]);

	setInterval(() => {
		rand = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[rand]);
	}, 3600000);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);