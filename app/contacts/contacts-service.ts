///<reference path="model.d.ts" />

import {Http, Inject} from 'angular2/angular2';
import * as Rx from 'rx';

export class ContactsService {
	constructor( @Inject(Http) private http: Http) { }

	getContacts(): Rx.IObservable<IContact[]> {
		return this.http.get('/api/contacts')
			.toRx().map(r => r.json());
	}
}