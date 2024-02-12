
interface Create<T> {
  create: (user: T) => Promise<T>;
}

interface Read<T> {
  getById: (id: string) => Promise<T>;
  get: () => Promise<T[]>;
}

interface Update<T> {
  update: (id: string, user: T) => Promise<void>;
}

interface Delete {
  delete: (id: string) => Promise<boolean>;
}

export {
  Create,
  Read,
  Update,
  Delete
}
