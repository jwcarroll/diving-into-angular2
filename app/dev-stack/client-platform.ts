///<reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {routerDirectives, RouteParams, RouteConfig, Router} from 'angular2/router';
import {Platform, TechnologyPlatform} from './platform';
import {ServerPlatform} from './server-platform';
import {TechLogo} from './tech-logo';

@Component({
	selector: 'client-platform'
})
@View({
	template: `
		<div class="row">
			<div class="col-sm-4">
				<tech-logo [tech]="clientTech"></tech-logo>
			</div>
			<router-outlet></router-outlet>
		</div>
	`,
	directives: [routerDirectives, TechLogo]
})
@RouteConfig([
	{ path: '/server/:serverTech/...', as: 'server', component: ServerPlatform }
])
export class ClientPlatform extends Platform {
	clientTech: TechnologyPlatform;

	constructor(routeParams: RouteParams) {
		super(routeParams);
		this.clientTech = this.init("clientTech");
	}
}