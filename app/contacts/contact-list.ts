import {Component, View, NgFor, Headers} from 'angular2/angular2';
import {ContactsService} from './contacts-service';
import {ContactCard} from './contact-card';

@Component({
	selector: 'contact-list',
	hostInjector: [ContactsService]
})
@View({
	templateUrl: '/app/contacts/contact-list.html',
	directives: [NgFor, ContactCard]
})
export class ContactList {
	contacts: IContact[] = [];

	constructor(private contactsService: ContactsService) {
		this.init();
	}

	init() {
		this.contactsService.getContacts()
			.subscribe((contacts:IContact[]) => {
				this.contacts = contacts;
			});
	}
}