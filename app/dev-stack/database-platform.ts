///<reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {routerDirectives, RouteParams, RouteConfig, Router} from 'angular2/router';
import {Platform, TechnologyPlatform} from './platform';
import {TechLogo} from './tech-logo';

@Component({
	selector: ['database-platform']
})
@View({
	template: `
		<tech-logo [tech]="dbTech"></tech-logo>
	`,
	directives: [routerDirectives, TechLogo]
})
export class DatabasePlatform extends Platform {
	dbTech: TechnologyPlatform;

	constructor(routeParams: RouteParams) {
		super(routeParams);
		this.dbTech = this.init("dbTech");
	}
}