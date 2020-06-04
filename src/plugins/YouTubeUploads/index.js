const { client } = require('../../shard');
const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config');
const fetch = require('request');
const fz = require('../util/fillZeros');

module.exports = {
    name: 'YouTubeUploads',
    enable() {
        function checkVideos() {
            console.log('checking videos...');

            let latestVideoFile = `${__dirname}/latestVideo.json`;

            if(!fs.existsSync(latestVideoFile)) {
                fs.appendFileSync(latestVideoFile, '""');
            }

            let latestVideo = JSON.parse(fs.readFileSync(latestVideoFile, 'utf8'));
            let latestVideoDate = new Date(latestVideo);

            if (latestVideoDate.getDay() === new Date().getDay()) {
                return;
            }

            let urlParams = [
                {'name': 'part', 'value': 'snippet'},
                {'name': 'channelId', 'value': 'UCGPLYAkTyKtG5zEmgL8aN7Q'},
                {'name': 'maxResults', 'value': '1'},
                {'name': 'order', 'value': 'date'},
                {'name': 'type', 'value': 'video'},
                {'name': 'key', 'value': config.youtube_api_token}
            ];

            let url = `https://www.googleapis.com/youtube/v3/search`;
            for (let i = 0; i < urlParams.length; i++) {
                url += `${i === 0 ? '?' : '&'}${urlParams[i].name}=${urlParams[i].value}`;
            }

            fetch.get(url, function(err, resp, body) {
                if (err) {
                    return console.error(`newVid: ${err}`);
                }

                let bodyObj = JSON.parse(body);
                if (!bodyObj || bodyObj.error || bodyObj.items === undefined || bodyObj.items === []) {
                    return;
                }

                const video = bodyObj.items[0];
                function thumbnail(videoID, callback) {
                    let url = `https://i.ytimg.com/vi/${videoID}/maxresdefault.jpg`;
                    return fetch.get(url, function(err, res, data) {
                        if (!err) {
                            return callback(url);
                        } else {
                            return callback(`https://i.ytimg.com/vi/${videoID}/mqdefault.jpg`);
                        }
                    });
                }

                function timestamp(inpDate) {
                    let times = {
                        'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    };
                    let d = new Date(inpDate);
                    return `${times.days[d.getUTCDay()]} ${times.months[d.getUTCMonth()]} ${d.getUTCDate()}, ${fz(d.getUTCHours())}:${fz(d.getUTCMinutes())} UTC`;
                }

                thumbnail(video.id.videoId, function(thumbnailUrl) {

                    let newVidEmbed = new Discord.RichEmbed()
                        .setColor(0xBC1515)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/572464268839092224/674602378649010196/TrapCosmos_medium.jpg`)
                        .setImage(thumbnailUrl)
                        .setAuthor(`Trap Cosmos`, '', 'https://www.youtube.com/channel/UCGPLYAkTyKtG5zEmgL8aN7Q')
                        .setTitle(`${video.snippet.title}`.replace(/&amp;/g, '&'))
                        .addField(`:arrow_forward: https://youtu.be/${video.id.videoId}`, `** **`)
                        .setFooter(`Uploaded: ${timestamp(video.snippet.publishedAt)}`);

                    if (video.snippet.publishedAt !== latestVideo) {

                        let guild = client.guilds.get('472885726275436556');
                        let channel = guild.channels.get('472885726984536065');
                        let role = guild.roles.get('718069501119168603');

                        if(channel) {
                            channel.send(role, newVidEmbed);
                            fs.writeFileSync(`${__dirname}/latestVideo.json`, JSON.stringify(video.snippet.publishedAt));
                            console.log('latest upload posted!');
                        }
                    }

                });
            });
        }

        checkVideos();

        let schedule = [
            '17:00:45', '17:15:00', '17:30:00', '17:45:00',
            '18:00:45', '18:15:00', '18:30:00', '18:45:00',
            '19:00:45', '19:15:00', '19:30:00', '19:45:00',
            '20:00:45', '20:30:00', '21:00:00', '21:30:00',
            '22:00:45', '22:30:00', '23:00:00', '23:30:00',
            '00:00:45', '00:30:00', '01:00:00', '01:30:00',
            '02:00:45', '02:30:00', '03:00:00', '03:30:00',
        ];

        function pad(number, size) {
            let s = String(number);
            while (s.length < (size || 2)) {s = '0' + s}
            return s;
        }

        setInterval(function() {
            let d = new Date();
            let date = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
            for(let i = 0; i < schedule.length; i++) {
                if (schedule[i] === date) {
                    return checkVideos();
                }
            }
        }, 1000);
    }
};