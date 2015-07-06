/// <reference path="../../typings/tsd.d.ts" />

import {
Http,
IRequestOptions,
URLSearchParams,
RequestMethods,
RequestModesOpts,
RequestCredentialsOpts,
RequestCacheOpts,
Request as HttpRequest,
Response as HttpResponse,
EventEmitter
} from 'angular2/angular2';
import * as Rx from 'rx';

declare var fetch: (url: string, init?: RequestInit) => Promise<Response>;

export class FetchHttpAdapter implements Http {
	
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a <a href='/angular2/angular2/Request'><code>Request</code></a> instance. If the first argument is a url, an optional <a href='/angular2/angular2/RequestOptions'><code>RequestOptions</code></a>
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of <a href='/angular2/angular2/BaseRequestOptions'><code>BaseRequestOptions</code></a> before performing the request.
     */
    request(url: string | HttpRequest, options?: IRequestOptions): EventEmitter {
        var promise,
            event = new EventEmitter();

        if (typeof url === 'string') {
            promise = fetch(url, RequestOptionsWrapper.create(options));
        } else {
            promise = fetch(url.url, RequestOptionsWrapper.create(url));
        }

        promise.then(res => res.json())
            .then(json => {
                event.next(json);
            });

        return event;
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: IRequestOptions): EventEmitter {
        return this.request(url, options || <any>{ method: RequestMethods.GET });
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any { }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any { }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: IRequestOptions): EventEmitter {
        return this.request(url, options || <any>{ method: RequestMethods.DELETE });
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any { }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: IRequestOptions): any { }

}

class RequestOptionsWrapper implements RequestInit {

    static create(options: IRequestOptions|HttpRequest) {
        if (typeof options === "undefined") return;

        return new RequestOptionsWrapper(options);
    }

    constructor(private options: IRequestOptions|HttpRequest = <IRequestOptions>{}) {

    }

    get method(): string {
        return RequestMethods[this.options.method];
    }

    get headers(): HeaderInit|{ [index: string]: string } {
        return this.options.headers;
    }

    get body(): BodyInit {
        if (typeof this.options["body"] === "undefined") return;

        return this.options["body"];
    }

    get mode(): RequestMode {
        return <any>requestOptionsMap[this.options.mode];
    }

    get credentials(): RequestCredentials {
        return <any>requestCredentialsMap[this.options.credentials];
    }

    get cache(): RequestCache {
        if (typeof this.options["cache"] === "undefined") return;

        return <any>requestCacheMap[this.options["cache"]];
    }
}

//RequestOptions
var requestOptionsMap: { [index: number]: string } = {};
requestOptionsMap[RequestModesOpts.Cors] = "cors";
requestOptionsMap[RequestModesOpts.NoCors] = "no-cors";
requestOptionsMap[RequestModesOpts.Cors] = "same-origin";

//RequestCredentials
var requestCredentialsMap: { [index: number]: string } = {};
requestCredentialsMap[RequestCredentialsOpts.Include] = "include";
requestCredentialsMap[RequestCredentialsOpts.Omit] = "omit";
requestCredentialsMap[RequestCredentialsOpts.SameOrigin] = "same-origin";

//RequestCache
var requestCacheMap: { [index: number]: string } = {};
requestCacheMap[RequestCacheOpts.Default] = "default";
requestCacheMap[RequestCacheOpts.NoStore] = "no-store";
requestCacheMap[RequestCacheOpts.Reload] = "reload";
requestCacheMap[RequestCacheOpts.NoCache] = "no-cache";
requestCacheMap[RequestCacheOpts.ForceCache] = "force-cache";
requestCacheMap[RequestCacheOpts.OnlyIfCached] = "only-if-cached";