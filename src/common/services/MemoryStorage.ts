import { Memory } from '../models/Memory';
import { Storage } from './Storage';

const MEMORIES: Memory[] = [
  {
    id: '1',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '2',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '3',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '10',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '20',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '30',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '100',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '200',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '300',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
];

export class MemoryStorage {
  private static readonly STORAGE_KEY = 'MEMORIES_STORAGE_KEY';
  private static readonly INSTANCE = new MemoryStorage();

  public static getInstance() {
    return MemoryStorage.INSTANCE;
  }

  private constructor(private storage: Storage = Storage.getInstance()) {}

  async getAll(): Promise<Memory[]> {
    return this.storage.get(MemoryStorage.STORAGE_KEY).then((res) => JSON.parse(res || JSON.stringify(MEMORIES)));
  }
}
