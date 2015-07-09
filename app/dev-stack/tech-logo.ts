///<reference path="../../typings/tsd.d.ts" />

import {Component, View, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2';
import {TechnologyPlatform} from './platform';

@Component({
	selector:'tech-logo',
	properties:['technology: tech']
})
@View({
	template: `
		<style>
			.logo-image { display:inline-block; margin:20px; }
			.logo-image img { max-height:200px; max-width:350px; }
			img.node {background: #303030; padding:10px;}
		</style>
		<div [ng-switch]="technology" class="logo-image">
			<img *ng-switch-when="${TechnologyPlatform.AngularJS}" src="/app/content/AngularJS-Shield-medium.png" />
			<img *ng-switch-when="${TechnologyPlatform.ASPNet}" src="/app/content/asplogo-square.png" />
			<img *ng-switch-when="${TechnologyPlatform.Ember}" src="/app/content/ember-logo.png" />
			<img *ng-switch-when="${TechnologyPlatform.MongoDB}" src="/app/content/mongodb-logo-rgb.jpeg" />
			<img *ng-switch-when="${TechnologyPlatform.Node}" src="/app/content/node-logo.svg" class="node" />
			<img *ng-switch-when="${TechnologyPlatform.Postgresql}" src="/app/content/postgresql.png" />
			<img *ng-switch-when="${TechnologyPlatform.React}" src="/app/content/react-logo.svg" />
			<img *ng-switch-when="${TechnologyPlatform.RubyOnRails}" src="/app/content/Ruby_on_Rails.svg" />
			<img *ng-switch-when="${TechnologyPlatform.SqlServer}" src="/app/content/sql-server-logo.png" />
			<h1 *ng-switch-default>???</h1>
		</div>
	`, 
	directives:[NgSwitch, NgSwitchWhen, NgSwitchDefault]
})
export class TechLogo {
	technology:TechnologyPlatform;
}