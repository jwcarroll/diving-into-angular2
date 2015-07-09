import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
	selector:'contact-manager'
})
@View({
	templateUrl:'app/contact-manager.html'
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