!function() {
    'use strict';

window.B = window.B || {};
var host = '//russianbrides.com.au',
	cgiURLauth = host + '/cgi/publ/auth.pl',
	cgiURL = host + '/cgi/publ/nserv.pl',
	auth = {};
// var prefixURL = 'http://russianbrides.com.au/cgi/nserv.pl';

var Util = {
	reg: {
		email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\\.)+[a-z]{2,6}$/,
		test: /^[\\w]+$/
	},
	getNodes: function(name, fromNode) {
		return (fromNode || document).getElementsByClassName(name);
	},
	getNode: function(name, fromNode) {
		return Util.getNodes(name, fromNode)[0];
	},
	toggleClass: function(node, name) {
		var isExist = L.DomUtil.hasClass(node, name);
		if (isExist) {
			L.DomUtil.removeClass(node, name);
		} else {
			L.DomUtil.addClass(node, name);
		}
		return !isExist;
	},
	_needClose: [],
	_parseList: function(list, func, className) {
		for (var i = 0, len = list.length; i < len; i++) {
			func(list[i], className || 'ant-modal-mask-hidden');
		}
		// console.log('_parseList', list);
	},
	cmdSave: function(ev) {
		// value.search(reg) === -1
		var node = ev.target,
			cmd = node.getAttribute('data-key'),
			formName = cmd + '-form',
			form = Util.getNode(cmd + '-form'),
			par = {cmd: cmd, usr: 'w'};
		if (form && form.length) {
			for (var i = 0, len = form.length; i < len; i++) {
				var it = form[i],
					key = it.getAttribute('data-key');
				par[key] = it.value;
			}
			if (cmd === 'login') {
				par.uAttr = 1;
			} else if (cmd === 'forgot') {
				par.uForgot = 1;
			}

			return L.gmxUtil.requestJSONP(cgiURLauth, par, {callbackParamName: 'callback'}).then(function(json) {
				var pt = json.AUTH;
console.log('cmd', cmd, json);
				if (cmd === 'login') {
					Util._toggleLogin(pt.err ? null : pt);
				} else if (cmd === 'forgot') {
					if (pt.err) {
						var explain = Util.getNode('ant-form-explain', node.parentNode.parentNode.parentNode);
						L.DomUtil.removeClass(explain, 'collapse');
						explain.innerHTML = 'Error: Type in your E-mail you used for registration';
					} else {
						Util.cmdSign(null, par.email);
					}
				}
			});
		}
		console.log('cmdSave', cmd, formName, form, par);
	},
	cmdClose: function() {
		Util._parseList(Util._needClose, L.DomUtil.addClass);
		// console.log('cmdClose', ev);
	},
	cmdHerAddress: function(ev) {
		Util.cmdClose();
		var node = Util.getNode('herAddress');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
		B.Galer.showFullAddress();
	},
	cmdRegister: function(ev) {
		Util.cmdClose();
		var node = Util.getNode('registerDialog');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
		// console.log('cmdRegister', Util._needClose);
		// console.log(node);
	},
	cmdSign: function(ev, email) {
		Util.cmdClose();
		var node = Util.getNode('signDialog');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
		if (email) {
			Util.getNode('error-title', node).innerHTML = 'Check your E-mail: ' + email + ' and Sign In';
		}
		
	},
	_toggleLogin: function(profile) {
		var nodeOff = Util.getNode('rb-signed-off'),
			nodeOn = Util.getNode('rb-signed-on');
		if (profile) {
			auth = profile;
			L.DomUtil.removeClass(nodeOn, 'collapse');
			L.DomUtil.addClass(nodeOff, 'collapse');
		} else {
			auth = {};
			L.DomUtil.removeClass(nodeOff, 'collapse');
			L.DomUtil.addClass(nodeOn, 'collapse');
		}
		Util.cmdClose();
	},
	cmdSignOut: function() {
		Util.cmdClose();
		L.gmx.getJSON(cgiURLauth, {
			params: {logout:1, json:1, usr:'w'},
			options: {type:'json'}
		}).then(function(json) {
			Util._toggleLogin();
			console.log('cmdSignOut', json);
		});
	},
	cmdCheckbox: function(ev) {
		var target = ev.target,
			className = 'ant-checkbox-checked';
		if (target.value === 'on') {
			target.value = 'off';
			L.DomUtil.removeClass(target.parentNode, className);
		} else {
			target.value = 'on';
			L.DomUtil.addClass(target.parentNode, className);
		}
		// console.log('cmdCheckbox', ev);
	},
	_inputError: function(error, node) {
		// var errors = {
		// 	email: 'The input is not valid E-mail!'
		// }
		L.DomUtil.addClass(node, 'has-error');
		var explain = Util.getNode('ant-form-explain', node);
		if (explain) {
			L.DomUtil.removeClass(explain, 'collapse');
		}
		
		// console.log('_inputError', node, error);
	},
	onInputChange: function(ev) {
		if (Util.__onInputChangeTimer) { clearTimeout(Util.__onInputChangeTimer); }
		Util.__onInputChangeTimer = setTimeout(Util._onInputChange.bind(this, ev), 250);
	},
	_onInputChange: function(ev) {
		var target = ev.target,
			parentNode = target.parentNode.parentNode,
			val = target.value.trim(),
			type = target.getAttribute('data-key'),
			res = null;
		if (type === 'onum') {
			if (val.indexOf ('@') > 0)  {	// email
				type = 'email';
			} else {
				if (typeof(val) === 'string') {
					var arr = val.match(/(\d+)/);
					if (!arr) {
						Util._inputError('email', parentNode);
						return;
					} else {
						val = Number(arr[0]);
					}
				}
			}
		}
		if (type === 'email') {
			if (val.length > 80 || val.indexOf ('|') > -1 || val.indexOf ('@') === -1 || val.indexOf ('.') === -1) {
				Util._inputError('email', parentNode);
				return;
			}
		} else if (type === 'pass') {
			if (val.length > 80) {
				Util._inputError('pass', parentNode);
				return;
			}
		}
		L.DomUtil.removeClass(parentNode, 'has-error');
		L.DomUtil.addClass(parentNode, 'has-success');
		var explain = Util.getNode('ant-form-explain', parentNode);
		if (explain) {
			L.DomUtil.addClass(explain, 'collapse');
		}
		// console.log('onInputChange', type, val, res);
	},
	cmdForgot: function() {
		Util.cmdClose();
		var node = Util.getNode('forgotDialog');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
	},
	_promises: {
		_sessionKeys: {},
		_maps: {}
	}
};
var arr = location.search.split('&'),
	len = arr.length,
	out = {par: {}};
