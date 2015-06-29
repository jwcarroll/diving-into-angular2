/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {RouteParams, RouteConfig} from 'angular2/router';
import {ContactsService} from './contacts-service';
import * as _ from 'lodash';

@Component({
	selector:'contact'
})
@View({
	template:'<h1>Showing Contact Info For: {{contactId}}'
})
export class ContactDetail{
	contact: IContact;
	contactId: string;
	
	constructor(
		private contactsService:ContactsService, 
		private routeParams:RouteParams){
		
		this.init();
	}
	
	init(){
		this.contactId = this.routeParams.params['contactId'];
	}
}