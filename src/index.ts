#!/usr/bin/env node

import { argv } from 'yargs'
if (argv.env) {
  process.env.NODE_ENV = argv.env as string
}
import path from 'path'
import {config} from 'node-config-ts'
import http from 'http'
import {logger} from './utils/log'
import httpApp from './routes'
import banner from './utils/banner'

const HOST = config.http.host
const PORT = config.http.port

const log = logger('INDEX')

function onServerListening() {
  log.info(banner(process.env.NODE_ENV as string, HOST, PORT))
}

async function onError(err: Error) {
  log.error(err)
  process.exit(0)
}

async function start() {
  const server = http.createServer(httpApp)
  server.on('error', onError)
  server.on('listening', onServerListening)
  server.listen(PORT, HOST)
}

start()

process.on('uncaughtException', err => {
  log.error('UNCAUGHT EXCEPTION', err)
  log.fatal(err.stack || err.message)
})

process.on('unhandledRejection', (reason, p) => {
  log.fatal('Unhandled Rejection at: \nPROMISE', p, '\nREASON:', reason)
})

process.on('exit', code => {
  if (code != 0) {
    log.fatal('onExit code', code)
  }
})
