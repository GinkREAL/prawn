(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _labeling_labeling_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./labeling/labeling.component */ "./src/app/labeling/labeling.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/signup/signup.component.ts");






var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'labeling', component: _labeling_labeling_component__WEBPACK_IMPORTED_MODULE_4__["LabelingComponent"] },
    { path: 'signup', component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <nav class=\"navbar navbar-light bg-light\">\n  <a class=\"navbar-brand\" href=\"#\">\n    <img src=\"/docs/4.1/assets/brand/bootstrap-solid.svg\" width=\"30\" height=\"30\" class=\"d-inline-block align-top\" alt=\"\">\n    PRAWn\n  </a>\n</nav> -->\n<div class=\"container\">\n  <router-outlet></router-outlet>\n</div>\n<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-3\"></div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<p style=\"text-align: center;\">© 2018 PRAWn</p>\n\t\t</div>\n\t\t<div class=\"col-md-3\"></div>\n\t</div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'PRAWn Data Labeling';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _labeling_labeling_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./labeling/labeling.component */ "./src/app/labeling/labeling.component.ts");
/* harmony import */ var _services_interceptor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/interceptor.service */ "./src/app/services/interceptor.service.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/signup/signup.component.ts");











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                _labeling_labeling_component__WEBPACK_IMPORTED_MODULE_8__["LabelingComponent"],
                _signup_signup_component__WEBPACK_IMPORTED_MODULE_10__["SignupComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"],
                    useClass: _services_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["InterceptorService"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/labeling/labeling.component.css":
/*!*************************************************!*\
  !*** ./src/app/labeling/labeling.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form .row {\n\tpadding-top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGFiZWxpbmcvbGFiZWxpbmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUNDLGVBQWU7Q0FDZiIsImZpbGUiOiJzcmMvYXBwL2xhYmVsaW5nL2xhYmVsaW5nLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb3JtIC5yb3cge1xuXHRwYWRkaW5nLXRvcDogMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/labeling/labeling.component.html":
/*!**************************************************!*\
  !*** ./src/app/labeling/labeling.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"row d-flex align-items-end flex-column\">\n\t<button type=\"button\" class=\"btn btn-outline-secondary\"  (click)=\"logoutFunc()\">Log Out</button>\n</div> -->\n\n<div class=\"row\">\n\t<div class=\"col-sm-6\">\n\t\t<h3 style=\"display: inline;\">Hi, <b>{{ username }}</b>!</h3> \n\t\t<button type=\"button\" class=\"btn btn-link\" (click)=\"logoutFunc()\">Not {{ username }}? Log out.</button>\n\t\t<h3>Please follow these instructions:</h3>\n\t\t<p>There will be <b>one or more targets</b> per article. Please label the comments according to the target shown.</p>\n\t\t<ul style=\"list-style-type:square\">\n\t\t  <li>Click the <b>'In Favor'</b> button if you can infer from the comment that the commenter <b>supports or has a positive stance</b> towards the target.</li>\n\t\t  <br>\n\t\t  <li>Click the <b>'Against'</b> button if you can infer from the comment that the commenter <b>is against or has a negative stance</b> towards the target.</li>\n\t\t  <br>\n\t\t  <li>Click the <b>'None'</b> button if you can infer from the comment that the commenter has a <b>neutral stance</b> towards the target or if the comment is <b>not related</b> to the target.</li>\n\t\t</ul>\n\t</div>\n\n\t<div class=\"col-sm-6\">\n\t\t<form>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"title\">Reddit Article:</label>\n\t\t\t\t<p>\n\t\t\t\t\t<b>{{ title }}</b>\n\t\t\t\t\t<br>\n\t\t\t\t\t<i>Link: <a href=\"{{ url }}\">{{ url }}</a></i>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"target\">Target {{ targetCount + 1 }}:</label>\n\t\t\t\t<h1><b>{{ target }}</b></h1>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"comment\">Comment:</label>\n\t\t\t\t<textarea class=\"form-control\" id=\"comment\" rows=\"5\" readonly>{{ comment }}</textarea>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-7\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-success btn-block\"  (click)=\"getLabel('favor')\">In Favor</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-warning btn-block\" (click)=\"getLabel('against')\">Against</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary btn-block\" (click)=\"getLabel('none')\">None</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-sm-5\">\n\t\t\t\t\t<div class=\"card\">\n\t\t\t\t\t  <div class=\"card-body text-center\">\n\t\t\t\t\t  \t<!-- get count of labeled comments -->\n\t\t\t\t\t  \t<h3>{{ count }}</h3>\n\t\t\t\t\t  \t<span>comments labeled in total</span>\n\t\t\t\t\t  </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/labeling/labeling.component.ts":
/*!************************************************!*\
  !*** ./src/app/labeling/labeling.component.ts ***!
  \************************************************/
/*! exports provided: LabelingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelingComponent", function() { return LabelingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_article_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/article.service */ "./src/app/services/article.service.ts");
/* harmony import */ var _services_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/label.service */ "./src/app/services/label.service.ts");
/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth.service.js */ "./src/app/services/auth.service.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var LabelingComponent = /** @class */ (function () {
    function LabelingComponent(articleService, labelService, authService, router) {
        this.articleService = articleService;
        this.labelService = labelService;
        this.authService = authService;
        this.router = router;
        this.labeling = {
            id: 2,
            name: 'labeling'
        };
        this.labelControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
        this['labelValue'] = '';
    }
    LabelingComponent.prototype.nextComment = function (obj) {
        if (obj['comments'][this['commentAddress']]['comment'] != "[deleted]" || obj['comments'][this['commentAddress']]['comment'] != "[removed]") {
            this['comment'] = obj['comments'][this['commentAddress']]['comment'];
        }
    };
    LabelingComponent.prototype.nextTarget = function (obj) {
        this['target'] = obj['targets'][this['targetCount']];
    };
    LabelingComponent.prototype.logoutFunc = function () {
        this.authService.logout();
        this.router.navigate(['/', 'login']);
    };
    LabelingComponent.prototype.getLabel = function (labelValue) {
        this['labelValue'] = labelValue;
        this.labelService.postLabel(this['id'], this['commentAddress'].toString(), this['labelValue'], this['target']).subscribe();
        if (this['targetCount'] < this['object']['targets'].length) {
            this['targetCount'] += 1;
            this.nextTarget(this['object']);
        }
        if (this['targetCount'] == this['object']['targets'].length) {
            this['commentAddress'] += 1;
            this.nextComment(this['object']);
            this['targetCount'] = 0;
            this.nextTarget(this['object']);
            this['count'] += 1;
        }
    };
    LabelingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this['username'] = window.localStorage.getItem('username');
        this.articleService.getRandomArticle().subscribe(function (object) {
            _this['object'] = object;
            _this['id'] = object['id'];
            _this['title'] = object['title'];
            _this['url'] = object['url'];
            _this['targetCount'] = 0;
            _this['target'] = object['targets'][_this['targetCount']];
            _this['commentAddress'] = 0;
            _this.labelService.getMyLabels().subscribe(function (labels) {
                _this['count'] = labels.length;
            });
            if (object['comments'][_this['commentAddress']]['comment'] != "[deleted]" || object['comments'][_this['commentAddress']]['comment'] != "[removed]") {
                _this['comment'] = object['comments'][_this['commentAddress']]['comment'];
            }
        });
    };
    LabelingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-labeling',
            template: __webpack_require__(/*! ./labeling.component.html */ "./src/app/labeling/labeling.component.html"),
            styles: [__webpack_require__(/*! ./labeling.component.css */ "./src/app/labeling/labeling.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_article_service__WEBPACK_IMPORTED_MODULE_3__["ArticleService"], _services_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"], _services_auth_service_js__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], LabelingComponent);
    return LabelingComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-dismissible alert-danger\" *ngIf=\"status === false\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n  <strong>Oh snap!</strong> The username or password that you entered is incorrect.\n</div>\n\n<div class=\"row\">\n\t<div class=\"col-md-6\">\n\t\t<div class=\"jumbotron text-right\">\n\t    <h1>Welcome to PRAWn</h1>\n\t    <h2>Reddit Comments Labeler</h2>\n\t    <br>\n\t    <h5>by Al, Gab, and Kingsley</h5>\n\t  </div>\n\t</div>\n\t<div class=\"col-md-6\">\n\t\t<h2>Log In</h2>\n\t\t<form>\n\t\t  <div class=\"form-group\">\n\t\t      <label for=\"username\">Username</label>\n\t\t      <input type=\"text\" class=\"form-control\" id=\"username\" [(ngModel)]=\"credentials.username\" name=\"username\" placeholder=\"Enter your username\">\n\t\t  </div>\n\t\t  <div class=\"form-group\">\n\t\t      <label for=\"password\">Password</label>\n\t\t      <input type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"credentials.password\" name=\"password\" placeholder=\"Enter your password\">\n\t\t  </div>\n\t\t</form>\n\t\t<button class=\"btn btn-primary\" (click)=\"loginFunc(credentials)\">Log in</button>\n\t\t&nbsp;&nbsp;<a routerLink=\"/signup\">Be part of our labeling team. Sign up now!</a>\n\t</div>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service.js */ "./src/app/services/auth.service.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var TokenResponse = /** @class */ (function () {
    function TokenResponse() {
    }
    return TokenResponse;
}());
var SessionResponse = /** @class */ (function () {
    function SessionResponse() {
    }
    return SessionResponse;
}());
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.login = {
            id: 1,
            name: 'login'
        };
        this['credentials'] = {
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.loginFunc = function (creds) {
        var _this = this;
        this.authService.getToken(creds.username, creds.password).subscribe(function (object) {
            window.localStorage.setItem('token', object.token);
            _this.authService.getSession().subscribe(function (object) {
                window.localStorage.setItem('username', object.username);
                _this['status'] = true;
                _this.router.navigate(['/', 'labeling']);
            });
        }, function (error) {
            _this['status'] = false;
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/services/article.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/article.service.ts ***!
  \*********************************************/
/*! exports provided: ArticleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticleService", function() { return ArticleService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var ArticleService = /** @class */ (function () {
    function ArticleService(http) {
        this.http = http;
        this.articleUrl = "/api/randomarticle";
        this.articleIdUrl = "/api/randomarticleid";
    }
    ArticleService.prototype.getRandomArticle = function () {
        return this.http.get(this.articleUrl);
    };
    ArticleService.prototype.getRandomArticleId = function () {
        return this.http.get(this.articleIdUrl);
    };
    ArticleService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ArticleService);
    return ArticleService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.js":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.js ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.loginUrl = "/api/login";
        this.sessionUrl = "/api/user";
    }
    AuthService.prototype.getToken = function (username, password) {
        var body = new FormData();
        body.append('username', username);
        body.append('password', password);
        return this.http.post(this.loginUrl, body);
    };
    AuthService.prototype.getSession = function () {
        return this.http.get(this.sessionUrl);
    };
    AuthService.prototype.signup = function (username, password) {
        var body = new FormData();
        body.append("username", username);
        body.append("password", password);
        return this.http.post(this.sessionUrl, body);
    };
    AuthService.prototype.logout = function () {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('token');
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "./src/app/services/interceptor.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/interceptor.service.ts ***!
  \*************************************************/
/*! exports provided: InterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterceptorService", function() { return InterceptorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var InterceptorService = /** @class */ (function () {
    function InterceptorService(http, router) {
        this.http = http;
        this.router = router;
    }
    InterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var currentHeaders = req.headers;
        var token = window.localStorage.getItem('token');
        if (token != null) {
            currentHeaders = currentHeaders.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
        }
        var formedRequest = req.clone({ headers: currentHeaders });
        return next.handle(formedRequest).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
            _this.router.navigate(['/', 'login']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(error);
        }));
    };
    InterceptorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], InterceptorService);
    return InterceptorService;
}());



