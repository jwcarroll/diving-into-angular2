import {Component, View, bootstrap, httpInjectables} from 'angular2/angular2';
import {routerDirectives, routerInjectables, RouteConfig, Router} from 'angular2/router';
import {ContactList} from './contacts/contact-list';
import {ContactDetail} from './contacts/contact-details';

@Component({
	selector: 'contact-manager'
})
@View({
	templateUrl: 'app/contact-manager.html',
	directives: [routerDirectives]
})
@RouteConfig([
	{ path: '/', redirectTo: '/contacts' },
	{ path: '/contacts/', as: 'contacts', component: ContactList },
	{ path: '/contacts/:contactId', as: 'contact-detail', component: ContactDetail }
])
class ContactManager {
	title: string;
	name: string;

	constructor() {
		this.title = "Contact Manager";
		this.name = "Josh";
	}
}

bootstrap(ContactManager, [
	httpInjectables,
	routerInjectables
]);