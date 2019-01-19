#!/usr/bin/env node

import * as yargs from 'yargs'
import { RocketChatWebhook } from '../RocketChatWebhook'
import { OptionsInterface } from '../interfaces/OptionsInterface'

const options: OptionsInterface = yargs
    .option('title', { alias: 'e', description: 'Message title', type: 'string' })
    .option('link', { alias: 'l', description: 'Title link', type: 'string' })
    .option('emoji', { alias: 'e', description: 'Avatar emoji', type: 'string' })
    .option('image', { alias: 'i', description: 'Image', type: 'string' })
    .option('webhook', { alias: 'w', description: 'Webhook url', type: 'string' })
    .option('message', { alias: 'm', description: 'Main text body', type: 'string' })
    .option('text', { alias: 't', description: 'Attachment text body', type: 'string' })
    .option('channel', { alias: 'c', description: '#channel-name or @username', type: 'string' })
    .option('fields', { alias: 'f', description: 'Fields in YAML format', type: 'string' })
    .option('username', { alias: 'u', description: 'Username who post the message', type: 'string' })
    .option('color', { alias: 'u', description: 'Notification color', type: 'string' })
    .help('help', 'Show help')
    .alias('help', 'h')
    .argv

const instance = new RocketChatWebhook()

instance.dispatch(options)
    .then(() => process.exit(0))
    .catch(({ body }) => {

        try {

            console.error('RocketChatWebhook:', JSON.parse(body).error)

        } catch (error) {

            console.log('RocketChatWebhook:', error)

        }

        process.exit(1)

    })
