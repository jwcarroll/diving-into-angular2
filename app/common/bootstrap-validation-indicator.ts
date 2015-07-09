/// <reference path="../../typings/tsd.d.ts" />

import {Directive, NgForm, Parent, ElementRef, Renderer, AbstractControl, EventEmitter, onAllChangesDone} from 'angular2/angular2';
import {RouteParams, RouteConfig, Router} from 'angular2/router';
import * as _ from 'lodash';
import * as Rx from 'rx';

@Directive({
	selector:'[bs-validation-indicator]',
	properties:['ctrlName:bsValidationIndicator'],
	lifecycle:[onAllChangesDone]
})
export class BootstrapValidationIndicator {
	_ctrlName:string;
	_ctrl:AbstractControl;
		
	constructor(
		@Parent() private form:NgForm,
		private elem:ElementRef,
		private renderer:Renderer){
	}
	
	set ctrlName(val:string){
		this._ctrlName = val;
	}
	
	set ctrl(val:AbstractControl){
		if(this._ctrl === val) return;
		
		this._ctrl = val;
		
		if(!this._ctrl) return;		
		
		(<EventEmitter>this._ctrl.valueChanges)
			.toRx()
			.subscribe(() => {
				this._toggleClasses();
			});
	}
	
	onAllChangesDone(){
		this.ctrl = this.form.controls[this._ctrlName];
	}
	
	private _toggleClasses(){
		this.renderer.setElementClass(this.elem, 'has-error', this._ctrl.valid === false && this._ctrl.dirty);
		this.renderer.setElementClass(this.elem, 'has-success', this._ctrl.valid && this._ctrl.dirty);
	}
}