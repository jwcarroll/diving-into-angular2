/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Component, View, NgFor, CSSClass} from 'angular2/angular2';
import {Router, routerDirectives} from 'angular2/router';
import {ContactsService} from './contacts-service';
import {ContactCard} from './contact-card';
import * as _ from 'lodash';

@Component({
	selector:'contact-list'
})
@View({
	templateUrl:'app/contacts/contact-list.html',
	directives:[NgFor, CSSClass, routerDirectives, ContactCard]
})
export class ContactList{
	contacts: IContact[];
	
	constructor(
		private contactsService:ContactsService,
		private router:Router){
		this.init();
	}
	
	init(){
		this.contactsService.getAll()
			.subscribe(res => {
				this.contacts = res;
			});
	}
	
	navigateToContactDetails(contact:IContact): void{
		this.router.parent.navigate(`/contacts/${(contact || {id:'new'}).id}`);
	}
	
	addNewContact(event): void{
		event.preventDefault();
		this.router.parent.navigate(`/contacts/new`);
	}
	
	deleteContact(contact:IContact): void{
		this.contactsService.deleteContact(contact.id)
			.subscribe(res => {
				_.remove(this.contacts, contact);
			});
	}
}