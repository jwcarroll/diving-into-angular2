/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Component, View, formDirectives} from 'angular2/angular2';
import {RouteParams, RouteConfig, Router} from 'angular2/router';
import {ContactsService} from './contacts-service';
import * as _ from 'lodash';
import * as Rx from 'rx';

@Component({
	selector:'contact'
})
@View({
	templateUrl:'app/contacts/contact-details.html',
	directives:[formDirectives]
})
export class ContactDetail{	
	private _contact;
	private _originalContact:IContact;
	
	constructor(
		private contactsService:ContactsService, 
		private routeParams:RouteParams,
		private router:Router){
		
		this.init();
	}
	
	init(){
		var contactId = this.routeParams.params['contactId'];
		this.contact = <IContact>{};
		this.getContact(contactId)
			.subscribe(contact => {
				this.contact = contact;
			});
	}
	
	cancelChanges(){
		this.contact = this._originalContact;
	}
	
	saveContact(){
		this.contactsService.saveContact(this.contact)
			.subscribe(c => {
				this.router.parent.navigate("/contacts");
			});
	}
	
	get contact():IContact{
		return this._contact;
	}
	set contact(newContact:IContact){
		this._contact = newContact;
		this._originalContact = _.clone(newContact);
	}
	
	private getContact(contactId:string|number){
		return Rx.Observable.create<IContact>(obs => {
			if(_.isUndefined(contactId)){
				obs.onNext(<IContact>{});
				obs.onCompleted();
				return;
			}
			
			this.contactsService.getContact(contactId)
				.subscribe(c => {
					obs.onNext(c);
					obs.onCompleted();
				});
		});
	}
}