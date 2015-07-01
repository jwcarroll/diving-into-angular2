/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Component, View, NgFor, CSSClass} from 'angular2/angular2';
import {Router, routerDirectives} from 'angular2/router';
import {ContactsService} from './contacts-service';

@Component({
	selector:'contact-list'
})
@View({
	templateUrl:'app/contacts/contact-list.html',
	directives:[NgFor, CSSClass, routerDirectives]
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
	
	navigateToContactDetails($event:any, contact:IContact): void{
		$event.preventDefault();	
		this.router.parent.navigate(`/contacts/${(contact || {id:'new'}).id}`);
	}
}