import {Component, View, bootstrap} from 'angular2/angular2';
import {ContactList} from './contacts/contact-list';

@Component({
	selector:'contact-manager'
})
@View({
	templateUrl:'app/contact-manager.html',
	directives: [ContactList]
})
class ContactManager{
	title: string;
	name: string;
	
	constructor(){
		this.title = "Contact Manager";
		this.name = "Josh";
	}
}

bootstrap(ContactManager,[]);