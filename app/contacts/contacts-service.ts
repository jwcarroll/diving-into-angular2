/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Inject, Http, RequestMethods, BaseRequestOptions, Headers} from 'angular2/angular2';
// import {Http, RequestMethods} from 'angular2/http';

export class ContactsService {
	constructor(
		@Inject(Http) private http: Http) { }

	getAll(): Rx.Observable<IContact[]> {
		return this.http.get('/api/contacts').toRx();
	}

	getContact(contactId: string|number) : Rx.Observable<IContact> {
		return this.http.get(`/api/contacts/${contactId}`).toRx();
	}

	saveContact(contact: IContact) : Rx.Observable<IContact> {
		var requestOptions = <any>{
			method: _.isUndefined(contact.id) ? RequestMethods.POST : RequestMethods.PUT,
			body: JSON.stringify(contact),
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		};

		return this.http.request(`/api/contacts/${contact.id || ''}`, requestOptions).toRx();
	}
	
	deleteContact(contactId: string|number) : Rx.Observable<IContact> {
		return this.http.delete(`/api/contacts/${contactId}`).toRx();
	}
}