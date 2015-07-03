/// <reference path="../../typings/tsd.d.ts" />

import {RouteParams} from 'angular2/router';

export enum TechnologyPlatform {
	AngularJS,
	ASPNet,
	Ember,
	MongoDB,
	Node,
	Postgresql,
	React,
	RubyOnRails,
	SqlServer
}

export class Platform {
	constructor(protected routeParams:RouteParams){}
	
	init(paramName:string){
		return TechnologyPlatform[<string>this.routeParams.params[paramName]];
	}
}