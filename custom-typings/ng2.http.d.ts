///<reference path="../typings/rx/rx.d.ts" />

interface List<T> extends Array<T> { }
interface Map<K, V> { }
interface StringMap<K, V> { }
interface Type { }

declare enum RequestModesOpts {
    Cors = 0,
    NoCors = 1,
    SameOrigin = 2,
}
declare enum RequestCacheOpts {
    Default = 0,
    NoStore = 1,
    Reload = 2,
    NoCache = 3,
    ForceCache = 4,
    OnlyIfCached = 5,
}
declare enum RequestCredentialsOpts {
    Omit = 0,
    SameOrigin = 1,
    Include = 2,
}
declare enum RequestMethods {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    OPTIONS = 4,
    HEAD = 5,
    PATCH = 6,
}
declare enum ReadyStates {
    UNSENT = 0,
    OPEN = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
    CANCELLED = 5,
}
declare enum ResponseTypes {
    Basic = 0,
    Cors = 1,
    Default = 2,
    Error = 3,
    Opaque = 4,
}

declare module "angular2/http" {

    interface IRequestOptions {
        method?: RequestMethods;
        headers?: Headers;
        body?: URLSearchParams | FormData | Blob | string;
        mode?: RequestModesOpts;
        credentials?: RequestCredentialsOpts;
        cache?: RequestCacheOpts;
    }
    interface IRequest {
        method: RequestMethods;
        mode: RequestModesOpts;
        credentials: RequestCredentialsOpts;
    }
    interface ResponseOptions {
        status?: number;
        statusText?: string;
        headers?: Headers | Object;
        type?: ResponseTypes;
        url?: string;
    }
    interface IResponse {
        headers: Headers;
        ok: boolean;
        status: number;
        statusText: string;
        type: ResponseTypes;
        url: string;
        totalBytes: number;
        bytesLoaded: number;
        blob(): Blob;
        arrayBuffer(): ArrayBuffer;
        text(): string;
        json(): Object;
    }
    interface ConnectionBackend {
        createConnection(observer: any, config: IRequest): Connection;
    }
    interface Connection {
        readyState: ReadyStates;
        request: IRequest;
        response: Rx.Subject<IResponse>;
        dispose(): void;
    }
    interface IHttp {
        (url: string, options?: IRequestOptions): Rx.Observable<IResponse>;
    }

