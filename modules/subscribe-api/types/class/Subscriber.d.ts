import { TriggerOptions } from '../interface/TriggerOptions';
export declare const EMPTY_IDENTITY: unique symbol;
export declare class Subscriber {
    private relationshipMap;
    private subscriptionMap;
    associate(target: any, parent: any, identity?: any, replaceIdentity?: any): void;
    disassociate(target: any, parent: any): void;
    subscribe(target: any, matchChain: any[], callback: Function): string;
    subscribe(target: any, callback: Function): string;
    private _subscribe;
    unsubscribe(target: any, identity?: string): void;
    private traverseRelationship;
    trigger(target: any, options?: TriggerOptions): void;
}
