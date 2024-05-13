"use server"

import subRedis from 'ioredis'
async function sub(){
    const roomId = "my-channel"
    const redisSubscriber = new subRedis("https://exact-fish-38626.upstash.io")
    redisSubscriber.options.port=2083
    redisSubscriber.status="ready"
    if(redisSubscriber.status=='ready')
      {
        await redisSubscriber.subscribe(roomId, (err) => {
            if (err) console.log(err)
          })
          redisSubscriber.on('message', (channel, message) => {
            if (channel === roomId) console.log("hahahahha",message)
          })
      }

}

export default sub