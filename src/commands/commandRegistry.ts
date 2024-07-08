import { handlePing } from './ping.js'
import { handleEcho } from './echo.js'
import { handleSet } from './set.js'
import { handleGet } from './get.js'
import { RedisStore } from '../services/RedisStore.js'
import { handleExists } from './exists.js'
import { handleDelete } from './del.js'

export const commandRegistry = {
  PING: handlePing,
  ECHO: handleEcho,
  SET: handleSet,
  GET: handleGet,
  EXISTS: handleExists,
  DEL: handleDelete,
} as Record<string, (args: string[], store: RedisStore) => string>
