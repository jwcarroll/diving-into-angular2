/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Inject, Http, RequestMethods, BaseRequestOptions, Headers} from 'angular2/angular2';
// import {Http, RequestMethods} from 'angular2/http';

export class ContactsService {
	constructor(
		@Inject(Http) private http: Http,
		@Inject(BaseRequestOptions) private baseRequestOptions: BaseRequestOptions) { }

	getAll() {
		return this.http.get('/api/contacts')
			.map(res => <IContact[]>res.json());
	}

	getContact(contactId: string|number) {
		return this.http.get(`/api/contacts/${contactId}`)
			.map(res => <IContact>res.json());
	}

	saveContact(contact: IContact) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		
		var requestOptions = this.baseRequestOptions.merge(<any>{
			method: _.isUndefined(contact.id) ? RequestMethods.POST : RequestMethods.PUT,
			body: JSON.stringify(contact),
			headers: headers
		});

		return this.http.request(`/api/contacts/${contact.id || ''}`, requestOptions)
			.map<IContact>(res => <any>res.json());
	}
}