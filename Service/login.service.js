"use strict";
class LoginService {
    constructor($ajaxService, $url, $repo) {
        this.$ajaxService = $ajaxService;
        this.$url = $url;
        this.$repo = $repo;
        this.user = null;
        this.logged = false; // if the request has already been sent
        this.requesting = false;
        this.waitingCb = [];
    }
    login(mail, pass, stay, success, error) {
        this.$ajaxService.post(this.$url.makeApi('Login', 'login'), {
            mail: mail,
            password: pass,
            stay: stay
        }).subscribe((r) => {
            var data = r['data'];
            if (data.success !== true) {
                error();
                return;
            }
            this.isLogged((user) => {
                success(user);
            }, true);
        }, () => {
            error();
        });
    }
    logout() {
        this.$ajaxService.get(this.$url.makeApi('Login', 'logout')).subscribe((r) => {
            let data = r['data'];
            this.logged = false;
            this.user = null;
            this.$url.redirect('user', 'register', null, 'Au revoir', 'success');
        });
    }
    getUser(callback) {
        this.isLogged(() => {
            callback(this.user);
        });
    }
    isLogged(endCallback = null, force = false) {
        if (typeof (endCallback) === 'function') {
            this.waitingCb.push(endCallback);
        }
        // If the request is already in progress, don't do anything else, just wait for callback
        if (this.requesting) {
            return;
        }
        this.requesting = true;
        // After request, call this :
        var callback = () => {
            this.requesting = false;
            // Calling all queue callback !
            for (var i in this.waitingCb) {
                this.waitingCb[i](this.user);
            }
            // Reset the queue
            this.waitingCb = [];
        };
        // If the request has already been done
        if (force === false && this.logged) {
            callback();
            return;
        }
        this.$ajaxService.get(this.$url.makeApi("Login", "getLoginInfo")).subscribe((r) => {
            var data = r['data'];
            this.logged = true; // request done
            if (data.success === true && typeof (data.user) !== "undefined") {
                this.user = this.$repo.EntityFromJson(data.user, 'User');
            }
            else {
                this.user = null;
            }
            if (callback !== null) {
                callback();
            }
        }, () => {
            callback();
        });
    }
}
//# sourceMappingURL=login.service.js.map