///<reference path="model.d.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';

@Component({
	selector:'contact-card',
	properties:['contact'],
	events:['delete'],
	host:{
		'(^mouseover)':"isActive = true",
		'(^mouseout)':"isActive = false"
	}
})
@View({
	templateUrl:'/app/contacts/contact-card.html'
})
export class ContactCard {
	contact:IContact;
	isActive:boolean = false;
	delete = new EventEmitter();

	constructor(){
	
	}
	
	onDelete(){
		this.delete.next(this.contact);
	}
}