/***/ }),

/***/ "./src/app/services/label.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/label.service.ts ***!
  \*******************************************/
/*! exports provided: LabelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelService", function() { return LabelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var LabelService = /** @class */ (function () {
    function LabelService(http) {
        this.http = http;
        this.commentUrl = "/api/comment";
        this.labelUrl = "/api/label";
        this.myLabelUrl = "/api/mylabels";
    }
    LabelService.prototype.getComment = function (article_id, comment_address) {
        var headerz = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            "article_id": article_id,
            "comment_address": comment_address
        });
        return this.http.get(this.commentUrl, { headers: headerz });
    };
    LabelService.prototype.postLabel = function (article_id, comment_address, label, target) {
        var body = new FormData();
        body.append("article_id", article_id);
        body.append("comment_address", comment_address);
        body.append("label", label);
        body.append("target", target);
        return this.http.post(this.labelUrl, body);
    };
    LabelService.prototype.getLabel = function (article_id, comment_address) {
        var headerz = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            "article_id": article_id,
            "comment_address": comment_address
        });
        return this.http.get(this.labelUrl, { headers: headerz });
    };
    LabelService.prototype.getMyLabels = function () {
        return this.http.get(this.myLabelUrl);
    };
    LabelService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LabelService);
    return LabelService;
}());



