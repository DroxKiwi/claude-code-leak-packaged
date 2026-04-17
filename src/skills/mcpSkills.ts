import type { Command } from '../commands.js'
import type { MCPServerConnection } from '../services/mcp/types.js'
import { memoizeWithLRU } from '../utils/memoize.js'

const MCP_FETCH_CACHE_SIZE = 20

/** Stub MCP skills — retourne une liste vide tout en exposant le même contrat memoïsé que le client MCP. */
export const fetchMcpSkillsForClient = memoizeWithLRU(
	async (_client: MCPServerConnection): Promise<Command[]> => [],
	(client: MCPServerConnection) => client.name,
	MCP_FETCH_CACHE_SIZE,
)
