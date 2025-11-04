import { parseTalks } from './utils.js';
import type { EventData } from './types.js';

export function parseEventData(query: Record<string, unknown>): EventData {
  return {
    title: String(query.title || ""),
    subtitle: String(query.subtitle || ""),
    date: String(query.date || ""),
    address: String(query.address || ""),
    city: String(query.city || ""),
    media: String(query.media || "instagram"),
    talks: parseTalks(query.talks),
  };
}
