import { Logger } from 'tslog'

/**
 * Instancia principal del log
 */
export const logInstance: Logger = new Logger({
  dateTimeTimezone: 'America/Argentina/Buenos_Aires'
})

/**
 * Chilid instance del log
 * @param prefix Prefix para diferencia el log del resto. Por ejemplo el nombre del Queue
 */
export function logger (prefix: string): Logger {
  return logInstance.getChildLogger({
    prefix: [prefix]
  })
}
