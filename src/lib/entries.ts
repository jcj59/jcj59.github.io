import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';

export type Entry = CollectionEntry<keyof DataEntryMap>;

/** Published entries of a section, in display order. */
export async function getEntries(section: string): Promise<Entry[]> {
  const all = (await getCollection(section as keyof DataEntryMap)) as Entry[];
  return all.filter((e) => !e.data.draft).sort((a, b) => a.data.order - b.data.order);
}
