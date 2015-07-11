///<reference path="model.d.ts" />

import {Component, View} from 'angular2/angular2';

@Component({
	selector:'contact-card',
	properties:['contact'],
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

	constructor(){
	
	}
}