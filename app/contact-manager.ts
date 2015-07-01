import {Component, View, bootstrap, formInjectables} from 'angular2/angular2';
import {routerDirectives, routerInjectables, RouteConfig, Router} from 'angular2/router';
import {Http, httpInjectables} from 'angular2/http';
import {ContactList} from './contacts/contact-list';
import {ContactsService} from './contacts/contacts-service';
import {ContactDetail} from './contacts/contact-details';
import {StatusBoard} from './status-board/status-board';
import {StatusBoardFloating} from './status-board/status-board-floating';

@Component({
	selector:'contact-manager'
})
@View({
	templateUrl:'app/contact-manager.html',
	directives:[routerDirectives]
})
@RouteConfig([
	{path: '/',	redirectTo:'/contacts'},
	{path: '/contacts/',	as:'contacts', component:ContactList},
	{path: '/contacts/:contactId',	as:'contact-detail', component:ContactDetail},
	{path: '/status-board', as:'status-board',	component:StatusBoard},
	{path: '/status-board-floating', as:'status-board-floating',	component:StatusBoardFloating}
])
class ContactManager{
	title: string;
	
	constructor(private router:Router){
		this.title = "Contact Manager";
	}
}

bootstrap(
	ContactManager,
	[
		formInjectables,
		routerInjectables,
		httpInjectables,
		ContactsService
	]
);