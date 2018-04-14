!function() {
    'use strict';

window.B = window.B || {};

var Util = {
	getNodes: function(name, fromNode) {
		return (fromNode || document).getElementsByClassName(name);
	},
	getNode: function(name, fromNode) {
		return Util.getNodes(name, fromNode)[0];
	},
	_needClose: [],
	_parseList: function(list, func, className) {
		for (var i = 0, len = list.length; i < len; i++) {
			func(list[i], className || 'ant-modal-mask-hidden');
		}
		console.log('_parseList', list);
	},
	cmdClose: function() {
		Util._parseList(Util._needClose, L.DomUtil.addClass);
		// console.log('cmdClose', ev);
	},
	cmdRegister: function(ev) {
		Util.cmdClose();
		var node = Util.getNode('registerDialog');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
		// console.log('cmdRegister', Util._needClose);
		// console.log(node);
	},
	cmdSign: function() {
		Util.cmdClose();
		var node = Util.getNode('signDialog');
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
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
		console.log('cmdCheckbox', ev);
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

['cmdRegister', 'cmdSign', 'cmdForgot', 'cmdClose', 'cmdSave', 'cmdCheckbox'].forEach(function(name) {
	for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
		L.DomEvent.on(list[i], 'click', Util[name] || console.log, Util);
	}
});

window.B.Util = Util;

var prefixURL = 'http://russianbrides.com.au/cgi/publ/nserv.pl';
// var prefixURL = 'http://russianbrides.com.au/cgi/nserv.pl';
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
						<img src="http://russianbrides.com.au/__jpg2_" alt="" onerror="this.src=\'./css/img/blank_gender_.jpg\'; this.onerror=\'\';" class="rb-image-zoom" onum="_onum_" gender="_gender_">\
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
	},
	getPage: function(nm, title) {
		nm = nm || 0;
		title = title || '<h3 class="widgetized-title">Photo Catalogue<br><span class="rb-sub-title">Browse through the Russian Bride Photo Catalogue</span></h3>';
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
		var cont = Util.getNodes('galerList')[0];
		
		return L.gmx.getJSON(prefixURL, opt).then(function(json) {
			// console.log('ddd', json);
			var out = [],
				galer = json.res.galer,
				cnt = Number(galer.count.cnt),
				b = Number(galer.from),
				pagination = Galer.getPagination(b, cnt),
				ep = Math.floor((cnt - b)/8),
				len = ep > 7 ? 7 : ep,
				arr = galer.arr;

			out.push(pagination);
			Galer.galer = {};
			arr.forEach(function(it) {
				it.pName = it.fname.charAt(0).toUpperCase() + it.fname.slice(1) + ' ' + it.sname.charAt(0).toUpperCase() + '.';
				it.age = new Date().getFullYear() - new Date(it.yy, it.month - 1).getFullYear();
				it.gender = opt.params.usr;
				var st = Galer.templ;
				st = st.replace(/_(\w+)_/g, function(match, contents, offset, input_string) {
					return it[contents] || it.pdata[contents];
				});
				out.push(st);
				Galer.galer[it.onum] = it;
				// console.log('__', st);
			});
			out.push(pagination);
			cont.innerHTML = out.join('\n');
		});
	},
	galer: {},
	templItem: '',
	_clickItem: function(ev) {
		var node = ev.target,
			onum = node.attributes.onum && node.attributes.onum.value,
			it = Galer.galer[onum];
		if (it) {
			//return;
		}
console.log('_clickItem__', onum, it);
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
console.log('_clickTab __', tab);
	}
};
var itemsCont = Util.getNodes('galerList')[0];
if (itemsCont) {
	L.DomEvent.on(itemsCont, 'click', Galer._clickItem);
}
var _clickTab = Util.getNodes('rb-tab-nav')[0];
if (_clickTab) {
	L.DomEvent.on(_clickTab, 'click', Galer._clickTab);
}

for (var i = 0, list = Util.getNodes('rb-pagination-row'), len = list.length; i < len; i++) {
	L.DomEvent.on(list[i], 'click', Galer._clickPage);
}
window.B.Galer = Galer;
}();