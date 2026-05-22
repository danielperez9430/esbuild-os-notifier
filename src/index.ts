import { fileURLToPath } from 'url'
import notifier from 'node-notifier'
import { omit, get } from './utils/utils.js'
import deepmerge from 'deepmerge'
import path from 'path'

import type NotificationCenter from 'node-notifier'
import type { BuildResult, PluginBuild, Message } from 'esbuild'

export type ShowOptions = {
    warnings?: boolean
    errors?: boolean
    success?: boolean
}

const logo = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'assets',
    'esbuild_logo.png'
)

export default function esbuildOsNotifier(notificationOptions: NotificationCenter.Notification = {}, show: ShowOptions = {}) {
    return {
        name: 'esbuild-build-os-notifications',
        setup(build: PluginBuild) {

            const display: ShowOptions = deepmerge({
                warnings: true,
                errors: true,
                success: true,
            } satisfies ShowOptions, show)

            let start = 0

            build.onStart(() => {
                start = Date.now()
            });

            build.onEnd((res: BuildResult) => {
                const { errors, warnings } = res
                const totalBuildTime = Date.now() - start


                if (errors && errors.length > 0 && display.errors) {
                    const message = `Build failed with ${errors.length} errors and ${warnings.length} warnings\nBuild in ${totalBuildTime}ms`

                    sendMessage(message, deepmerge({
                        title: 'Esbuild - Info'
                    }, omit(notificationOptions, ['message', 'title'])))

                    errors.forEach((error) => {
                        const message = parseBuildMessage(error)

                        sendMessage(message, deepmerge({
                            title: 'Esbuild - Error'
                        }, omit(notificationOptions, ['message', 'title'])))
                    })
                }

                if (warnings && warnings.length > 0 && display.warnings) {
                    warnings.forEach((warning) => {
                        const message = parseBuildMessage(warning)

                        sendMessage(message, deepmerge({
                            title: 'Esbuild - Warning',
                        }, omit(notificationOptions, ['message', 'title'])))
                    })
                }

                if ((!errors || errors?.length === 0) && display.success) {
                    sendMessage("✅ Build successfull!", deepmerge({
                        title: 'Esbuild',
                        timeout: 5
                    }, notificationOptions))
                }
            })
        }
    }
}

function parseBuildMessage(msg: Message) {
    let message = `${get(msg, "location.file", "No file Location")}, (${get(msg, "location.line", "")}:`

    message += `${get(msg, "location.column", "")})\n${get(msg, "location.lineText", "No error text")}`

    return message
}

function sendMessage(message: string, options: NotificationCenter.Notification) {
    notifier.notify(deepmerge({
        appId: 'esbuild-os-notifier',
        title: 'Esbuild',
        message,
        hint: process.platform === 'linux' ? 'int:transient:1' : undefined,
        contentImage: logo,
    }, options));
}
