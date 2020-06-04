module.exports = {
    name: 'Cosbot',
    prefix: 'c!',
    token: process.env.TOKEN,
    shards: 'auto',
    youtube_api_token: process.env.YOUTUBE_API_TOKEN,
    plugins: [
        // Normal
        'Activity',
        'Commands',
        'commands/help',
        'commands/ping',
        'Console',
        'consoleCommands/PluginsConsoleCommand',
        'consoleCommands/SayConsoleCommand',
        'consoleCommands/ReloadConsoleCommand',
        // Own
        'YouTubeUploads',
    ]
};