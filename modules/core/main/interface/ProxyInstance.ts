import { InterceptorOption, SubscribeOption } from './common'

export interface ProxyInstance<T extends object = object> {

    target: T;

    interceptorOptions: InterceptorOption<T>[];

    subscriberOptions: SubscribeOption<T>[];

    intercept(option: InterceptorOption<T>): any;

    subscribe(option: SubscribeOption<T>): string;

}
