import { Memory } from '../models/Memory';
import { Storage } from './Storage';

export class MemoryStorage {
  private static readonly STORAGE_KEY = 'MEMORIES_STORAGE_KEY';
  private static readonly INSTANCE = new MemoryStorage();

  public static getInstance() {
    return MemoryStorage.INSTANCE;
  }

  private constructor(private storage: Storage = Storage.getInstance()) {}

  async getAll(): Promise<Memory[]> {
    return this.storage.get(MemoryStorage.STORAGE_KEY).then((res) => JSON.parse(res || JSON.stringify([])));
  }

  async save(memories: Memory[]) {
    return this.storage.set(MemoryStorage.STORAGE_KEY, JSON.stringify(memories));
  }
}
