import {Component, View, NgFor} from 'angular2/angular2';

interface IContact {
	firstName:string;
	lastName:string;
	twitter:string;
}

@Component({
	selector:'contact-list'
})
@View({
	templateUrl:'/app/contacts/contact-list.html',
	directives: [NgFor]
})
export class ContactList {
	contacts:IContact[]

	constructor(){
		this.contacts = [
			{firstName:'Josh', lastName:'Carroll', twitter:'jwcarroll'},
			{firstName:'Dave', lastName:'Baskin', twitter:'dfbaskin'}
		];
	}
}