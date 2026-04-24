import type { EventData, Talk } from "../types/event.types.js";
import * as crypto from 'crypto';

interface CanonicalTalk {
  title: string;
  name: string;
}

interface CanonicalEvent {
  title: string;
  subtitle: string;
  date: string;
  address: string;
  city: string;
  media: string;
  talks: CanonicalTalk[];
}


export function normalizeEventData(query: EventData): CanonicalEvent{
  let talksArray: Talk[] = [];

  if (query.talks) {
    try {
      talksArray = typeof query.talks === 'string' 
        ? JSON.parse(query.talks) 
        : query.talks;
    } catch (_e) {
      talksArray = [];
    }
  }

  const normalizedTalks: CanonicalTalk[] = talksArray
    .map((t: Talk) => ({
      title: String(t?.title ?? "").trim().toLowerCase(),
      name: String(t?.name ?? "").trim().toLowerCase(),
    }))
    .filter(t => t.title !== "" || t.name !== "")
    .sort((a, b) => a.title.localeCompare(b.title) || a.name.localeCompare(b.name));

  const canonical: CanonicalEvent = {
    title: (query.title ?? "").trim().toLowerCase(),
    subtitle: (query.subtitle ?? "").trim().toLowerCase(),
    date: (query.date ?? "").trim().toLowerCase(),
    address: (query.address ?? "").trim().toLowerCase(),
    city: (query.city ?? "").trim().toLowerCase(),
    media: (query.media || "instagram").trim().toLowerCase(),
    talks: normalizedTalks
  }

  return canonical;
}

export function buildImageHash(objCanonical: CanonicalEvent){
  const objJSON = JSON.stringify(objCanonical);

  return crypto.createHash('sha256').update(objJSON).digest('hex');
}