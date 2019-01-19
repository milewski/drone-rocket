import * as got from 'got'
import { OptionsInterface } from './interfaces/OptionsInterface'
import { FieldInterface, FieldInterfaceWithWhenCondition } from './interfaces/FieldInterface'

type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] }

export class RocketChatWebhook {

    private defaults: Partial<OptionsInterface> = {
        emoji: process.env.PLUGIN_EMOJI,
        title: process.env.PLUGIN_TITLE,
        link: process.env.PLUGIN_LINK,
        text: process.env.PLUGIN_TEXT,
        message: process.env.PLUGIN_MESSAGE,
        image: process.env.PLUGIN_IMAGE,
        color: process.env.PLUGIN_COLOR,
        username: process.env.PLUGIN_USERNAME,
        webhook: process.env.PLUGIN_WEBHOOK,
        channel: process.env.PLUGIN_CHANNEL,
        fields: process.env.PLUGIN_FIELDS
    }

    public dispatch(settings: OptionsInterface): got.GotPromise<any> {

        const { fields, ...options } = { ...this.defaults, ...settings }

        for (const property in options) {

            options[ property ] = this.parseWhenCondition(options[ property ])

        }

        return got.post(options.webhook, {
            body: JSON.stringify({
                emoji: options.emoji,
                username: options.username,
                channel: options.channel,
                text: options.message,
                attachments: [
                    {
                        title: options.title,
                        title_link: options.link,
                        text: options.text,
                        image_url: options.image,
                        color: options.color,
                        fields: this.parseFields(fields)
                    }
                ]
            })
        })

    }

    private parseWhenCondition(jsonString: string): string | null {

        try {

            const fields = JSON.parse(jsonString) as Omit<FieldInterfaceWithWhenCondition, 'title'>[]
            const result = fields.find(({ when }) => this.testWhenCondition(when))

            if (result) {

                return result.value

            }

            return null

        } catch {

            return jsonString

        }

    }

    private parseFields(jsonString: string): FieldInterface[] {

        try {

            const fields = JSON.parse(jsonString) as FieldInterfaceWithWhenCondition[]
            const result = fields.map(({ when, title, value }) => {

                if (this.testWhenCondition(when)) {

                    return { title, value }

                }

            })

            return result.filter(Boolean)

        } catch {

            return []

        }

    }

    private testWhenCondition(when: undefined | Record<string, string | string[]>): boolean {

        if (when === undefined) {

            return true

        }

        for (const property in when) {

            const conditionalValue = this.wrap(when[ property ])

            if (conditionalValue.some(value => process.env[ property ] == value || property == value)) {

                return true

            }

        }

        return false

    }

    private wrap<T>(object: T | T[]): T[] {

        return Array.isArray(object) ? object : [ object ]

    }

}
