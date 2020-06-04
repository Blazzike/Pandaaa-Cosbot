const { client } = require('../shard');

module.exports = {
    name: 'MentionReply',
    enable() {
    },
    message(msg) {

        let QNAs = [
            {
                'q': 'Hi {mention}',
                'a': 'Hey {author}!'
            },
            {
                'q': 'Hey {mention}',
                'a': 'Hello {author}.'
            },
            {
                'q': 'Hello {mention}',
                'a': 'Hi {author}'
            }
        ];

        if(msg.content.includes(`${client.user}`)) {

            let toCheck = msg.conent.split(`${client.user}`).join('{mention}');

            for(let i = 0; i < QNAs.length; i++) {
                if(QNAs[i].q === toCheck) {

                    let toSend = QNAs[i].a.split('{author}').join(`${msg.author}`);
                    return msg.channel.send(toSend);

                }
            }

        }
    }
};