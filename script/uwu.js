const {
	BotFrameworkAdapter,
	MemoryStorage,
	ConversationState,
	UserState,
} = require('botbuilder');
const { RestifyAdapter } = require('botbuilder-adapter-restify');

const adapter = new BotFrameworkAdapter({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

const storage = new MemoryStorage();
const conversationState = new ConversationState(storage);
const userState = new UserState(storage);

adapter.use(conversationState, userState);

adapter.onTurnError = async (context, error) => {
	console.error(`\n [onTurnError]: ${error}`);
	await context.sendActivity(`Oops! Something went wrong.`);
};

adapter.processActivity(async (context) => {
	if (context.activity.type === 'message') {
		const userMessage = context.activity.text;

		// Add your conversational logic here to generate a response based on userMessage

		await context.sendActivity('Hello, I am your conversational bot!'); // Replace this with your response logic
	}
});

const server = restify.createServer();
server.listen(3978, () => {
	console.log(`${server.name} listening to ${server.url}`);
});

server.post('/api/messages', (req, res) => {
	adapter.processActivity(req, res, async (context) => {
		await bot.run(context);
	});
});
