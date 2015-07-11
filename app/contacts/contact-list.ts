/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="model.d.ts" />

import {Component, View, NgFor, CSSClass} from 'angular2/angular2';
import {routerDirectives, Router} from 'angular2/router';
import {ContactsService} from './contacts-service';
import {ContactCard} from './contact-card';
import * as _ from 'lodash';

@Component({
	selector:'contact-list',
	hostInjector:[ContactsService]
})
@View({
	templateUrl:'app/contacts/contact-list.html',
	directives:[NgFor, CSSClass, ContactCard, routerDirectives]
})
export class ContactList{
	contacts: IContact[];
	
	constructor(
		private contactsService:ContactsService,
		private router:Router){
		this.init();
	}
	
	init(){
		this.contactsService.getContacts()
			.subscribe(res => {
				this.contacts = res;
			});
	}
	
	navigateToContactDetails(contact:IContact): void{
		this.router.navigate(`/contacts/${(contact || {contactId:'new'}).contactId}`);
	}
	
	deleteContact(contact:IContact): void{
		this.contactsService.deleteContact(contact.contactId)
			.subscribe(c => {
				_.remove(this.contacts, {contactId:c.contactId});
			});
	}
}