import { LRUCache } from 'lru-cache';

const options = {
  max: 500,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
};

let imageCache: LRUCache<string, string>;

if (typeof global !== 'undefined' && !(global as any).imageCache) {
  (global as any).imageCache = new LRUCache<string, string>(options);
}

imageCache = (global as any).imageCache;

export default imageCache;