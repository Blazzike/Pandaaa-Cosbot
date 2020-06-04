module.exports = {
    name: 'Cosbot',
    prefix: 'c!',
    color: 0xE91E63,
    token: process.env.TOKEN,
    shards: 'auto',
    youtube_api_token: process.env.YOUTUBE_API_TOKEN,
    youtube_uploads: {
        guild: '472885726275436556',
        channel: '472885726984536065',
        role: '718069501119168603'
    },
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
        'jake',
        'MentionRelply',
        'UpdateMessage',
        'YouTubeUploads',
    ]
};