if (arr[0].indexOf('?') === 0) arr[0] = arr[0].substr(1);
if (arr[len - 1].indexOf('#') === 0) {
	out.achor = arr[len - 1].substr(1);
	len--;
}
for (var i = 0; i < len; i++) {
	var pv = arr[i].split('=');
	out.par[pv[0]] = pv[1];
}
Util.urlParams = out;

for (var i = 0, list = Util.getNodes('ant-input'), len = list.length; i < len; i++) {
	var target = list[i],
		type = target.getAttribute('data-key');
	if (type === 'onum') { L.DomEvent.on(target, 'change', Util.onInputChange, Util); }
	L.DomEvent.on(target, 'keypress', Util.onInputChange, Util);
}

['cmdHerAddress', 'cmdRegister', 'cmdSign', 'cmdSignOut', 'cmdForgot', 'cmdClose', 'cmdSave', 'cmdCheckbox'].forEach(function(name) {
	for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
		L.DomEvent.on(list[i], 'click', Util[name] || console.log, Util);
	}
});
L.gmx.getJSON(cgiURLauth, {
	params: {json:1, uAttr:1, usr:'w'},
	options: {type:'json'}
}).then(function(json) {
	var pt = json.res.AUTH;
	Util._toggleLogin(pt.err ? null : pt);
});

window.B.Util = Util;