/***/ }),

/***/ "./src/app/signup/signup.component.css":
/*!*********************************************!*\
  !*** ./src/app/signup/signup.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpZ251cC9zaWdudXAuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/signup/signup.component.html":
/*!**********************************************!*\
  !*** ./src/app/signup/signup.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-6\">\n\t\t<div class=\"jumbotron text-right\">\n\t    <h1>Be a labeler for PRAWn</h1>\n\t    <h2>and help us pass our thesis.</h2>\n\t    <br>\n\t    <h5>- Al, Gab, and Kingsley</h5>\n\t  </div>\n\t</div>\n\t<div class=\"col-6\">\n\t\t<h2>Sign Up</h2>\n\t\t<form>\n\t\t  <div class=\"form-group\">\n\t\t      <label for=\"username\">Username</label>\n\t\t      <input type=\"text\" class=\"form-control\" id=\"username\" [(ngModel)]=\"newCredentials.username\" name=\"username\" placeholder=\"Enter your desired username\">\n\t\t  </div>\n\t\t  <div class=\"form-group\">\n\t\t      <label for=\"password\">Password</label>\n\t\t      <input type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"newCredentials.password\" name=\"password\" placeholder=\"Enter your password\">\n\t\t  </div>\n\t\t</form>\n\t\t<button class=\"btn btn-primary\" (click)=\"signupFunc(newCredentials)\">Sign up</button>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/signup/signup.component.ts":
/*!********************************************!*\
  !*** ./src/app/signup/signup.component.ts ***!
  \********************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service.js */ "./src/app/services/auth.service.js");



var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
        this.signup = {
            id: 3,
            name: 'signup'
        };
        this['newCredentials'] = {
            username: '',
            password: ''
        };
    }
    SignupComponent.prototype.signupFunc = function (creds) {
        this['newCredentials']['username'] = creds.username;
        this['newCredentials']['password'] = creds.password;
        console.log(this['newCredentials']['username']);
        this.authService.signup(this['newCredentials']['username'], this['newCredentials']['password']).subscribe();
    };
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/signup/signup.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service_js__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/gink/Desktop/prawn/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map