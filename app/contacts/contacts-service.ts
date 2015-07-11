///<reference path="model.d.ts" />

import {Http, RequestMethods, Inject, Headers, RequestOptions} from 'angular2/angular2';
import * as Rx from 'rx';

export class ContactsService {
	constructor( @Inject(Http) private http: Http) { }

	getContacts(): Rx.IObservable<IContact[]> {
		return this.http.get('/api/contacts')
			.toRx().map(r => r.json());
	}
	
	getContact(contactId:number): Rx.IObservable<IContact> {
		return this.http.get(`/api/contacts/${contactId}`)
			.toRx().map(r => r.json());
	}
		
	saveContact(contact: IContact) : Rx.Observable<IContact> {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		
		var opts = new RequestOptions();
		opts.body = JSON.stringify(contact);
		opts.method = _.isUndefined(contact.contactId) ? RequestMethods.POST : RequestMethods.PUT;  
		opts.headers = headers;

		return this.http.request(
			`/api/contacts/${contact.contactId || ''}`, 
			opts).toRx().map(res => res.json());
	}
	
	deleteContact(contactId:number): Rx.IObservable<IContact> {
		return this.http.delete(`/api/contacts/${contactId}`)
			.toRx().map(r => r.json());
	}
}