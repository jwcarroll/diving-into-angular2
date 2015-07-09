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
	protected techPlatformName:string;
	
	constructor(protected routeParams:RouteParams){}
	
	init(paramName:string):TechnologyPlatform{
		var platform = TechnologyPlatform[<string>this.routeParams.params[paramName]];
		
		this.techPlatformName = TechnologyPlatform[platform];
		
		return platform;
	}
}