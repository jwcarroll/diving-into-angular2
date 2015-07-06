/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="models.d.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';
import {RouteParams, RouteConfig, Router} from 'angular2/router';
import * as _ from 'lodash';
import * as Rx from 'rx';

@Component({
	selector:'contact-card',
	properties:['contact', 'isActive'],
	events:['ccViewDetail','ccDelete'],
	host:{
		'(^mouseover)':"isActive = true", 
		'(^mouseout)':"isActive = false"
	}
})
@View({
	templateUrl:'app/contacts/contact-card.html'
})
export class ContactCard {
	contact:IContact;
	isActive:boolean;
	ccViewDetail = new EventEmitter();
	ccDelete = new EventEmitter();
	
	constructor(){	}
	
	triggerDetailEvent(event){
		event.preventDefault();
		event.stopPropagation();
		
		this.ccViewDetail.next(this.contact);
	}
	
	triggerDeleteEvent(event){
		event.preventDefault();
		event.stopPropagation();
		
		this.ccDelete.next(this.contact);
	}
}