import { SubscriptionParams } from '../interface/SubscriptionParams';
import { genOrderedId } from '@rapidly/utils/lib/commom/genOrderedId';
import { WeaklyMap } from './WeaklyMap';
import { unique } from '@rapidly/utils/lib/array/unique';
import { TriggerOptions } from '../interface/TriggerOptions';

export const EMPTY_IDENTITY = Symbol('EMPTY_IDENTITY');

export class Subscriber {
    private relationshipMap = new WeaklyMap<any, Map<any, any>>();
    private subscriptionMap = new WeaklyMap<any, { [key: string]: SubscriptionParams }>();

    associate(target: any, parent: any, identity: any = EMPTY_IDENTITY, replaceIdentity: any = EMPTY_IDENTITY): void {
        const relationship = this.relationshipMap.get(target);
        if (!relationship) {
            this.relationshipMap.set(target, new Map([[parent, [identity, replaceIdentity]]]));
        } else {
            relationship.set(parent, [identity, replaceIdentity]);
        }
    }

    disassociate(target: any, parent: any): void {
        const relationship = this.relationshipMap.get(target);
        if (relationship) {
            relationship.delete(parent);
        }
    }

    subscribe(target: any, matchChain: any[], callback: Function): string;

    subscribe(target: any, callback: Function): string;

    subscribe(...args: any[]): string {
        if (args.length === 2) {
            return this._subscribe(args[0], [], args[1]);
        }
        if (args.length >= 3) {
            return this._subscribe(args[0], args[1], args[2]);
        }
        throw new Error('Invalid arguments');
    }

    private _subscribe(target: any, matchChain: any[], callback: Function): string {
        const identity = genOrderedId();
        const subscription = this.subscriptionMap.get(target);
        if (!subscription) {
            this.subscriptionMap.set(target, { [identity]: { callback, identity, matchChain: unique(matchChain) } });
        } else {
            subscription[identity] = { callback, identity, matchChain: unique(matchChain) };
        }
        return identity;
    }

    unsubscribe(target: any, identity?: string): void {
        const subscription = this.subscriptionMap.get(target);
        if (subscription) {
            if (identity) {
                delete subscription[identity];
            } else {
                this.subscriptionMap.delete(target);
            }
        }
    }

    private traverseRelationship(target: any, callback: Function, identityChain = [], passedTargets = []) {
        callback(
            target,
            [...identityChain].filter((p) => p != null)
        );
        if (this.relationshipMap.has(target)) {
            const parentIdentityMap = this.relationshipMap.get(target);
            parentIdentityMap.forEach(([identity, replaceIdentity], parent) => {
                if (passedTargets.indexOf(parent) === -1) {
                    if (replaceIdentity !== EMPTY_IDENTITY) {
                        const lastIdentity = identityChain[identityChain.length - 1];
                        if (lastIdentity === identity) {
                            identityChain.pop();
                            identity = replaceIdentity;
                        } else {
                            // if identity not match, replace identity not works, means parent not match
                            return;
                        }
                    }
                    passedTargets.push(parent);
                    this.traverseRelationship(
                        parent,
                        callback,
                        [...(identity === EMPTY_IDENTITY ? [] : [identity]), ...identityChain],
                        passedTargets
                    );
                }
            });
        }
    }

    trigger(target: any, options?: TriggerOptions): void {
        const opt = Object.assign({ args: [], existChain: [] }, options);
        this.traverseRelationship(
            target,
            (targetItem, identityChain) => {
                const subscription = this.subscriptionMap.get(targetItem);
                if (subscription) {
                    const subscribes = Object.values(subscription);
                    subscribes.forEach((subscribe) => {
                        if (
                            !subscribe.matchChain?.length ||
                            unique(identityChain) === unique(subscribe.matchChain || [])
                        ) {
                            subscribe.callback?.(
                                {
                                    target: targetItem,
                                    identityChain
                                },
                                ...opt.args
                            );
                        }
                    });
                }
            },
            opt.existChain || []
        );
    }
}
