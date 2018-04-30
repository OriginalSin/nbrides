!function() {
    'use strict';

window.B = window.B || {};
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
var urlParams = out;

var host = '//russianbrides.com.au',
	cgiURLauth = host + '/cgi/publ/auth.pl',
	cgiURL = host + '/cgi/publ/nserv.pl',
	auth = {
		usr: urlParams.par.usr || 'm'
	};
// var prefixURL = 'http://russianbrides.com.au/cgi/nserv.pl';
var templates = {
	'rb-header1': '<div class="container clearfix">\
			<div class="ant-radio-group ant-radio-group-large rb-float-left">\
				<label data-usr="m" class="cmdFlag ant-radio-button-wrapper {mChecked}"><span class="ant-radio-button ant-radio-button-checked"><span class="ant-radio-button-inner"></span></span><span><img class="language-flag" src="css/img/au.png" alt="au" title="Australia"></span></label>\
				<label data-usr="w" class="cmdFlag ant-radio-button-wrapper {wChecked}"><span class="ant-radio-button"><span class="ant-radio-button-inner"></span></span><span><img class="language-flag" src="css/img/ru.png" alt="ru" title="Russia"></span></label>\
			</div>\
			<div class="rb-cont-sign rb-float-right rb-signed-off">\
				<span class="cmdRegister rb-float-left"><div class="fa fa-users"><span>Register</span></div></span>\
				<span class="cmdSign rb-float-right"><div class="fa fa-sign-in"><span>Login</span></div></span>\
			</div>\
			<ul class="header-submenu pull-right rb-signed-on collapse">\
				<li>\
					<span class="fa fa-sign-out cmdSignOut"><span class="rb-pointer" title="Sign Out">Logout</span></span>\
					<span class="mail-User-Picture js-user-picture is-updated rb-edit-profile"></span>\
				</li>\
			</ul>\
		</div>\
	',
	'rb-nav': '<div class="navbar-header">\
			<button type="button" class="navbar-toggle rb-menu-button" data-toggle="collapse" data-target=".navbar-main">\
				<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span>\
				<span class="icon-bar"></span>\
			</button>\
			<a class="navbar-brand rb-vert-10" href="index.html?usr={usr}">\
				<span class="logo-styled">\
					<span class="logo-title">\
						<img src="http://russianbrides.com.au/img/logo_big.gif" height="50" alt="" data-evernote-hover-show="true">\
					</span>\
					<span class="logo-subtitle hidden-sm"></span>\
				</span>\
			</a>\
		</div>\
		<div class="navbar-collapse navbar-main rb-menu-content collapse">\
			<ul class="nav navbar-nav navbar-right rb-menu-button">\
				<li class="menuparent"><a href="index.html?usr={usr}&onum={onum}">Home</a></li>\
				<li class="menuparent"><a href="catalogue.html?usr={usr}">Catalogue</a></li>\
				<li class="menuparent"><a href="service.html">Service and Prices</a></li>\
				<li class="menuparent  columns4"><a href="#">Contact</a>\
					<ul>\
						<li><a href="service.html">Service and Prices</a></li>\
						<li><a href="listing-grid.html">Grid Version</a></li>\
						<li><a href="listing-grid-filter.html">Grid + Filter</a></li>\
						<li><a href="listing-row.html">Row Version</a></li>\
						<li><a href="listing-row-filter.html">Row + Filter</a></li>\
					</ul>\
				</li>\
			</ul>\
		</div>\
	',
	registerDialog: '<div class="ant-modal-mask ant-modal-mask-hidden"></div>\
		<div tabindex="-1" class="ant-modal-wrap ant-modal-mask-hidden" role="dialog" aria-labelledby="rcDialogTitle0">\
			<div role="document" class="ant-modal" style="width: 520px; transform-origin: 515px -83px 0px;">\
				<div class="ant-modal-content">\
					<button aria-label="Close" class="ant-modal-close cmdClose"><span class="ant-modal-close-x "></span></button>\
					<div class="ant-modal-header">\
						<div class="ant-modal-title" id="rcDialogTitle0">Register</div>\
					</div>\
					<div class="ant-modal-body">\
						<form class="ant-form ant-form-horizontal register-form">\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-feedback">\
									<span class="ant-input-affix-wrapper">\
										<span class="ant-input-prefix"><i class="anticon anticon-mail" style="font-size: 13px;"></i></span>\
										<input type="text" placeholder="Please input your E-mail!" value="" data-key="email" class="ant-input ant-input-lg">\
									</span>\
									<div class="ant-form-explain collapse">The input is not valid E-mail!</div>\
									</div>\
								</div>\
							</div>\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-success">\
										<div class="floatRight">\
											<span class="login-form-forgot cmdForgot">Forgot password</span> or <span><span class="login-form-forgot cmdSign">Sign In</span></span>\
										</div>\
									</div>\
								</div>\
							</div>\
						</form>\
					</div>\
					<div class="ant-modal-footer">\
						<button type="button" class="ant-btn ant-btn-lg cmdClose"><span>Cancel</span></button>\
						<button type="button" data-key="register" class="ant-btn ant-btn-primary ant-btn-lg cmdSave"><span data-key="register">Register</span></button>\
					</div>\
					<div class="ant-modal-body info">\
						<font color="Black"><font color="Red"><b>IMPORTANT!</b></font> We do not send unsolicited email or spam to our customers or anyone else. The only email we send is email about your account or membership. After you sign in we will send you confirmation of your registration with your ID and PASSWORD. \
							<br><br>Many ISP (Internet Service Providers) and mail service providers like <b>@optusnet.com.au</b> and other are starting to use filters to keep out spam. Unfortunately, this often means they are keeping out our email to you about your registration, too. The only solution to this problem is for you to be aware what triggers your ISPs blockage and make sure they understand you want to receive our email.<br><br>Some email providers filter messages based on content, subject line, or the sender\'s address and may put your email into the a bulk or junk mail folder. Please make sure <br><b>@russianbrides.com.au</b> <br>is on your "approved sender" list or "whitelist" and/or in your "address book".</font>\
					</div>\
				</div><div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>\
			</div>\
		</div>\
	',
	signDialog: '<div class="ant-modal-mask ant-modal-mask-hidden"></div>\
		<div tabindex="-1" class="ant-modal-wrap ant-modal-mask-hidden" role="dialog" aria-labelledby="rcDialogTitle1">\
			<div role="document" class="ant-modal" style="width: 520px; transform-origin: 590px -85px 0px;">\
				<div class="ant-modal-content">\
					<button aria-label="Close" class="ant-modal-close cmdClose"><span class="ant-modal-close-x"></span></button>\
					<div class="ant-modal-header">\
						<div class="ant-modal-title" id="rcDialogTitle1">Sign In</div>\
					</div>\
					<div class="ant-modal-body">\
						<div class="error-title"></div>\
						<form class="ant-form ant-form-horizontal login-form">\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-feedback">\
									<span class="ant-input-affix-wrapper">\
										<span class="ant-input-prefix"><i class="anticon anticon-user" style="font-size: 13px;"></i></span>\
										<input type="text" placeholder="Your ID or email" value="" data-key="onum" class="ant-input ant-input-lg">\
									</span>\
									<div class="ant-form-explain collapse">The input is not valid E-mail!</div>\
									</div>\
								</div>\
							</div>\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-feedback">\
									<span class="ant-input-affix-wrapper">\
										<span class="ant-input-prefix"><i class="anticon anticon-lock" style="font-size: 13px;"></i></span>\
										<input type="password" placeholder="Password" value="" data-key="pass" class="ant-input ant-input-lg">\
									</span>\
									<div class="ant-form-explain collapse">The input is not valid length!</div>\
									</div>\
								</div>\
							</div>\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-success">\
										<label class="ant-checkbox-wrapper">\
											<span class="ant-checkbox ant-checkbox-checked cmdCheckbox">\
												<input type="checkbox" class="ant-checkbox-input" data-key="remember" value="on">\
												<span class="ant-checkbox-inner"></span>\
											</span>\
											<span>Remember me</span>\
										</label>\
										<div class="floatRight">\
											<span class="login-form-forgot cmdForgot">Forgot password</span> or <span><span class="login-form-forgot cmdRegister">Register now!</span></span>\
										</div>\
									</div>\
								</div>\
							</div>\
						</form>\
					</div>\
					<div class="ant-modal-footer">\
						<button type="button" class="ant-btn ant-btn-lg cmdClose"><span>Cancel</span></button>\
						<button type="button" data-key="login" class="ant-btn ant-btn-primary ant-btn-lg cmdSave"><span data-key="login">Log in</span></button>\
					</div>\
				</div>\
				<div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>\
			</div>\
		</div>\
	',
	forgotDialog: '<div class="ant-modal-mask ant-modal-mask-hidden"></div>\
		<div tabindex="-1" class="ant-modal-wrap ant-modal-mask-hidden" role="dialog" aria-labelledby="rcDialogTitle2">\
			<div role="document" class="ant-modal" style="width: 520px; transform-origin: 537px 190px 0px;">\
				<div class="ant-modal-content">\
					<button aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x cmdClose"></span></button>\
					<div class="ant-modal-header">\
						<div class="ant-modal-title" id="rcDialogTitle2">Forgot password</div>\
					</div>\
					<div class="ant-modal-body">\
						<div class="error-title"></div>\
						<form class="ant-form ant-form-horizontal forgot-form">\
							<div class="ant-row ant-form-item">\
								<div class="ant-form-item-control-wrapper">\
									<div class="ant-form-item-control has-feedback">\
										<span class="ant-input-affix-wrapper">\
										<span class="ant-input-prefix"><i class="anticon anticon-mail" style="font-size: 13px;"></i></span>\
										<input type="text" data-key="email" placeholder="Please input your E-mail!" value="" class="ant-input ant-input-lg">\
										</span>\
										<div class="ant-form-explain collapse">The input is not valid E-mail!</div>\
									</div>\
								</div>\
							</div>\
						</form>\
					</div>\
					<div class="ant-modal-footer">\
						<button type="button" class="ant-btn ant-btn-lg cmdClose"><span>Cancel</span></button>\
						<button type="button" data-key="forgot" class="ant-btn ant-btn-primary ant-btn-lg cmdSave"><span data-key="forgot">Send</span></button>\
					</div>\
					<div class="ant-modal-body info">\
						You will receive a password in your E-mail very soon.\
					</div>\
				</div>\
				<div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>\
			</div>\
		</div>\
	',
	galer1: '<div class="col-sm-4 col-md-3">\
		<div class="box image-zoom">\
			<div class="box-picture">\
				<div class="flag">_pName_</div>\
				<div class="box-content">\
					<table class="box-table box-picture-meta">\
						<tbody><tr>\
							<td><strong>Profile</strong><br>_onum_<sup></sup></td>\
							<td><strong>Age</strong><br>_age_</td>\
							<td><strong>Children</strong><br>_nkids_</td>\
							<td><strong>_langName_</strong><br>_engurov_</td>\
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
	</div>'
	,

};

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
			par = {cmd: cmd, usr: auth.usr};
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
			} else if (cmd === 'register') {
				par.uForgot = 1;
			}

			return L.gmxUtil.requestJSONP(cgiURLauth, par, {callbackParamName: 'callback'}).then(function(json) {
				var pt = json.AUTH;
console.log('cmd', cmd, json);
				if (cmd === 'login') {
					Util._toggleLogin(pt.err ? null : pt);
				} else if (cmd === 'register') {
					if (pt.pageType === 'Login') {
						Util.cmdSign(null, par.email);
					}
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
	},
	_chkOpl: function() {
		var out = false;
		if (auth.usr === 'm' && auth.op2) {
			out = true;
		} else {
			Util._prpModal('signDialog', {needSign: true});
		}
		
		// console.log('_chkOpl', auth);
		return out;
	},
	cmdTalk: function(ev) {
		if (Util._chkOpl()) {
			Util.cmdClose();
		}
	},
	cmdHerAddress: function(ev) {
		if (Util._chkOpl()) {
			Util.cmdClose();
			var node = Util.getNode('herAddress');
			Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
			Util._parseList(Util._needClose, L.DomUtil.removeClass);
			B.Galer.showFullAddress();
		}
	},
	_prpModal: function(name, opt) {
		Util.cmdClose();
		opt = opt || {};
		var node = Util.getNode(name),
			str = templates[name],
			dop = {};
		// dop[auth.usr + 'Checked'] = 'ant-radio-button-wrapper-checked';
		// str = str.replace(/{(\w+)}/g, function(tmp, key) {
		// 	return auth[key] || dop[key] || '';
		// });
		node.innerHTML = str;

		for (var i = 0, list = Util.getNodes('ant-input', node), len = list.length; i < len; i++) {
			var target = list[i],
				type = target.getAttribute('data-key');
			if (type === 'onum') { L.DomEvent.on(target, 'change', Util.onInputChange, Util); }
			L.DomEvent.on(target, 'keypress', Util.onInputChange, Util);
		}
		
		['cmdRegister', 'cmdSign', 'cmdForgot', 'cmdClose', 'cmdSave', 'cmdCheckbox'].forEach(function(name) {
			for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
				L.DomEvent.on(list[i], 'click', Util[name] || console.log, Util);
			}
		});
		Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		Util._parseList(Util._needClose, L.DomUtil.removeClass);
		if (opt.email) {
			Util.getNode('error-title', node).innerHTML = 'Check your E-mail: ' + opt.email + ' and Sign In';
		}
		if (opt.needSign) {
			Util.getNode('error-title', node).innerHTML = 'Please enter your ID and Password to Sign in';
		}
		
		// console.log('cmdRegister', Util._needClose);
		// console.log(node);
	},
	cmdRegister: function() {
		Util._prpModal('registerDialog');
	},
	cmdSign: function(ev, email) {
		Util._prpModal('signDialog', {email: email});
	},
	// cmdSign1: function(ev, email) {
	// 	Util.cmdClose();
	// 	var node = Util.getNode('signDialog');
	// 	Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
	// 	Util._parseList(Util._needClose, L.DomUtil.removeClass);
	// 	if (email) {
	// 		Util.getNode('error-title', node).innerHTML = 'Check your E-mail: ' + email + ' and Sign In';
	// 	}
		
	// },
	cmdForgot: function() {
		Util._prpModal('forgotDialog');
		// Util.cmdClose();
		// var node = Util.getNode('forgotDialog');
		// Util._needClose = [Util.getNode('ant-modal-mask', node), Util.getNode('ant-modal-wrap', node)];
		// Util._parseList(Util._needClose, L.DomUtil.removeClass);
	},
	_togglePaypal: function(flag) {
		var addClass = 'paypal',
			removeClass = 'notpaypal',
			i, list, len, node;
		if (flag) {
			addClass = 'notpaypal';
			removeClass = 'paypal';
			
		}
		for (i = 0, list = Util.getNodes(addClass), len = list.length; i < len; i++) {
			node = list[i];
			if (node) L.DomUtil.addClass(node, 'collapse');
		}
		for (i = 0, list = Util.getNodes(removeClass), len = list.length; i < len; i++) {
			node = list[i];
			if (node) L.DomUtil.removeClass(node, 'collapse');
		}
	},
	_toggleLogin: function(profile) {
		var nodeOff = Util.getNode('rb-signed-off'),
			nodeOn = Util.getNode('rb-signed-on');
		if (profile) {
			auth = profile;
			L.DomUtil.removeClass(nodeOn, 'collapse');
			L.DomUtil.addClass(nodeOff, 'collapse');
			Util._togglePaypal(profile);
		} else {
			auth = {};
			auth.usr = urlParams.par.usr || 'm';
			L.DomUtil.removeClass(nodeOff, 'collapse');
			L.DomUtil.addClass(nodeOn, 'collapse');
			Util._togglePaypal();
		}
		Util.cmdClose();
	},
	cmdSignOut: function() {
		Util.cmdClose();
		L.gmx.getJSON(cgiURLauth, {
			params: {logout:1, json:1, usr: auth.usr},
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
	refreshMenu: function(ev) {
		['rb-header1', 'rb-nav'].forEach(function(name) {
			var node = Util.getNode(name),
				str = templates[name],
				dop = {};
			dop[auth.usr + 'Checked'] = 'ant-radio-button-wrapper-checked';
			str = str.replace(/{(\w+)}/g, function(tmp, key) {
				return auth[key] || dop[key] || '';
			});
			node.innerHTML = str;
			if (name === 'rb-header1') {
				for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
					L.DomEvent.on(list[i], 'click', Util[name] || console.log, Util);
				}
			}
		});
	},
	cmdFlag: function(ev) {
		var node = ev.currentTarget,
			attrName = 'data-usr',
			usr = node.attributes[attrName] && node.attributes[attrName].value;
		if (urlParams.par.usr) {
			location.href = location.href.replace(/usr=\w/, 'usr=' + usr);
		} else {
			location.href = location.origin + location.pathname + '?usr=' + usr;
		}
		auth.usr = usr;
	},
	_promises: {
		_sessionKeys: {},
		_maps: {}
	}
};
Util.urlParams = urlParams;

Util.refreshMenu();

for (var i = 0, list = Util.getNodes('ant-input'), len = list.length; i < len; i++) {
	var target = list[i],
		type = target.getAttribute('data-key');
	if (type === 'onum') { L.DomEvent.on(target, 'change', Util.onInputChange, Util); }
	L.DomEvent.on(target, 'keypress', Util.onInputChange, Util);
}

['cmdTalk', 'cmdHerAddress', 'cmdRegister', 'cmdSign', 'cmdSignOut', 'cmdForgot', 'cmdFlag', 'cmdClose', 'cmdSave', 'cmdCheckbox'].forEach(function(name) {
	for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
		var node = list[i];
		L.DomEvent.on(node, 'click', Util[name] || console.log, Util);
		if (auth.usr !== 'm') {
			if (name === 'cmdHerAddress') {
				L.DomUtil.addClass(node.parentNode, 'collapse');
			}
		}
	}
});
// L.gmx.getJSON(cgiURLauth, {
// 	params: {json:1, uAttr:1, usr: auth.usr},
// 	options: {type:'json'}
// }).then(function(json) {
// 	var pt = json.res.AUTH;
// 	Util._toggleLogin(pt.err ? null : pt);
// });

window.B.Util = Util;

var Galer = {
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
				usr: auth.usr,
				f: nm * 8,
				byAge: 0
			}
		};
		if (Util.urlParams.par.to) opt.params.nw = Util.urlParams.par.to;
		var cont = Util.getNodes('galerList')[0];

		return L.gmxUtil.requestJSONP(cgiURLauth, opt.params, {callbackParamName: 'callback'}).then(function(json) {
			// return L.gmxUtil.requestJSONP(cgiURL, opt.params, {callbackParamName: 'callback'}).then(function(json) {
				// return L.gmx.getJSON(cgiURL, opt).then(function(json) {

			var galer = json.galer;
			if (json.res) {
				if (typeof(json.res) === 'string') {
					var txt = JSON.parse(json.res);
					json.res = txt;
				}
				galer = json.res.galer;
			}
			if (json.AUTH) {
				Util._toggleLogin(json.AUTH.err ? null : json.AUTH);
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
				it.langName = auth.usr === 'w' ? 'Russian' : 'English';
				
				var st = templates.galer1;
				st = st.replace(/_(\w+)_/g, function(match, contents, offset, input_string) {
					return it[contents] || it.pdata[contents];
				});
				out.push(st);
				Galer.galer[it.onum] = it;
				// console.log('__', st);
			});
			// if (pagination) out.push(pagination);
			if (!cont) {
				return;
			}
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
			if(key === 'engurov' && auth.usr === 'w') {
				list[0].parentNode.firstChild.innerHTML = 'Russian level: ';
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
			location.href = 'catalogue.html?usr=' + auth.usr + '&to=' + onum;
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
			Galer._putHref('http://russianbrides.com.au/maps/myLocation.html?ip=' + it.ip, 'rb-href-url', Galer.rbItemDetail);
		} else {
			if (Util.urlParams.par.to) {
				location.href = 'catalogue.html?usr=' + auth.usr;
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
