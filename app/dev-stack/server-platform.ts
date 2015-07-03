///<reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {routerDirectives, RouteParams, RouteConfig, Router} from 'angular2/router';
import {DatabasePlatform} from './database-platform';
import {Platform, TechnologyPlatform} from './platform';
import {TechLogo} from './tech-logo';

@Component({
	selector: ['server-platform']
})
@View({
	template: `
		<tech-logo [tech]="serverTech"></tech-logo>
		<router-outlet></router-outlet>
	`,
	directives: [routerDirectives, TechLogo]
})
@RouteConfig([
	{ path: '/database/:dbTech', as: 'database', component: DatabasePlatform }
])
export class ServerPlatform extends Platform {
	serverTech: TechnologyPlatform;

	constructor(routeParams: RouteParams) {
		super(routeParams);
		this.serverTech = this.init('serverTech');
	}
}