/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgIf, onDestroy} from 'angular2/angular2';

interface IMinMax {
	min: number;
	max: number;
}

interface IBounds {
	x: IMinMax;
	y: IMinMax;
}

interface IBoardConfig {
	numItems: number;
	velocity: IBounds;
	bounds: IBounds;
}

interface IKeyToActionMapping {
	[index:number]: () => void
}

enum KeyMapping {
	LeftArrow = 37,
	RightArrow = 39,
	Space = 32
}

var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;

@Component({
	selector: 'status-board',
	lifecycle: [onDestroy],
	host: {
		'(document:^keyup)': 'onKeyUp($event)',
		'(document:^keydown)': 'onKeyDown($event)'
	}
})
@View({
	templateUrl: 'app/status-board/status-board-floating.html',
	directives: [NgFor, NgIf]
})
export class StatusBoardFloating {
	statusBoard: Position[] = [];
	elapsedMilliseconds: number;

	config: IBoardConfig = {
		numItems: 300,
		velocity: {
			x: { min: -500, max: 500 },
			y: { min: -500, max: 500 }
		},
		bounds: {
			x: { min: 0, max: 900 },
			y: { min: 0, max: 500 }
		}
	};

	private _updateBoard: (elapsed: number) => void;

	private _run: boolean = false;
	private _lastStep: number;

	private _keyToActionMapping:IKeyToActionMapping;

	constructor() {
		this._updateBoard = this.updateBoard.bind(this);
		this.initKeyMappings();
		this.initStatusBoard();
	}

	start() {
		if (this._run) return;

		this._run = true;
		requestAnimationFrame(this._updateBoard);
	}

	stop() {
		this._run = false;
		this._lastStep = undefined;
	}

	initKeyMappings(){
		this._keyToActionMapping = {};
		this._keyToActionMapping[KeyMapping.LeftArrow] = this.incrementNumItems.bind(this, -10);
		this._keyToActionMapping[KeyMapping.RightArrow] = this.incrementNumItems.bind(this, 10);
		this._keyToActionMapping[KeyMapping.Space] = this.toggleStartStop.bind(this);
	}

	initStatusBoard() {
		//remove any items that don't belong
		this.statusBoard.splice(this.config.numItems - 1);
		
		for (var i = 0; i < this.config.numItems; i++) {
			if(!this.statusBoard[i]){
				this.statusBoard[i] = Position.create(this.config);
			}
		}
	}

	updateBoard(elapsedMilliseconds) {
		if (this._run) {
			var elapsedSeconds = TimeSpan.toSeconds(elapsedMilliseconds - (this._lastStep || elapsedMilliseconds));
			this.elapsedMilliseconds = elapsedMilliseconds;
			this._lastStep = elapsedMilliseconds;		

			for (var i = 0; i < this.config.numItems; i++) {
				this.statusBoard[i].move(elapsedSeconds, this.config.bounds);
			}

			requestAnimationFrame(this._updateBoard);
		}
	}

	toggleStartStop(){
		this._run ? this.stop() : this.start();
	}

	incrementNumItems(increment:number){
		var newNum = this.config.numItems + increment;
		
		if(newNum < 1){
			newNum = 1;
		}
		
		this.updateNumItems(newNum);
	}

	updateNumItems(numItems:number){
		this.config.numItems = numItems || 1;
		this.initStatusBoard();
	}

	onKeyDown(event){
		if(event.which !== KeyMapping.Space){
			this.onKeyUp(event);
		}
	}

	onKeyUp(event){
		var action = this._keyToActionMapping[event.which];
		
		if(action){
			action();
		}
	}

	onDestroy() {
		this.stop();
	}
}

class Position {
	top: string;
	left: string;

	constructor(
		public x: number,
		public y: number,
		private velocityX: number,
		private velocityY: number) { }

	move(timeDelta: number, bounds?: IBounds) {
		this.x += (this.velocityX * timeDelta);
		this.y += (this.velocityY * timeDelta);

		this.top = `${this.y}px`;
		this.left = `${this.x}px`;

		if (!bounds) return;

		if (this.x > bounds.x.max || this.x < bounds.x.min) {
			this.x = this.x > bounds.x.max ? bounds.x.max : bounds.x.min;
			this.velocityX *= -1;
		}
		if (this.y > bounds.y.max || this.y < bounds.y.min) {
			this.y = this.y > bounds.y.max ? bounds.y.max : bounds.y.min;
			this.velocityY *= -1;
		}
	}

	static create(config: IBoardConfig) {
		return new Position(
			getRandomInt(config.bounds.x.min, config.bounds.x.max),
			getRandomInt(config.bounds.y.min, config.bounds.y.max),
			getRandomInt(config.velocity.x.min, config.velocity.x.max),
			getRandomInt(config.velocity.y.min, config.velocity.y.max)
			);
	}
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

class TimeSpan {
	constructor(private _totalMilliseconds: number = 0) { }

	static toSeconds(totalMilliseconds: number){
		return totalMilliseconds / 1000;
	}

	get totalSeconds() {
		return this._totalMilliseconds / 1000;
	}

	get totalMilliseconds() {
		return this._totalMilliseconds;
	}
}