    class Http {
        private _backend;
        private _defaultOptions;
        constructor(_backend: XHRBackend, _defaultOptions: BaseRequestOptions);
        /**
         * Performs any type of http request. First argument is required, and can either be a url or
         * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
         * object can be provided as the 2nd argument. The options object will be merged with the values
         * of {@link BaseRequestOptions} before performing the request.
         */
        request(url: string | Request, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `get` http method.
         */
        get(url: string, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `post` http method.
         */
        post(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `put` http method.
         */
        put(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `delete` http method.
         */
        delete(url: string, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `patch` http method.
         */
        patch(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): Rx.Observable<Response>;
        /**
         * Performs a request with `head` http method.
         */
        head(url: string, options?: IRequestOptions): Rx.Observable<Response>;
    }

    class Headers {
        _headersMap: Map<string, List<string>>;
        constructor(headers?: Headers | Object);
        append(name: string, value: string): void;
        delete(name: string): void;
        forEach(fn: Function): void;
        get(header: string): string;
        has(header: string): boolean;
        keys(): List<string>;
        set(header: string, value: string | List<string>): void;
        values(): List<List<string>>;
        getAll(header: string): Array<string>;
        entries(): void;
    }
    class BrowserXHR {
        constructor();
    }
    class XHRConnection implements Connection {
        request: Request;
        /**
         * Response
         * [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md)
         * which emits a single {@link Response} value on load event of `XMLHttpRequest`.
         */
        response: Rx.Subject<Response>;
        readyState: ReadyStates;
        private _xhr;
        constructor(req: Request, NativeConstruct: any);
        /**
         * Calls abort on the underlying XMLHttpRequest.
         */
        dispose(): void;
    }
    class XHRBackend implements ConnectionBackend {
        private _NativeConstruct;
        constructor(_NativeConstruct: BrowserXHR);
        createConnection(request: Request): XHRConnection;
    }
    class RequestOptions implements IRequestOptions {
        /**
         * Http method with which to execute the request.
         *
         * Defaults to "GET".
         */
        method: RequestMethods;
        /**
         * Headers object based on the `Headers` class in the [Fetch
         * Spec](https://fetch.spec.whatwg.org/#headers-class).
         */
        headers: Headers;
        /**
         * Body to be used when creating the request.
         */
        body: URLSearchParams | FormData | Blob | string;
        mode: RequestModesOpts;
        credentials: RequestCredentialsOpts;
        cache: RequestCacheOpts;
        constructor({method, headers, body, mode, credentials, cache}?: IRequestOptions);
        /**
         * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
         * existing values.
         */
        merge(opts?: IRequestOptions): RequestOptions;
    }
    class BaseRequestOptions extends RequestOptions {
        constructor();
    }
    class URLSearchParams {
        rawParams: string;
        paramsMap: Map<string, List<string>>;
        constructor(rawParams: string);
        has(param: string): boolean;
        get(param: string): string;
        getAll(param: string): List<string>;
        append(param: string, val: string): void;
        toString(): string;
        delete(param: any): void;
    }
    class Request implements IRequest {
    /** Url of the remote resource */ url: string;
        /**
         * Http method with which to perform the request.
         *
         * Defaults to GET.
         */
        method: RequestMethods;
        mode: RequestModesOpts;
        credentials: RequestCredentialsOpts;
        /**
         * Headers object based on the `Headers` class in the [Fetch
         * Spec](https://fetch.spec.whatwg.org/#headers-class). {@link Headers} class reference.
         */
        headers: Headers;
        private _body;
        constructor(/** Url of the remote resource */ url: string, {body, method, mode, credentials, headers}?: IRequestOptions);
        /**
         * Returns the request's body as string, assuming that body exists. If body is undefined, return
         * empty
         * string.
         */
        text(): String;
    }
    class Response implements IResponse {
        private _body;
        /**
         * One of "basic", "cors", "default", "error, or "opaque".
         *
         * Defaults to "default".
         */
        type: ResponseTypes;
        /**
         * True if the response's status is within 200-299
         */
        ok: boolean;
        /**
         * URL of response.
         *
         * Defaults to empty string.
         */
        url: string;
        /**
         * Status code returned by server.
         *
         * Defaults to 200.
         */
        status: number;
        /**
         * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
         * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
         *
         * Defaults to "OK"
         */
        statusText: string;
        /**
         * Non-standard property
         *
         * Denotes how many of the response body's bytes have been loaded, for example if the response is
         * the result of a progress event.
         */
        bytesLoaded: number;
        /**
         * Non-standard property
         *
         * Denotes how many bytes are expected in the final response body.
         */
        totalBytes: number;
        /**
         * Headers object based on the `Headers` class in the [Fetch
         * Spec](https://fetch.spec.whatwg.org/#headers-class).
         */
        headers: Headers;
        constructor(_body?: string | Object | ArrayBuffer | JSON | FormData | Blob, {status, statusText, headers, type, url}?: ResponseOptions);
        /**
         * Not yet implemented
         */
        blob(): Blob;
        /**
         * Attempts to return body as parsed `JSON` object, or raises an exception.
         */
        json(): JSON;
        /**
         * Returns the body as a string, presuming `toString()` can be called on the response body.
         */
        text(): string;
        /**
         * Not yet implemented
         */
        arrayBuffer(): ArrayBuffer;
    }
    function HttpFactory(backend: XHRBackend, defaultOptions: BaseRequestOptions): (url: string | Request, options?: IRequestOptions) => Rx.Observable<Response>;
    var httpInjectables: any;
}