///<reference path="model.d.ts" />

import {Component, View} from 'angular2/angular2';

@Component({
	selector:'contact-card',
	properties:['contact']
})
@View({
	templateUrl:'/app/contacts/contact-card.html'
})
export class ContactCard {
	contact:IContact;

	constructor(){
	
	}
}