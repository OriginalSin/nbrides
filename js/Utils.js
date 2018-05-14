!function() {
    'use strict';

window.B = window.B || {};
var myAttr = {};
var localeUtils = {
	isAdvancedUpload: function() {
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
	},
	saveLocale: function(it) {
		if (it) { L.extend(myAttr.myLocale, it); }
		localStorage._rbLocale = JSON.stringify(myAttr.myLocale);
	},
	getLocale: function() {
		var arr = navigator.languages,
			len = arr.length,
			isRus = false;
	
		for (var i = 0; i < len; i++) {
			if (arr[i].indexOf('ru') === 0) {isRus = true; break;}
		}
		var myLocale = {};
		if (localStorage._rbLocale) {
			myLocale = JSON.parse(localStorage._rbLocale);
		} else {
			myLocale = {
				usr: isRus ? 'w' : 'm',
				lastPage: location.href,
				isRus: isRus
			};
		}
		return myLocale;
	},
	needProfile: function() {
		var arr = ['profile.html', 'catalogue.html', 'talk.html'],
			len = arr.length;
		for (var i = 0; i < len; i++) {
			if (location.href.indexOf(arr[i]) > -1) {return true;}
		}
		return false;
	},
	getUrlParams: function() {
		var out = {
			par: {}
		};
		if (location.search) {
			var arr = location.search.split('&'),
				len = arr.length;
			if (arr[0].indexOf('?') === 0) arr[0] = arr[0].substr(1);
			if (arr[len - 1].indexOf('#') === 0) {
				out.achor = arr[len - 1].substr(1);
				len--;
			}
			for (var i = 0; i < len; i++) {
				var pv = arr[i].split('=');
				if (pv.length > 1) out.par[pv[0]] = pv[1];
			}
		}
		var arr = location.pathname.match(/(\w+)\.html/);
		out.page = arr && arr.length > 1 ? arr[1] : 'index';
		return out;
	}
};

myAttr.urlParams = localeUtils.getUrlParams();
myAttr.needProfile = localeUtils.needProfile();
myAttr.myLocale = localeUtils.getLocale();
myAttr.isAdvancedUpload = localeUtils.isAdvancedUpload();

console.log('myAttr', myAttr)

var host = '//russianbrides.com.au',
	cgiURLauth = host + '/cgi/publ/auth.pl',
	cgiURL = host + '/cgi/publ/nserv.pl',
	auth = {
		usr: myAttr.urlParams.par.usr || myAttr.myLocale.usr || 'm'
	};
			
var translates = {
	country: {
		title: 'Страна:'
	},
	city: {
		title: 'Город:',
		size: 200
	},
	state: {
		hidden: true
	},
	addru: {
		title: 'Адрес:',
		size: 200
	},
	whatsapp: {
		title: 'Пользуюсь WhatsApp:',
		size: 90
	},
	bdate: {
		title: 'Дата рождения:',
		size: 90
	},
	nkids: {
		title: 'Количество детей:',
		size: 90
	},
	hight: {
		title: 'Рост в сантиметрах:',
		size: 90
	},
	weight: {
		title: 'Вес в киллограмах:',
		size: 90
	},
	zodiac: {
		title: 'Знак Зодиака:',
		size: 90,
		options: [
			{value:'Capricorn', text:'Козерог'},
			{value:'Aquarius', text:'Водолей'},
			{value:'Pisces', text:'Рыбы'},
			{value:'Aries', text:'Овен'},
			{value:'Taurus', text:'Телец'},
			{value:'Gemini', text:'Близнецы'},
			{value:'Cancer', text:'Рак'},
			{value:'Leo', text:'Лев'},
			{value:'Virgo', text:'Дева'},
			{value:'Libra', text:'Весы'},
			{value:'Scorpio', text:'Скорпион'},
			{value:'Sagittarius', text:'Стрелец'}
		]
	},
	Drinking: {
		title: 'Алкоголь:',
		size: 90,
		options: [
			{value:'Never drink', text:'Не пью совсем'},
			{value:'Socially', text:'За компанию (socially)'},
			{value:'Occasionally', text:'Время от времени'},
			{value:'Frequently', text:'Часто'}
		]
	},
	Smoking: {
		title: 'Курение:',
		size: 90,
		options: [
			{value:'Non-Smoker', text:'Не курю'},
			{value:'Socially', text:'За компанию (socially)'},
			{value:'Occasionally', text:'Курю иногда'},
			{value:'Regularly', text:'Курю регулярно'}
		]
	},
	EyeColor: {
		title: 'Цвет глаз:',
		size: 90,
		options: [
			{value:'Gray', text:'Серые'},
			{value:'Blue gray', text:'Серо-голубые'},
			{value:'Green gray', text:'Серо-зеленые'},
			{value:'Blue', text:'Голубые'},
			{value:'Turquoise', text:'Бирюзовые'},
			{value:'Brown', text:'Карие'},
			{value:'Hazel', text:'Светло-карие'},
			{value:'Dark brown', text:'Темно-карие'},
			{value:'Black', text:'Черные'},
			{value:'Green', text:'Зеленые'},
			{value:'Blue green', text:'Голубо-зеленые'}
		]
	},
	HairColor: {
		title: 'Цвет волос:',
		size: 90,
		options: [
			{value:'Blonde', text:'Блондинка'},
			{value:'Auburn', text:'Каштановый'},
			{value:'Hazel', text:'Русый'},
			{value:'Brown', text:'Темно-русый, шатенка'},
			{value:'Dark brown', text:'Темно-коричневый'},
			{value:'Black', text:'Брюнетка (черный)'},
			{value:'Redhead', text:'Рыжий'},
			{value:'Silver', text:'Пепельный'},
			{value:'White', text:'Белый (седые)'}
		]
	},
	Occupation: {
		title: 'Cфера деятельности:',
		size: 90,
		options: [
			{value:'Education', text:'Образование'},
			{value:'Scientific', text:'Наука'},
			{value:'Healthcare', text:'Здравоохранение'},
			{value:'Hospitality, Travel &amp; Tourism', text:'Туризм'},
			{value:'IT &amp; Telecommunications', text:'IT, телекоммуникации'},
			{value:'Accounting', text:'Бухгалтерия'},
			{value:'Banking &amp; Finance', text:'Финансы, банковское дело'},
			{value:'Administration', text:'Управление, администрирование'},
			{value:'Management', text:'Менеджмент'},
			{value:'Human Resources', text:'Подбор кадров'},
			{value:'Advertising', text:'Реклама'},
			{value:'Not categorised', text:'Другое'}
		]
	},
	edu: {
		title: 'Образование:',
		size: 90,
		options: [
			{value:'University', text:'Высшее'},
			{value:'College', text:'Среднее специальное'},
			{value:'School', text:'Школа'},
			{value:'Student', text:'Учусь сейчас'}
		]
	},
	marital: {
		title: 'Семейное положение:',
		size: 90,
		options: [
			{value:'Single', text:'Не замужем'},
			{value:'Divorced', text:'Разведена'},
			{value:'Separated', text:'Расстались'},
			{value:'Widow', text:'Вдова'},
			{value:'Married', text:'Замужем'}
		]
	},
	engurov: {
		title: 'Уровень английского:',
		size: 90,
		options: [
			{value:'Beginner', text:'Новичок'},
			{value:'Intermediate', text:'Средний уровень'},
			{value:'Advanced', text:'Продвинутый уровень'},
			{value:'Fluent', text:'Свободно'}
		]
	}
};

var templates = {
	'talk': '<div class="comment">\
			<div class="comment-body {mycomment}">\
				<div class="comment-picture">\
					<div class="comment-picture-inner">\
						<a href="#">\
							<img class="rb-src-jpg2 talk-avatar" alt="" src="{avatar}">\
						</a>\
					</div>\
				</div>\
				<div class="comment-content">\
					<div class="comment-meta">\
						<h3 class="comment-title rb-item-pName colorw">{pName}</h3>\
						<span class="comment-date">{date}</span> <span class="comment-subj colorw">{subj}</span>\
					</div>\
					<p class="comment-txt">{txt}</p>\
				</div>\
			</div>\
		</div>\
	',

	'rb-header1': '<div class="container ">\
			<div class="ant-radio-group ant-radio-group-large rb-float-left">\
				<label data-usr="m" title="Australia" class="cmdFlag ant-radio-button-wrapper {mChecked}"><span class="ant-radio-button ant-radio-button-checked"><span class="ant-radio-button-inner"></span></span><span><img class="language-flag" src="css/img/au.png" alt="au"></span></label>\
				<label data-usr="w" title="Russia" class="cmdFlag ant-radio-button-wrapper {wChecked}"><span class="ant-radio-button"><span class="ant-radio-button-inner"></span></span><span><img class="language-flag" src="css/img/ru.png" alt="ru"></span></label>\
			</div>\
			<div class="rb-cont-sign rb-float-right rb-signed-off">\
				<span class="cmdRegister rb-float-left"><div class="fa fa-users"><span>Register</span></div></span>\
				<span class="cmdSign rb-float-right"><div class="fa fa-sign-in"><span>Login</span></div></span>\
			</div>\
			<ul class="header-submenu pull-right rb-signed-on collapse">\
				<li>\
					<span class="fa fa-sign-out cmdSignOut"><span class="rb-pointer" title="Sign Out">Logout</span></span>\
					<span class="" style="top: 6px;position: relative;display: inline-flex;">\
						<a title="Edit profile" href="profile.html?usr={usr}"><span class="mail-User-Picture js-user-picture is-updated rb-edit-profile"></span></a>\
					</span>\
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
						<img src="css/img/logo_big.gif" height="50" alt="" data-evernote-hover-show="true">\
					</span>\
					<span class="logo-subtitle hidden-sm"></span>\
				</span>\
			</a>\
		</div>\
		<div class="navbar-collapse navbar-main rb-menu-content collapse">\
			<ul class="nav navbar-nav navbar-right rb-menu-button">\
				<li class="menuparent active_index"><a href="index.html?usr={usr}&onum={onum}">Home</a></li>\
				<li class="menuparent active_catalogue"><a href="catalogue.html?usr={usr}">Catalogue</a></li>\
				<li class="menuparent active_service"><a href="service.html">Service and Prices</a></li>\
				<li class="menuparent columns4"><a href="#">Other</a>\
					<ul>\
						<li><a href="profile.html?usr={usr}">Edit profile</a></li>\
						<li><a href="#" data-usr="w" class="cmdFlag">Russian site ></a></li>\
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
							<td>Profile<br><b>_onum_</b><sup></sup></td>\
							<td>Age<br><b>_age_</b></td>\
							<td>Children<br><b>_nkids_</b></td>\
							<td>_langName_<br><b>_engurov_</b></td>\
						</tr></tbody>\
					</table>\
				</div>\
				<img src="__jpg2_" alt="" onerror="this.src=\'./css/img/blank_gender_.jpg\'; this.onerror=\'\';" class="rb-image-zoom" onum="_onum_" gender="_gender_">\
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
	'footer-wrapper': '<div class="footer">\
		<div class="footer-inner">\
			<div class="footer-bottom">\
				<div class="container">\
					<nav class="clearfix">\
						<ul class="nav navbar-nav footer-nav">\
							<li><a href="index.html">Main</a></li>\
							<li><a href="catalogue.html">Catalogue</a></li>\
							<li><a href="service.html">Service and Prices</a></li>\
						</ul>\
					</nav>\
					<div class="copyright">\
						<div>RUSSIAN BRIDES (Australia) A.C.N. 101 458 324</div>\
						<div>Address: 608 B, 434 St Kilda Rd, Melbourne</div>\
						<div>Victoria, Australia 3004.</div>\
						<div>2000<span class="curYear">-2018</span> © Copyright.</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	'
};

var Util = {
	reg: {
		email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\\.)+[a-z]{2,6}$/,
		test: /^[\\w]+$/
	},
	reg: {
		email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\\.)+[a-z]{2,6}$/,
		test: /^[\\w]+$/
	},
	loadSvgSprite: function(url) {
		fetch(url, {mode: 'cors'}).then(function(resp) {
			return resp.text();
		}).then(function(txt) {
			var div = document.createElement('div');
			div.style.display = 'none';
			div.innerHTML = txt;
			document.body.insertBefore(div, document.body.childNodes[0]);
		});
	},
	getNodes: function(name, fromNode) {
		return (fromNode || document).getElementsByClassName(name);
	},
	getNode: function(name, fromNode) {
		return Util.getNodes(name, fromNode)[0];
	},
	toggleClass: function(node, name, flag) {
		var isExist = flag === undefined ? L.DomUtil.hasClass(node, name) : flag;
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
	_getLocation: function() {
		var url = '//ip-api.com/json/' + myAttr.ip;
		L.gmxUtil.requestJSONP(url, {}, {callbackParamName: 'callback'}).then(function(json) {
			myAttr.addr = json;
		});
},
	cmdSave: function(ev) {
		// value.search(reg) === -1
		var node = ev.target,
			cmd = node.getAttribute('data-key'),
			formName = cmd + '-form',
			form = Util.getNode(cmd + '-form'),
			par = {cmd: cmd, usr: myAttr.urlParams.par.usr || auth.usr};
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
				par.addr = JSON.stringify(myAttr.addr);
			}
			if (myAttr.needProfile) {
				par.uAttr = 1;
			}

			return L.gmxUtil.requestJSONP(cgiURLauth, par, {callbackParamName: 'callback'}).then(function(json) {
				var pt = json.AUTH;
// console.log('cmd', cmd, json);
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
		if (myAttr.profile && myAttr.profile.onum && !myAttr.profile.fname) {
			alert('Your profile is empty - please edit your profile!');
			location.href = 'profile.html?usr=' + auth.usr;
		} else if (!myAttr.profile) {
			Util._prpModal('signDialog', {needSign: true});
		} else if (auth.usr === 'm' && !auth.op2) {
			location.href = 'service.html?usr=' + auth.usr + '&onum=' + auth.onum;
		} else {
			out = true;
		}

		// console.log('_chkOpl', auth);
		return out;
	},
	cmdTalk: function(ev) {
		if (Util._chkOpl()) {
			location.href = 'talk.html?usr=' + auth.usr + '&onum=' + auth.onum + '&to=' + B.Galer.activeItem.onum;
		}
	},
	cmdSaveMessage: function(ev) {
		Galer.saveMessage(ev);
	},
	cmdChangeImage: function(ev) {
		var target = ev.target;
		Galer.nextImage(L.DomUtil.hasClass(target, 'right'));
	},
	cmdSaveProfile: function(ev) {
		Galer.saveProfile();
	},
	_setTransform: function(it, node) {
		var transform = '',
			rotate = it.rotate || 0;
		// if ('rotate' in it) {
			rotate %= 360;
			transform += 'rotate(' + rotate + 'deg)';
		// }
		if (it.scale) {
			transform += 'scale(' + it.scale + ')';
		}
		if (transform) {
			node.style.transform = transform;
		}
		return transform;
	},
	cmdImageDel: function() {
		var it = Galer._getImageItem(true);
		Galer._refreshImages(myAttr.profile.pdata.images);
		console.log('cmdImageDel',it, myAttr.dopFiles, myAttr.profile.pdata.images)
	},
	// cmdZoomOut: function() {
	// 	var it = Galer._getImageItem();
	// 	it.scale = (it.scale || 1) - 0.1;
	// 	Util._setTransform(it, Util.getNode('rb-src-jpg2', Util.getNode('rb-item-detail')));
	// },
	// cmdZoomIn: function() {
	// 	var it = Galer._getImageItem();
	// 	it.scale = (it.scale || 1) + 0.1;
	// 	Util._setTransform(it, Util.getNode('rb-src-jpg2', Util.getNode('rb-item-detail')));
	// },
	cmdRotate: function() {
		var it = Galer._getImageItem();
		it.rotate = (it.rotate || 0) - 90;
		Util._setTransform(it, Util.getNode('rb-src-jpg2', Util.getNode('rb-item-detail')));
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
	},
	cmdRegister: function() {
		Util._getLocation();
		Util._prpModal('registerDialog');
	},
	cmdSign: function(ev, email) {
		Util._prpModal('signDialog', {email: email});
	},
	cmdForgot: function() {
		Util._prpModal('forgotDialog');
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
	_prpItemImages: function(profile) {
		if (!profile.pdata.images) {
			var arr = [],
			name = '_jpg2',
			it = profile[name] || profile.pdata[name];
			if(it) {arr.push({src: it});}
			name = '_jpg1';
			it = profile[name] || profile.pdata[name];
			if(it) {arr.push({src: it});}
			name = '_jpg3';
			it = profile[name] || profile.pdata[name];
			if(it) {arr.push({src: it});}
			profile.pdata.images = arr;
		}
		return profile.pdata.images;
	},
	_toggleLogin: function(profile) {
		var nodeOff = Util.getNode('rb-signed-off'),
			nodeOn = Util.getNode('rb-signed-on');
		if (profile) {
			auth = profile;
			if(profile.pdata) {
				Util._prpItemImages(profile);
				profile.pName = profile.fname.charAt(0).toUpperCase() + profile.fname.slice(1) + ' ' + profile.sname.charAt(0).toUpperCase() + '.';
				if (!profile.bdate) {
					profile.bdate = (profile.pdata.dd || '01') + '/' + (profile.pdata.mm || '12') + '/' + (profile.pdata.yy || '1960');
				}
			}
			myAttr.profile = profile;
			L.DomUtil.removeClass(nodeOn, 'collapse');
			L.DomUtil.addClass(nodeOff, 'collapse');
			Util._togglePaypal(profile);
			if (profile.pdata) {
				Util._chkProfile(profile);
			}
		} else {
			auth = {};
			auth.usr = auth.usr || 'm';
			L.DomUtil.removeClass(nodeOff, 'collapse');
			L.DomUtil.addClass(nodeOn, 'collapse');
			Util._togglePaypal();
			if (location.pathname.indexOf('profile.html') !== -1) {location.href = 'index.html';}
		}
		localeUtils.saveLocale({usr: auth.usr});
		Util.cmdClose();
	},
	_chkProfile: function(it) {
		var detail = Util.getNode('rb-item-detail'),
			form = Util.getNode('rb-form-profile', detail);
		Galer._putImageSrc(it, detail, 1);
		Galer._putItem(it, detail, form);

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
			str = str.replace('menuparent active_' + myAttr.urlParams.page, 'menuparent hover');

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
		auth.usr = usr;
		localeUtils.saveLocale({usr: auth.usr});
		if (Util.urlParams.par.usr) {
			location.href = location.href.replace(/usr=\w/, 'usr=' + usr).replace(/to=\d+/, '');
		} else {
			location.href = location.origin + location.pathname + '?usr=' + usr;
		}
	},
	_promises: {
		_sessionKeys: {},
		_maps: {}
	}
};
Util.urlParams = myAttr.urlParams;

Util.refreshMenu();
var name = 'footer-wrapper',
	node = Util.getNode(name);
if (node) {
	var str = templates[name];
	node.innerHTML = str;
}

for (var i = 0, list = Util.getNodes('ant-input'), len = list.length; i < len; i++) {
	var target = list[i],
		type = target.getAttribute('data-key');
	if (type === 'onum') { L.DomEvent.on(target, 'change', Util.onInputChange, Util); }
	L.DomEvent.on(target, 'keypress', Util.onInputChange, Util);
}

['cmdTalk', 'cmdSaveMessage', 'cmdSaveProfile', 'cmdChangeImage', 'cmdImageDel', 'cmdZoomOut', 'cmdZoomIn', 'cmdRotate', 'cmdHerAddress', 'cmdRegister', 'cmdSign', 'cmdSignOut', 'cmdForgot', 'cmdFlag', 'cmdClose', 'cmdSave', 'cmdCheckbox'].forEach(function(name) {
	for (var i = 0, list = Util.getNodes(name), len = list.length; i < len; i++) {
		var node = list[i];
		L.DomEvent.on(node, 'click', Util[name] || console.log, Util);
		var usr = myAttr.urlParams.par.usr || auth.usr;
		if (usr !== 'm') {
			if (name === 'cmdHerAddress') {
				L.DomUtil.addClass(node.parentNode, 'collapse');
			}
		}
	}
});
Util.loadSvgSprite('css/rb.svg');

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
		if (cp < lp) {			// Последняя
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
	getPage: function(nm, msg) {
		nm = nm || 0;
		var opt = {
			options: {
				//credentials: false,
				type: 'json'
			},
			params: {
				cmd: 'gal',
				usr: myAttr.urlParams.par.usr || auth.usr,
				page: myAttr.urlParams.page || '',
				f: nm * 8,
				byAge: 0
			}
		};
		if (myAttr.needProfile) {
			opt.params.uAttr = 1;
		}
		if (myAttr.urlParams.page === 'talk') {
			opt.params.charset = 'windows-1251';
			if (msg) {
				opt.params.msg = msg;
			}
		}

		if (Util.urlParams.par.to) opt.params.nw = Util.urlParams.par.to;
		var cont = Util.getNode('galerList');

		return L.gmxUtil.requestJSONP(cgiURLauth, opt.params, {callbackParamName: 'callback'}).then(function(json) {
			var galer = json.galer;
			if (json.res) {
				if (typeof(json.res) === 'string') {
					var txt = JSON.parse(json.res);
					json.res = txt;
				}
				galer = json.res.galer;
			}
			if (json.AUTH) {
				myAttr.ip = json.AUTH.ip;
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
				if (it.bdate) {
					it.age = it.bdate;
				}
				it.gender = opt.params.usr;
				it.fullname = it.fname + ' ' + it.sname;
				var addru = it.pdata.addru;
				if (!addru) {
					addru = it.pdata.country + ', ' + it.pdata.city;
				}
				it.address = addru + '<br>' + it.fullname;
				it.talk = 'talk.html?usr=' + it.gender + '&onum=' + it.onum + '&ns=' + it.onum;
				it.langName = opt.params.usr === 'w' ? 'Russian' : 'English';
				
				var st = templates.galer1;
				st = st.replace(/_(\w+)_/g, function(match, contents, offset, input_string) {
					return it[contents] || it.pdata[contents];
				});
				out.push(st);
				Galer.galer[it.onum] = it;
				// console.log('__', st);
			});
			// if (pagination) out.push(pagination);
			if (cont) {
				cont.innerHTML = out.join('\n');
			}

			if (Util.urlParams.par.to) {
				Galer._showItem(Util.urlParams.par.to);
			}

			if (json.talk) {
				out = [];
				var lastDate = 0;
				json.talk.arr.forEach(function(it) {
// console.log('_talk_', it);
					var fit = Galer.galer[it.f];
					if (it.f === myAttr.profile.onum) {
						fit =  myAttr.profile;
						it.mycomment = 'pdl32';
					}

					var tit = it.t === myAttr.profile.onum ? myAttr.profile : Galer.galer[it.t];
					var userHash = Galer.galer[it.onum];
					
					it.txt = decodeURIComponent(it.txt);
					it.avatar = fit.pdata.images[0].src;
					it.date = (new Date(it.pTime * 1000)).toLocaleString();
// console.log('_talk_', it.txt);
					if (lastDate < it.pTime) lastDate = it.pTime;
					var st = templates.talk;
					st = st.replace(/{(\w+)}/g, function(match, contents, offset, input_string) {
						return it[contents] || fit[contents] || '';
					});
					out.push(st);
				});
				Galer._putHref('catalogue.html?usr=' + opt.params.usr + '&to=' + opt.params.nw, 'rb-href-url', Util.getNode('rb-talk'));
				
				Util.getNode('rb-talk-content').innerHTML = out.join('\n');
				Util.getNode('rb-talk-count').innerHTML = json.talk.count;
				Util.getNode('rb-talk-post-last').innerHTML = (new Date(lastDate * 1000)).toLocaleString();
			}
		});
	},
	saveMessage: function(ev) {
		var textarea = ev.currentTarget.parentNode.parentNode['txt'];
		Galer.getPage(null, encodeURIComponent(textarea.value));
		textarea.value = '';
	},

	galer: {},
	templItem: '',
	rbPhotoCatalog: null,
	rbItemDetail: null,
	//_putProfileImageSrc
	_putImageSrc: function(it, node, nm, name) {
		it = it || myAttr.profile;
		if (it && it.pdata) {
			node = node || Galer.rbItemDetail;
			nm = nm || 2;
			name = name || 'rb-src-jpg2';
			var jpg = '_jpg' + nm,
				zn = it[jpg] || it.pdata[jpg] || it.pdata._jpg1,
				node1 = Util.getNode(name, node);

			if (it.pdata.images) {
				zn = it.pdata.images[nm - 1] ? it.pdata.images[nm - 1].src : zn;
			}
			if (node1) {node1.src = zn ? zn : './css/img/blank' + it.usr + '.jpg';}
		}
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
	_putItem: function(it, node, form) {
		node = node || Galer.rbItemDetail;
		if (!it.pdata.images) {
			Util._prpItemImages(it);
		}
		var arr = Object.keys(it.pdata).concat(Object.keys(it));
		arr.push('bdate');
		arr.push('whatsapp');
		
		arr.forEach(function(key) {
			var trn = translates[key];
			var list = Util.getNodes('rb-item-' + key, node),
				zn = it[key] || it.pdata[key];
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].innerHTML = zn;
			}
			if(form && form[key]) {
				var n = form[key],
					tagName = n.tagName.toLowerCase();
				if (trn) {
					if (it.usr === 'w') {
						if (trn.title) {
							n.parentNode.firstChild.textContent = trn.title;
						}
						if (trn.options) {
							n.options.length =  trn.options.length;
		
							for (var i = 0, len = trn.options.length; i < len; i++) {
								var pt = trn.options[i],
									opt = n.options[i];
								if (!opt) {
									opt = document.createElement("option");
									n.add(opt);
								}
								if (pt.value) opt.value = pt.value;
								if (pt.text) opt.text = pt.text;
								if (pt.selected === zn) {
									n.selectedIndex = i;
								}
							}
							// for (var i = 0, len = lenOld; i < len; i++) {
							// 	n.remove(i);
							// }
						}
					}
					if (trn.size) {
						n.style.width = trn.size + 'px';
					}
					
				}
				if(tagName === 'select') {
					for (var i = 0, len = n.options.length; i < len; i++) {
						var opt = n.options[i];
						if (opt.value === zn) {
							n.selectedIndex = i;
							break;
						}
					}
				} else if(tagName === 'input') {
					n.value = zn || '';
				}
				if(key === 'country') {
					// list[0].parentNode.firstChild.innerHTML = 'Russian level: ';
				}
			}
		});
		if(it.usr === 'm') {
			// if(key === 'state') {
				//L.DomUtil.addClass(, 'collapse')
				// 	list[0].parentNode.firstChild.innerHTML = 'Russian level: ';
			// }
			if(form && form.addru) {
				L.DomUtil.addClass(form.addru.parentNode, 'collapse')
			}
		} else {
			if(form && form.state) {
				L.DomUtil.addClass(form.state.parentNode, 'collapse')
			}
		}
		if (form) {
			//Util._prpItemImages(it);
			Galer._refreshImages(it.pdata.images);
		} else {
			Galer.activeItem = it;
			Galer.activeImage = 0;
			var list = Util.getNodes('cmdChangeImage', node),
				className = it.pdata.images.length > 1 ? 'removeClass' : 'addClass';
			for (var i = 0, len = list.length; i < len; i++) {
				L.DomUtil[className](list[i], 'collapse');
			}
		}
	},
	nextImage: function(flag) {
		var node = Galer.rbItemDetail,
			imgNode = Util.getNode('rb-src-jpg2', Galer.rbItemDetail),
			images = Galer.activeItem.pdata.images,
			nm = Galer.activeImage || 0;

		nm += flag ? 1 : -1;
		if (nm >= images.length) {
			nm = 0;
			//st += ' ant-pagination-item-active';
		} else if (nm < 0) {
			nm = images.length - 1;
		}
		imgNode.src = images[nm].src;
		Galer.activeImage = nm;
	},
	_resizeImage: function(file, name) {
		return new Promise(function(resolve) {
			var img = new Image();
			var reader = new FileReader();
			reader.onload = function (e) {
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
			img.onload = function () {
				var canvas = L.DomUtil.create('canvas'),
					sl = (img.naturalWidth - 632) / 2,
					st = (img.naturalHeight - 948) / 2,
					scw = 632 / img.naturalWidth,
					sch = 948 / img.naturalHeight,
					sc = Math.min(scw, sch),
					asp = 632 / 948;

				canvas.width = img.naturalWidth * sc;
				canvas.height = img.naturalHeight * sc; // / aspectRatio;
				canvas.getContext('2d').drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
				canvas.toBlob(function (blob) {
					resolve({blob: blob, name: name});
				}, 'image/jpeg');
			};
		});
	},

	saveProfile: function() {
		var formData = new FormData(),
			profile = myAttr.profile,
			images = profile.pdata.images,
			nm = Galer._getMaxNumImages(images),
			rbImages = Util.getNode('rb-images', Util.getNode('rb-item-detail')),
			arr = [];

		for (var i = 0, len = rbImages.children.length; i < len; i++) {
			var node = rbImages.children[i],
				attrkey = node.attributes['data-key'];
			if (attrkey) {
				nm++;
				var it = myAttr.dopFiles[attrkey.value],
					name = profile.onum + '_'  + nm + 'a.jpg';
				//formData.append(name, it.file);
				arr.push(Galer._resizeImage(it.file, name));
				images.push({src: 'jpeg/' + profile.usr + '/0/' + name, rotate: it.rotate || 0});
			}
		}

		formData.append('images', JSON.stringify(images));
		formData.append('onum', profile.onum);
		formData.append('usr', profile.usr);
		formData.append('json', 1);
		formData.append('profile', 1);
		var form = Util.getNode('rb-form-profile', Util.getNode('rb-item-detail'));
		for (var i = 0, len = form.length; i < len; i++) {
			var it = form[i];
			formData.append(it.name, it.value);
		}

		Promise.all(arr)
			.then(function(arr) {
				console.log('Promise.all', arr)
				for (var i = 0, len = arr.length; i < len; i++) {
					var it = arr[i];
					formData.append(it.name, it.file);
				}
				fetch(cgiURLauth, {
					method: 'POST',
					mode: 'cors',
					redirect: 'follow',
					credentials: 'include',
					body: formData
				  })
				  .then(function(response) {return response.json();})
				  .catch(console.error)
				  .then(function(response) {
					  console.log('Success:', response);
					  //location.href = 'catalogue.html';
				});
		
			}, function() {
				console.log('err', arguments)
			});
	},

	_getImageItem: function(remove) {
		var images = myAttr.profile.pdata.images,
			nm = myAttr.activeImage - 1,
			it = images[nm];
		if (!it) {
			var rbImages = Util.getNode('rb-images', Util.getNode('rb-item-detail')),
				node = rbImages.children[nm],
				key = node.attributes['data-key'].value;
			it = myAttr.dopFiles[key];
			if (remove) {
				delete myAttr.dopFiles[key];
			}
		} else if (remove) {
			myAttr.profile.pdata.images.splice(nm, 1);
		}
		if (myAttr.activeImage > images.length + Object.keys(myAttr.dopFiles).length) {
			myAttr.activeImage--;
		}
		return it;
	},
	_refreshImages: function(images, active) {
		var detail = Util.getNode('rb-item-detail'),
			form = Util.getNode('rb-form-profile', detail),
			rbImages = Util.getNode('rb-images', detail),
			rbIcons = Util.getNode('rb-icons', detail),
			nm = 0,
			out = [];
	
		if (active) {myAttr.activeImage = active;}
		active = myAttr.activeImage || 1;

		for(var i = 0, len = images.length; i < len; i++) {
			nm++;
			var st = '<li title="'+ nm +'" class="ant-pagination-item ant-pagination-item-'+ nm;
			if (active === nm) {st += ' ant-pagination-item-active';}
			st += '" tabindex="0"><a>'+ nm +'</a></li>';
			out.push(st);
		}
		myAttr.dopFiles = myAttr.dopFiles || {};
		for(var key in myAttr.dopFiles) {
			if (nm < 10) {
				nm++;
				var st = '<li title="'+ nm +'" class="ant-pagination-item ant-pagination-item-'+ nm;
				if (active === nm) {st += ' ant-pagination-item-active';}
				st += '" tabindex="0" data-key="'+ key +'"><a>'+ nm +'</a></li>';
				out.push(st);
			}
		}

		if (nm < 10) {
			out.push('<li tabindex="0" class="ant-pagination-item " role="button">\
				<input type="file" accept="" id="file" multiple style="display: none;" />\
				<label for="file" class="ant-btn" style="padding-top: 4px;">\
					<i class="anticon anticon-upload" style="padding-top: 3px;"></i><span>upload or drag photo</span>\
				</label>\
			</li>');
		}

		rbImages.innerHTML = out.join('\n');
		for (var i = 0; i < nm; i++) {
			L.DomEvent.on(rbImages.children[i], 'click', Galer._clickProfileImage);
		}
		if (nm < 10) {
			L.DomEvent.on(rbImages.children[rbImages.children.length - 1], 'change', Galer._changeProfileImage);
			if (myAttr.isAdvancedUpload) {
				L.DomEvent
					.on(form, 'drag dragstart dragend dragover dragenter dragleave drop', function(e) {
						e.preventDefault();
						e.stopPropagation();
					})
					.on(form, 'drop', function(ev) {
						Galer._chkProfileImages(ev.dataTransfer.files);
					});
			}
		}
		Galer._setActiveProfileImage(rbImages.children[active - 1]);
		Util.toggleClass(rbIcons, 'collapse', nm > 0);
	},
	_getMaxNumImages: function(images) {
		var nm = 0;
		images.forEach(function(it) {
			var arr = it.src.match(/_(\d+)a\.jpg/);
			nm = Math.max(nm, Number(arr[1]));
		});
		return nm;
	},
	_chkProfileImages: function(files) {
		// console.log('_chkProfileImages', files);
		myAttr.dopFiles = myAttr.dopFiles || {};
		var images = myAttr.profile.pdata.images,
			len = files.length,
			flag = false,
			activeImage = images.length + Object.keys(myAttr.dopFiles).length + (len ? 1 : 0);
		for (var i = 0; i < len; i++) {
			var file = files[i];
			if (file.size) { //  && file.size < 3000000
				myAttr.dopFiles[file.name + '_' + file.size + '_' + file.lastModified] = {
					file: file
				};
				flag = true;
			// } else {
			// 	Galer._resizeImage(file, activeImage);
			}
		}
		//if (flag)
		Galer._refreshImages(images, activeImage);
	},
	_changeProfileImage: function(ev) {
		Galer._chkProfileImages(ev.target.files);
		//console.log('_changeProfileImage', res);
	},
	_setActiveProfileImage: function(node) {
		var title = node.title;
		var arr = /\d+/.exec(title),
			imgNode = Util.getNode('rb-src-jpg2', detail);
		if (arr && arr.length) {
			var nm = Number(arr[0]);
			myAttr.activeImage = nm;
			var detail = Util.getNode('rb-item-detail'),
				images = myAttr.profile.pdata.images,
				rbImages = Util.getNode('rb-images', detail),
				activeImageItem = images[nm - 1];

			if (nm > images.length) {
				activeImageItem = myAttr.dopFiles[node.attributes['data-key'].value];
				var reader = new FileReader();
				reader.onload = function (e) {
					imgNode.src = e.target.result;
					Util._setTransform(activeImageItem, Util.getNode('rb-src-jpg2', Util.getNode('rb-item-detail')));
				};
				reader.readAsDataURL(activeImageItem.file);
			} else {
				imgNode.src = images[nm - 1].src;
				Util._setTransform(activeImageItem, Util.getNode('rb-src-jpg2', Util.getNode('rb-item-detail')));
			}
			for (var i = 0, len = rbImages.children.length; i < len; i++) {
				L.DomUtil[(myAttr.activeImage == i + 1 ? 'addClass' : 'removeClass')](rbImages.children[i], 'ant-pagination-item-active');
			}

		} else {
			imgNode.src = 'css/img/blankm.jpg';
		}
	},
	_clickProfileImage: function(ev) {
		var target = ev.target,
			node = target.tagName.toLowerCase() === 'li' ? target : target.parentNode;
		Galer._setActiveProfileImage(node);
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
		var usr = myAttr.urlParams.par.usr || auth.usr;
		if (!Galer.rbPhotoCatalog) {
			location.href = 'catalogue.html?usr=' + usr + '&to=' + onum;
			return true;
		}
		var rbPhotoCatalog = Galer.rbPhotoCatalog,
			rbItemDetail = Galer.rbItemDetail,
			it = Galer.galer[onum];
		if (it) {
			Galer._putItem(it);
			Galer._putImageSrc(it);
			Galer._putImageSrc(null, null, 1, 'rb-profile-src-0');
			L.DomUtil.addClass(rbPhotoCatalog, 'collapse');
			L.DomUtil.removeClass(rbItemDetail, 'collapse');
			Galer._putHref('http://russianbrides.com.au/maps/myLocation.html?ip=' + it.ip, 'rb-href-url', Galer.rbItemDetail);
		} else {
			if (Util.urlParams.par.to) {
				location.href = 'catalogue.html?usr=' + usr;
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
			func(Util.getNode('tab-' + name), 'active');
			//func(document.getElementById(name), 'active');
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
