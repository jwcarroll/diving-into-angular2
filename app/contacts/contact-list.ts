import {Component, View, NgFor, Http, Headers} from 'angular2/angular2';

interface IContact {
	contactId: number;
	firstName: string;
	lastName: string;
	twitter: string;
}

@Component({
	selector: 'contact-list'
})
@View({
	templateUrl: '/app/contacts/contact-list.html',
	directives: [NgFor]
})
export class ContactList {
	contacts: IContact[] = [];

	constructor(private http: Http) {
		this.init();
	}

	init() {
		this.http.get('/api/contacts')
			.toRx()
			.map(res => res.json())
			.subscribe((contacts:IContact[]) => {
				this.contacts = contacts;
			});
	}
}