var Galer = {
	templ: '<div class="col-sm-4 col-md-3">\
				<div class="box image-zoom">\
					<div class="box-picture">\
						<div class="flag">_pName_</div>\
						<div class="box-content">\
							<table class="box-table box-picture-meta">\
								<tbody><tr>\
									<td><strong>Profile</strong><br>_onum_<sup></sup></td>\
									<td><strong>Age</strong><br>_age_</td>\
									<td><strong>Children</strong><br>_nkids_</td>\
									<td><strong>English</strong><br>_engurov_</td>\
								</tr></tbody>\
							</table>\
						</div>\
						<img src="' + host + '/__jpg2_" alt="" onerror="this.src=\'./css/img/blank_gender_.jpg\'; this.onerror=\'\';" class="rb-image-zoom" onum="_onum_" gender="_gender_">\
					</div>\
					<div class="box-body">\
						<h2 class="box-title-plain">_pName_</h2>\
						<div class="box-location box-subtitle">\
							<div class="location-country">_city_ (_country_)</div>\
						</div>\
					</div>\
				</div>\
			</div>',
	_clickPage: function(ev) {
		var target = ev.target,
			node = target.tagName.toLowerCase() === 'li' ? target : target.parentNode;
		if (node.attributes['aria-disabled'] && !node.attributes['aria-disabled'].value) {
			return;
		}
		var title = node.title,
			cp = Galer.cp,
			nm = Galer.cp;
		if (title.indexOf('Next Page') > -1) {
			nm++;
		} else if (title.indexOf('Next 5 Pages') > -1) {
			nm += 5;
		} else if (title.indexOf('Previous Page') > -1) {
			nm--;
		} else if (title.indexOf('Previous 5 Pages') > -1) {
			nm -= 5;
		} else {
			var arr = /\d+/.exec(title);
			if (arr && arr.length) {
				nm = arr[0];
			}
		}
		nm--;
		if (nm > Galer.lp) {nm = Galer.lp;}
		Galer.getPage(nm);
		//console.log('t1', nm, node, 't2', title);
	},
	cp: 1,
	lp: 1,
	getPagination: function(c, cnt) {
		var arr = [],
			cp = Math.floor(c / 8) + 1,
			lp = Math.floor(cnt / 8),
			i, p;

		Galer.lp = lp;
		p = Galer.cp = cp;

		var p5, n5,
			addLi = function(nm, unshift, active) {
				var st = '<li title="'+ nm +'" class="ant-pagination-item ant-pagination-item-'+ nm;
				if (active) {st += ' ant-pagination-item-active';}
				st += '" tabindex="0"><a>'+ nm +'</a></li>';
				if (unshift) {
					arr.unshift(st);
				} else {
					arr.push(st);
				}
			};
		addLi(p, false, true);							// текущая
		if (cp > 4 && cp < lp - 3) {					// середина
			p5 = n5 = true;
			p = cp + 1;
			arr.push('<li title="'+ p +'" class="ant-pagination-item ant-pagination-item-'+ p +' tabindex="0"><a>'+ p +'</a></li>');
			p = cp - 1;
			arr.unshift('<li title="'+ p +'" class="ant-pagination-item ant-pagination-item-'+ p +' tabindex="0"><a>'+ p +'</a></li>');
		} else if (cp >= lp - 3 && cp <= lp) {			// текущая в конце
			p5 = true;
			addLi(cp - 1, true);
			if (cp > lp - 2) {
				addLi(cp - 2, true);
				if (cp === lp) {addLi(cp - 3, true);}
			} else {
				addLi(cp + 1);
				if (cp === lp - 3) {addLi(cp + 2);}
			}
		} else if (cp < 5) {							// текущая в начале
			n5 = true;
			if (cp < 3) {
				addLi(cp + 1);
				addLi(cp + 2);
				if (cp === 1) {addLi(cp + 3);}
			} else {
				if (cp === 4) {addLi(cp + 1);}
				addLi(cp - 1, true);
				if (cp === 3) {addLi(cp + 1);}
				if (cp === 4) {addLi(cp - 2, true);}
			}
		}
		if (p5) {					// Previous 5
			arr.unshift('<li title="Previous 5 Pages" tabindex="0" class="ant-pagination-jump-prev"><a class="ant-pagination-item-link"></a></li>');
		}
		if (n5) {					// Next 5
			arr.push('<li title="Next 5 Pages" tabindex="0" class="ant-pagination-jump-next"><a class="ant-pagination-item-link"></a></li>');
		}
		if (cp !== lp) {			// Последняя
			addLi(lp);
		}
		if (cp !== 1) {				// Первая
			addLi(1, true);
		}
		arr.unshift('<li title="Previous Page" class="'+ (cp === 1 ? 'ant-pagination-disabled' : '') +' ant-pagination-prev" tabindex="0"><a class="ant-pagination-item-link"></a></li>');
		arr.push('<li title="Next Page" class="'+ (cp === lp ? 'ant-pagination-disabled' : '') +' ant-pagination-next" tabindex="0"><a class="ant-pagination-item-link"></a></li>');
		arr.unshift('<ul class="ant-pagination ant-table-pagination" unselectable="unselectable">');
		arr.push('</ul>');
		var out = arr.join('\n');
		for (var i = 0, list = Util.getNodes('rb-pagination-row'), len = list.length; i < len; i++) {
			list[i].innerHTML = out;
		}
		return len;
	},
	getPage: function(nm, to) {
		nm = nm || 0;
		var opt = {
			options: {
				//credentials: false,
				type: 'json'
			},
			params: {
				cmd: 'gal',
				usr: 'm',
				f: nm * 8,
				byAge: 0
			}
		};
		if (Util.urlParams.par.to) opt.params.nw = Util.urlParams.par.to;
		var cont = Util.getNodes('galerList')[0];

		return L.gmxUtil.requestJSONP(cgiURL, opt.params, {callbackParamName: 'callback'}).then(function(json) {
		// return L.gmx.getJSON(cgiURL, opt).then(function(json) {
			var galer = json.galer;
			if (json.res) {
				if (typeof(json.res) === 'string') {
					var txt = JSON.parse(json.res);
					json.res = txt;
				}
				galer = json.res.galer;
			}
			var out = [],
				//galer = json.res.galer,
				pagination = Galer.getPagination(Number(galer.from), Number(galer.count.cnt)),
				arr = galer.arr.slice(0, pagination ? 8 : 4);

			// if (pagination) out.push(pagination);
			Galer.galer = {};
			arr.forEach(function(it) {
				it.pName = it.fname.charAt(0).toUpperCase() + it.fname.slice(1) + ' ' + it.sname.charAt(0).toUpperCase() + '.';
				it.age = new Date().getFullYear() - new Date(it.yy || it.pdata.yy, (it.mm || it.pdata.mm) - 1).getFullYear();
				it.gender = opt.params.usr;
				it.fullname = it.fname + ' ' + it.sname;
				var addru = it.pdata.addru;
				if (!addru) {
					addru = it.pdata.country + ', ' + it.pdata.city;
				}
				it.address = addru + '<br>' + it.fullname;
				it.talk = host + '/talk.html?usr=' + it.gender + '&onum=' + it.onum + '&ns=' + it.onum;
				
				var st = Galer.templ;
				st = st.replace(/_(\w+)_/g, function(match, contents, offset, input_string) {
					return it[contents] || it.pdata[contents];
				});
				out.push(st);
				Galer.galer[it.onum] = it;
				// console.log('__', st);
			});
			// if (pagination) out.push(pagination);
			cont.innerHTML = out.join('\n');

			if (Util.urlParams.par.to) {
				Galer._showItem(Util.urlParams.par.to);
			}
		});
	},
	galer: {},
	templItem: '',
	rbPhotoCatalog: null,
	rbItemDetail: null,
	_putImageSrc: function(it, node, nm) {
		nm = nm || 2;
		node = node || Galer.rbItemDetail;
		var jpg = '_jpg' + nm,
			zn = it[jpg] || it.pdata[jpg];

		var list = Util.getNodes('rb-src-jpg' + nm, node);
		for (var i = 0, len = list.length; i < len; i++) {
			var node1 = list[i];
			node1.src = host + '/' + zn;
		}
// console.log('_ _putImageSrc __', it);
	},
	_putHref: function(zn, className, node) {
		node = node || Galer.rbItemDetail;

		var list = Util.getNodes(className, node);
		for (var i = 0, len = list.length; i < len; i++) {
			var node1 = list[i];
			if (className === 'rb-href-url') {
				node1.href = zn;
			} else if (className === 'rb-href-email') {
				node1.href = 'mailto:' + zn;
				node1.innerHTML = zn;
			}
		}
// console.log('_ _putImageSrc __', it);
	},
	_putItem: function(it, node) {
		node = node || Galer.rbItemDetail;
		var arr = Object.keys(it.pdata).concat(Object.keys(it));

		arr.forEach(function(key) {
			var list = Util.getNodes('rb-item-' + key, node),
				zn = it[key] || it.pdata[key];
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].innerHTML = zn;
			}
		});
	},
	_curNum: null,
	getItem: function(num) {
		return Galer.galer[num || Galer._curNum];
	},
	showFullAddress: function(num) {
		// console.log('cmdRegister', Util._needClose);
		var it = Galer.galer[num || Galer._curNum],
			herAddress = Util.getNodes('herAddress')[0];
		Galer._putItem(it, herAddress);
		Galer._putImageSrc(it, herAddress, 1);
		Galer._putHref(it.talk, 'rb-href-url', herAddress);
		Galer._putHref(it.email, 'rb-href-email', herAddress);
		console.log(it);
	},
	_showItem: function(onum) {
		if (!Galer.rbPhotoCatalog) {
			Galer.rbPhotoCatalog = Util.getNodes('rb-photo-catalog')[0];
			Galer.rbItemDetail = Util.getNodes('rb-item-detail')[0];
		}
		Galer._curNum = onum;
		if (!Galer.rbPhotoCatalog) {
			location.href = 'catalogue.html?to=' + onum;
			// Galer.getPage(null, onum);
			return true;
		}
		var rbPhotoCatalog = Galer.rbPhotoCatalog,
			rbItemDetail = Galer.rbItemDetail,
			it = Galer.galer[onum];
		if (it) {
			Galer._putItem(it);
			Galer._putImageSrc(it);
			L.DomUtil.addClass(rbPhotoCatalog, 'collapse');
			L.DomUtil.removeClass(rbItemDetail, 'collapse');
		} else {
			if (Util.urlParams.par.to) {
				location.href = 'catalogue.html';
				return true;
			}
			L.DomUtil.addClass(rbItemDetail, 'collapse');
			L.DomUtil.removeClass(rbPhotoCatalog, 'collapse');
		}
	},
	_clickItem: function(ev) {
		var node = ev.target,
			onum = node.attributes.onum && node.attributes.onum.value;
		Galer._showItem(onum);
	},
	_clickTab: function(ev) {
		var node = ev.target,
			li = node.parentNode,
			tab = li.attributes.tabName && li.attributes.tabName.value;
		for (var i = 0, list = li.parentNode.children, len = list.length; i < len; i++) {
			var it = list[i],
				name = it.attributes.tabName && it.attributes.tabName.value,
				func = tab === name ? L.DomUtil.addClass : L.DomUtil.removeClass;

			func(it, 'active');
			func(document.getElementById(name), 'active');
		}
// console.log('_clickTab __', tab);
	},
	onErrorSrc: function(it) {
// console.log('onErrorSrc __', it);
	}
};

var itemsCont = Util.getNodes('rb-back-button')[0];
if (itemsCont) {
	L.DomEvent.on(itemsCont, 'click', Galer._clickItem);
}
itemsCont = Util.getNodes('galerList')[0];
if (itemsCont) {
	L.DomEvent.on(itemsCont, 'click', Galer._clickItem);
}
itemsCont = Util.getNodes('rb-tab-nav')[0];
if (itemsCont) {
	L.DomEvent.on(itemsCont, 'click', Galer._clickTab);
}

for (var i = 0, list = Util.getNodes('rb-pagination-row'), len = list.length; i < len; i++) {
	L.DomEvent.on(list[i], 'click', Galer._clickPage);
}

window.B.Galer = Galer;

var Menu = {
	rbMenuContent: null,
	toogle: function(it) {
// console.log('toogle __', it);
		if (!Menu.rbMenuContent) {
			Menu.rbMenuContent = Util.getNodes('rb-menu-content')[0];
		}
		Util.toggleClass(Menu.rbMenuContent, 'collapse');
	}
};
window.B.Menu = Menu;

itemsCont = Util.getNodes('rb-menu-button')[0];
if (itemsCont) {
	L.DomEvent.on(itemsCont, 'click', Menu.toogle);
}

}();
