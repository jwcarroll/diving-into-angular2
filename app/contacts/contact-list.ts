import {Component, View, NgFor} from 'angular2/angular2';

interface IContact {
	contactId:number;
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
			{ contactId: 1, firstName: 'Josh', lastName: 'Carroll', twitter: 'jwcarroll' },
			{ contactId: 2, firstName: 'Dave', lastName: 'Baskin', twitter: 'dfbaskin' },
			{ contactId: 3, firstName: 'Todd', lastName: 'Motto', twitter: 'toddmotto' }
		];
	}
}