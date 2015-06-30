/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';

export class ContactsService {
	constructor(@Inject(Http) private http:Http){ }
	
	getAll() {
		return this.http.get('/api/contacts')
			.map<IContact[]>(res => <any>res.json());
	}
	
	getContact(contactId:string|number){
		return this.http.get(`/api/contacts/${contactId}`)
			.map<IContact>(res => <any>res.json());
	}
}