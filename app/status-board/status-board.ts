/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import * as _ from 'lodash';
import {Timer} from '../common/timer';
import {TimeSpan} from '../common/timespan';

interface IStatus {
	val: number,
	class: string
}

interface ITimings{
	[index: string]:TimeSpan
}

var dimensions = {
   rows: 20,
   cols: 50
};

var timeouts = {
   min: 100,
   max: 300
}

var statuses = [
	'active',
	'success',
	'warning',
	'danger',
	'info'
];

var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;
	
@Component({
	selector: 'status-board'
})
@View({
	templateUrl: 'app/status-board/status-board.html',
	directives: [NgFor, NgIf]
})
export class StatusBoard {
	statusBoard: Status[][] = [];
	updateBoardCallback: () => void;
	
	timings:ITimings = {};
	
	updatesTimer = new Timer();
	
	private _statusUpdates: number = 0;
	private _maxStatusUpdates: number = dimensions.cols * dimensions.rows;

	constructor() {
		this.initStatusBoard();
		this.updateBoardCallback = this.updateBoard.bind(this);

		//requestAnimationFrame(this.updateBoardCallback);
	}

	get statusUpdates(){
		return this._statusUpdates;
	}
	
	set statusUpdates(newVal:number){
		this._statusUpdates = newVal;
		
		if(this._statusUpdates >= this._maxStatusUpdates){
			this.updatesTimer.stop();
		}
	}

	initStatusBoard() {
		var timer = new Timer();
		timer.start();
		
		
		this.updatesTimer.start();
		
		for (var row = 0; row < dimensions.rows; row++) {
			for (var col = 0; col < dimensions.cols; col++) {
				if (!this.statusBoard[row]) {
					this.statusBoard[row] = [];
				}

				this.statusBoard[row][col] = new Status();
				this.updateCellAsync(row, col);
			}
		}
		
		timer.stop();
		this.timings['init'] = timer.elapsed();
	}

	updateCellAsync(row: number, col: number) {
		var timeout = getRandomInt(timeouts.min, timeouts.max);

		this.statusBoard[row][col]
			.update()
			.then(() => {
				this.statusUpdates += 1;
			});
	}

	updateBoard() {
		var row = getRandomInt(0, dimensions.rows);
		var col = getRandomInt(0, dimensions.cols);

		this.statusBoard[row][col] = new Status();

		this.statusUpdates += 1;

		if (this.statusUpdates < this._maxStatusUpdates) {
			requestAnimationFrame(this.updateBoardCallback);
		}
	}
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

class Status implements IStatus {
   private _val: number;
   private _class: string;
   private _updating: boolean;

   constructor(status: IStatus = Status.createDefaultStatus()) {
      this._val = status.val;
      this._class = statuses[status.val];
   }

   get val() {
      return this._val;
   }

   get class() {
      return this._class;
   }

   get updating(){
      return this._updating;
   }

   update() {
      var timeout = getRandomInt(timeouts.min, timeouts.max);
  
  	  return new Promise(res => {
			this._updating = true;

		    setTimeout(() => {
		         this._val = getRandomInt(0, statuses.length);
		         this._class = statuses[this._val];
				 this._updating = false;
				 res();
			}, timeout);
		});
   }

   static createDefaultStatus() {
      return <IStatus>{ val: 0, class: '' };
   }
}