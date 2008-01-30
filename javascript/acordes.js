$(function() {
	$('.js-acorde').each(function() {
		var _0_s, _0_acordes = (_0_s = $.trim($(this).html())).split(/\s+/),
			_0_graphics = strings(_0_acordes),
			_0_i = 0,
			_0_t,
			_0_o;

		alert(pestana(_0_acordes));
		$(this).attr('title', _0_s);
		$(this).html('');
		$(this).append(['<div class="acorde-bull acorde-bull-p', _0_graphics.disc,'"><img src="imagens/dec.disc.gif" width="5" height="5"></div>'].join(''));
		for(_0_o = _0_graphics.xis, _0_t = _0_o.length; _0_i < _0_t; _0_i++)
			$(this).append(['<div class="acorde-bull acorde-bull-p', _0_o[_0_i],'"><img src="imagens/dec.xis.gif" width="5" height="5"></div>'].join(''));
		for(_0_o = _0_graphics.circles, _0_i = 0, _0_t = _0_o.length; _0_i < _0_t; _0_i++)
			$(this).append(['<div class="acorde-bull acorde-bull-p', _0_o[_0_i],'"><img src="imagens/dec.circle.gif" width="5" height="5"></div>'].join(''));
	});
});

function pressed_fingers(acorde_arr) {
	// conta quantos numeros acima de 0 diferentes entre si existem no acorde para saber se será necessário pestana
	var t = acorde_arr.length, r = acorde_arr.slice(0);	
	for(; --t > -1;) { if(r[t].toLowerCase() == 'x' || r[t] == '0') r.remove(t); }
	return r || [];
}

function pestana(acorde_arr) {
	if(pressed_fingers(acorde_arr).length > 4) { // terá que haver pestana
		var zeros = acorde_arr.indexesOf('0');
		alert(min(acorde_arr, function(b, a) { alert(b[a] + "ooo"); return b[a] > 0 ? a : false; }));
		var minors = acorde_arr.indexesOf(acorde_arr[min(acorde_arr, function(b, a) { return b[a] > 0 ? a : false; })]);
		return ["--" + zeros.join('-') + "--", "--" + minors.join('-') + "--"]
	}
	return [];
}

function strings(acorde_arr) {
	// retorna um object('hash') indicando quais cordas nao serao tocadas, a primeira a ser tocada e as demais a serem tocadas
	var i = 0, t = acorde_arr.length, r = {circles: [], disc: -1, xis: []};
	for(; i < t; i++) {
		if(acorde_arr[i].toLowerCase() == 'x')
			r.xis[r.xis.length] = i;
		else
			r.circles[r.circles.length] = i;
	}
	r.disc = r.circles.shift();
	return r;
}

Array.prototype.indexesOf = function(value) {
	var i = 0, t = this.length, r = [];
	for(; i < t; i++) { if(this[i] === value) r[r.length] = i; }
	return r;
}

Array.prototype.remove = function(index) {
	return (this.splice(index, 1), this);
}

function min(arr, callback) {
	// retorna o menor valor numerico de #arr desde que o menor satisfaca a callback
	var
		i = 1,
		t = arr.length,
		min = 0;
	
	for(; i < t; i++) arr[min] > arr[i] && (callback ? callback.apply(false, [arr, min]) : 1) && (min = i);
	return callback ? callback.apply(false, [arr, min]) : min;
}

function max(arr, callback) {
	var
		i = 1,
		t = arr.length,
		max = 0;
	
	for(; i < t; i++) arr[max] < arr[i] && (callback ? callback.apply(false, [arr, max]) : 1) && (max = i);
	return callback ? ((max = callback.apply(false, [arr, max])) ? max : false) : max;
}