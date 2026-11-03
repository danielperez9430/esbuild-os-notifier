import { fileURLToPath } from 'url'
import notifier from 'node-notifier'
import { omit, get } from './utils/utils.js'
import path from 'path'

import type NotificationCenter from 'node-notifier/notifiers/notificationcenter'
import type NotifySend from 'node-notifier/notifiers/notifysend'
import type WindowsToaster from 'node-notifier/notifiers/toaster'
import type { BuildResult, PluginBuild, Message } from 'esbuild'

// What node-notifier accepts on macOS, Linux and Windows, so the options the
// README shows (contentImage, sound, timeout) type-check.
export type NotificationOptions = NotificationCenter.Notification &
    NotifySend.Notification &
    WindowsToaster.Notification & { appId?: string }

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

export default function esbuildOsNotifier(notificationOptions: NotificationOptions = {}, show: ShowOptions = {}) {
    return {
        name: 'esbuild-build-os-notifications',
        setup(build: PluginBuild) {

            const display: ShowOptions = {
                warnings: true,
                errors: true,
                success: true,
                ...show,
            }

            let start = 0

            build.onStart(() => {
                start = Date.now()
            });

            build.onEnd((res: BuildResult) => {
                const { errors, warnings } = res
                const totalBuildTime = Date.now() - start


                if (errors && errors.length > 0 && display.errors) {
                    const message = `Build failed with ${errors.length} errors and ${warnings?.length ?? 0} warnings\nBuild in ${totalBuildTime}ms`

                    sendMessage(message, {
                        title: 'Esbuild - Info',
                        ...omit(notificationOptions, ['message', 'title']),
                    })

                    errors.forEach((error) => {
                        const message = parseBuildMessage(error)

                        sendMessage(message, {
                            title: 'Esbuild - Error',
                            ...omit(notificationOptions, ['message', 'title']),
                        })
                    })
                }

                if (warnings && warnings.length > 0 && display.warnings) {
                    warnings.forEach((warning) => {
                        const message = parseBuildMessage(warning)

                        sendMessage(message, {
                            title: 'Esbuild - Warning',
                            ...omit(notificationOptions, ['message', 'title']),
                        })
                    })
                }

                if ((!errors || errors.length === 0) && display.success) {
                    sendMessage("✅ Build successful!", {
                        title: 'Esbuild',
                        timeout: 5,
                        ...notificationOptions,
                    })
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

function sendMessage(message: string, options: NotificationOptions) {
    notifier.notify({
        appId: 'esbuild-os-notifier',
        title: 'Esbuild',
        message,
        hint: process.platform === 'linux' ? 'int:transient:1' : undefined,
        contentImage: logo,
        ...options,
    });
}
