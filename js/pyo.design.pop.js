/*
write : gray
since : 2020-06-26
*/
let pyoDesignPop = new function(){
	this.opt = function(useOpt){
		let defaults = {
			targetId : 'pop1', // only id - id
			layoutClass : 'basic', // basic, etc - layout
			padding : '10px', // css padding
			maxWidth : null, // null, number - max-width
			minHetight : null, // null, number - min-height
			remove : false, // false, true - remove
			closeBt : false, // false, true - close-x bt
			title : null, // null, string - title
			titleAlign : 'left', // left, center - title text-align
			con : null, // null, string - contents
			conAlign : 'left', // left, center - con text-align
			buttonSet : { // button
				layOutChange : null, // null, string - layout change
				reverse : false, // false, ture - button order
			},
			buttonArr : [ // button arry
				{
					id : '',
					class : 'bt-ok blue',
					text : '확인',
				},
				{
					id : '',
					class : 'bt-cancle',
					text : '취소',
				}
			],
			closeBtFun : function(t, assOpt){
				return function(){
					t.closePop(assOpt);
				}();
			},
			okBttFun :  function(t, assOpt){
				return function(){
					t.closePop(assOpt);
				}();
			},
			cancaleBtFun :  function(t, assOpt){
				return function(){
					t.closePop(assOpt);
				}();
			},
		}
		var optArr = [defaults, useOpt];
		var opts =  optArr.reduce(function (r, o) {
			Object.keys(o).forEach(function (k) {
				r[k] = o[k];
			});
			return r;
		}, {});
		return opts;

	}
	this.openPop = function(useOpt){
		let t = this;
		let assOpt = this.opt(useOpt);

		if(!document.querySelector('#'+assOpt.targetId)){
			t.markup(assOpt);
			let tTarget, closeBt, okBt, cancaleBt;
			tTarget = document.querySelector('#'+assOpt.targetId);
			tButton = tTarget.querySelectorAll('button');
			closeBt = tTarget.querySelector('.close-x');
			okBt = tTarget.querySelector('.bt-ok');
			cancaleBt = tTarget.querySelector('.bt-cancle');

			tButton.forEach(function(v, i, arr){
				v.addEventListener('click', function(){
					let popEvent = false;
					if(this.classList.contains('close-x') || this.classList.contains('bt-ok') || this.classList.contains('bt-cancle'))  { popEvent = true; }

					if(popEvent) {
						if(this.classList.contains('close-x')) assOpt.closeBtFun(t, assOpt);
						if(this.classList.contains('bt-ok')) assOpt.okBttFun(t, assOpt);
						if(this.classList.contains('bt-cancle')) assOpt.cancaleBtFun(t, assOpt);
					}
				});
			});
		}
		document.querySelector('html').classList.add( 'pyo-pop-open' );
		document.querySelector('#'+assOpt.targetId).classList.add( 'block' );
		setTimeout(function(){
			document.querySelector('#'+assOpt.targetId).classList.add( 'show' );
			tButton[0].focus();
		},1);
	}
	this.closePop = function(assOpt){
		let tTarget = document.querySelector('#'+assOpt.targetId);
		let endPop = true;

		tTarget.classList.remove( 'show' );
		let transitionendEvent  = function(e) {
			if(assOpt.remove){
				tTarget.remove();
			} else {
				tTarget.classList.remove( 'block' );
				endPop = document.querySelector('.pyo-design-pop').classList.contains('show');
			}
			e.target.removeEventListener('transitionend', transitionendEvent);
			if(!endPop){
				document.querySelector('html').classList.remove( 'pyo-pop-open' );
			}
		}
		tTarget.addEventListener('transitionend', transitionendEvent);
	}
	this.markup = function(assOpt){
		let t = this;
		let popMaxWidth, popMinHeight, popCloseBt, popTitle, popCon;
		// opt set
		assOpt.maxWidth ?  popMaxWidth = 'max-width:'+assOpt.maxWidth+'px' : popMaxWidth = '';
		assOpt.minHetight ? popMinHeight = 'min-height:'+assOpt.minHetight+'px' : popMinHeight = '';
		assOpt.closeBt ? popCloseBt = '<button type="button" class="close-x"><i>닫기</i></button>' : popCloseBt = '';
		assOpt.title ? popTitle = '<div class="pop-title '+ assOpt.titleAlign +'"><h1>'+ assOpt.title +'</h1></div>' : popTitle ='';
		assOpt.con ? popCon = assOpt.con : popCon = '내용이 없습니다.';

		let btWrap, btArr = '', btSet;
		if(assOpt.buttonSet){
			assOpt.buttonSet.reverse ? btSet = assOpt.buttonArr.reverse() : btSet = assOpt.buttonArr;
			if(btSet){
				btSet.forEach(function(v, i ,arr) {
					btArr = btArr + '<div><button type="button" class="'+ v.class +'" id="'+ v.id +'" >'+ v.text +'</button></div>';
				});
			}
			
			assOpt.buttonSet.layOutChange ? btWrap = assOpt.buttonSet.layOutChange : btWrap = '<div class="bt-wrap">'+ btArr +'</div>';
		}
		//// opt set
		let markupTag = document.createElement("div");
		let markupHtml = '<div class="flex-box" style="padding : '+ assOpt.padding +'">'
						+'    <div class="pop-conents-wrap '+ assOpt.layoutClass +'" style="'+ popMaxWidth +'; '+ popMinHeight +'">'
						+         popTitle + popCloseBt
						+'        <div class="pop-contents '+ assOpt.conAlign +'">' + popCon+ '</div>'
						+         btWrap
						+'    </div>'
						+'</div>';

		markupTag.setAttribute('class', 'pyo-design-pop');
		markupTag.setAttribute('id', assOpt.targetId);
		markupTag.setAttribute('style', 'z-index:' + (90000 + document.querySelectorAll('.pyo-design-pop').length) );
		markupTag.innerHTML = markupHtml;
		document.body.appendChild(markupTag);
	}
}