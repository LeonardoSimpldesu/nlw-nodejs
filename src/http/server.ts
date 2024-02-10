// docker compose up -d
// npm run dev
// npx prisma studio --port 3535
// npx prisma migrate dev

import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-results'

const app = fastify()

app.register(cookie, {
    secret: "polls-app-nlw",
    hook: 'onRequest',
    parseOptions: {}
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

app.listen({port: 3333}).then(()=>{
    console.log("HTTP server running!")
})

