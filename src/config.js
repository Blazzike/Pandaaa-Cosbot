module.exports = {
    name: 'Cosbot',
    prefix: 'c!',
    color: 0xE91E63,
    token: process.env.TOKEN,
    shards: 'auto',
    youtube_api_token: process.env.YOUTUBE_API_TOKEN,
    plugins: [
        'Activity',
        'Commands',
        'commands/help',
        'commands/ping',
        'commands/upload',
        'Console',
        'consoleCommands/PluginsConsoleCommand',
        'consoleCommands/SayConsoleCommand',
        'consoleCommands/ReloadConsoleCommand',
        'UpdateMessage',
        'YouTubeUploads',
    ]
};