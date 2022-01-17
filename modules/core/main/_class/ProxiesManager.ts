import { ProxiesPool } from './ProxiesPool'

export class ProxiesManager {
    proxiesPoolsMap: Map<string, ProxiesPool> = new Map<string, ProxiesPool>();

    constructor() {
        this.proxiesPoolsMap.set('default', new ProxiesPool(this));
    }

    getDefaultPool(): ProxiesPool {
        return this.proxiesPoolsMap.get('default');
    }

    getPool(poolName: string): ProxiesPool {
        return this.proxiesPoolsMap.get(poolName);
    }

    createPool(poolName: string): ProxiesPool {
        if (this.proxiesPoolsMap.has(poolName)) {
            throw new Error(`Pool with name ${poolName} already exists`);
        }
        const newPool = new ProxiesPool(this);
        this.proxiesPoolsMap.set(poolName, newPool);
        return newPool;
    }


}
