export interface IRedisService {
  set(key: string, value: string, expiryInSeconds?: number): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<number>;
  exists(key: string): Promise<boolean>;
  close(): void;
}
