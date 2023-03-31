// Import modules
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { token, guildId, openaiKey, botPrompt, system, allowedRoles } = require('./config.json');

// Set up the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Handle chat input commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		const content = system + 'There was an error while executing this command!';
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content, ephemeral: true });
		}
		else {
			await interaction.reply({ content, ephemeral: true });
		}
	}
});

// Handle messages from users
client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;

	if (guildId != message.guildId) {
		return message.reply(`Sorry ${message.author} You do not have permission to talk to me in this server.`);
	}

	const serverRoles = message.member.roles.cache.map((role) => role.name);
	if (!serverRoles.some((role) => allowedRoles.includes(role))) {
		return message.reply(`Sorry ${message.author} You do not have permission to talk to me.`);
	}

	const input = message.content.slice(`<@!${client.user.id}>`.length).trim();
	if (!input) return;

	console.log(system + `Received mention from ${message.author.username}: ${input}`);

	const configuration = new Configuration({ apiKey: openaiKey });
	const openai = new OpenAIApi(configuration);

	try {
		const output = await generateResponse(openai, `${botPrompt}:${input.trim()}`);
		message.channel.send(output);
	}
	catch (error) {
		console.log(error);
		message.reply('An error occurred while processing your message. Please try again later.');
	}
});

// Generate AI response
async function generateResponse(openai, prompt) {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt,
		temperature: 0.7,
		max_tokens: 100,
		top_p: 1.0,
		frequency_penalty: 0.5,
		presence_penalty: 0,
	});

	const output = response.data.choices[0].text.trim();
	return output;

}

// Output to console that bot is online.
client.login(token)
	.then(() => {
		console.log(system + `Logged in as ${client.user.tag}`);
		console.log(system + 'Now online!');
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});