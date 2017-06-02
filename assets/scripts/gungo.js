var CubicBezier = function() {
    function t(t, e, n, i) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 1), void 0 === i && (i = 1), this.p1x = t, this.p1y = e, this.p2x = n, this.p2y = i, this.cx = 3 * this.p1x, this.cy = 3 * this.p1y, this.bx = 3 * (this.p2x - this.p1x) - this.cx, this.by = 3 * (this.p2y - this.p1y) - this.cy, this.ax = 1 - this.cx - this.bx, this.ay = 1 - this.cy - this.by, this.ease = this.ease.bind(this)
    }
    return t.create = function(e, n, i, r, o) {
        void 0 === n && (n = 0), void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === o && (o = 1);
        var s = new t(n, i, r, o);
        return "string" == typeof e && (t.easings[e] = s), s.ease
    }, t.config = function(e, n, i, r) {
        return void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === i && (i = 1), void 0 === r && (r = 1), new t(e, n, i, r).ease
    }, t.get = function(e) {
        return t.easings[e].ease
    }, t.prototype.getEpsilon = function(t) {
        return void 0 === t && (t = 400), 1 / (200 * t)
    }, t.prototype.ease = function(t, e, n, i) {
        return this.solve(t, this.getEpsilon(i))
    }, t.prototype.solve = function(t, e) {
        return this.sampleCurveY(this.solveCurveX(t, e))
    }, t.prototype.sampleCurveX = function(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t
    }, t.prototype.sampleCurveY = function(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t
    }, t.prototype.sampleDerivX = function(t) {
        return (3 * this.ax * t + 2 * this.bx) * t + this.cx
    }, t.prototype.solveCurveX = function(t, e) {
        for (var n, i, r, o, s, a = 0, r = t; 8 > a; a++) {
            if (o = this.sampleCurveX(r) - t, Math.abs(o) < e) return r;
            if (s = this.sampleDerivX(r), Math.abs(s) < e) break;
            r -= o / s
        }
        if (n = 0, i = 1, r = t, n > r) return n;
        if (r > i) return i;
        for (; i > n;) {
            if (o = this.sampleCurveX(r), Math.abs(o - t) < e) return r;
            t > o ? n = r : i = r, r = .5 * (i - n) + n
        }
        return r
    }, t.easings = {}, t
}();
! function(t, e, n) {
    "use strict";
    var i = e.documentElement,
        r = {
            create: function(t) {
                return e.createElement(t)
            },
            old: !!/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent),
            pfx: function() {
                var t = e.createElement("dummy").style,
                    i = ["Webkit", "Moz", "O", "ms"],
                    r = {};
                return function(e) {
                    if ("undefined" == typeof r[e]) {
                        var o = e.charAt(0).toUpperCase() + e.substr(1),
                            s = (e + " " + i.join(o + " ") + o).split(" ");
                        r[e] = null;
                        for (var a in s)
                            if (t[s[a]] !== n) {
                                r[e] = s[a];
                                break
                            }
                    }
                    return r[e]
                }
            }()
        },
        o = {
            css3Dtransform: function() {
                var t = !r.old && null !== r.pfx("perspective");
                return !!t
            }(),
            cssTransform: function() {
                var t = !r.old && null !== r.pfx("transformOrigin");
                return !!t
            }(),
            cssTransition: function() {
                var t = null !== r.pfx("transition");
                return !!t
            }(),
            addEventListener: !!t.addEventListener,
            querySelectorAll: !!e.querySelectorAll,
            matchMedia: !!t.matchMedia,
            deviceMotion: "DeviceMotionEvent" in t,
            deviceOrientation: "DeviceOrientationEvent" in t,
            contextMenu: "contextMenu" in i && "HTMLMenuItemElement" in t,
            classList: "classList" in i,
            placeholder: "placeholder" in r.create("input"),
            localStorage: function() {
                var t = "x";
                try {
                    return localStorage.setItem(t, t), localStorage.removeItem(t), !0
                } catch (e) {
                    return !1
                }
            }(),
            historyAPI: t.history && "pushState" in t.history,
            serviceWorker: "serviceWorker" in navigator,
            viewportUnit: function(t) {
                try {
                    t.style.width = "1vw";
                    var e = "" !== t.style.width;
                    return !!e
                } catch (n) {
                    return !1
                }
            }(r.create("dummy")),
            remUnit: function(t) {
                try {
                    t.style.width = "1rem";
                    var e = "" !== t.style.width;
                    return !!e
                } catch (n) {
                    return !1
                }
            }(r.create("dummy")),
            canvas: function(t) {
                return !(!t.getContext || !t.getContext("2d"))
            }(r.create("canvas")),
            svg: !!e.createElementNS && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            webGL: function(e) {
                try {
                    return !(!t.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
                } catch (n) {
                    return !1
                }
            }(r.create("canvas")),
            cors: "XMLHttpRequest" in t && "withCredentials" in new XMLHttpRequest,
            touch: !!("ontouchstart" in t || t.navigator && t.navigator.msPointerEnabled && t.MSGesture || t.DocumentTouch && e instanceof DocumentTouch),
            async: "async" in r.create("script"),
            defer: "defer" in r.create("script"),
            geolocation: "geolocation" in navigator,
            srcset: "srcset" in r.create("img"),
            sizes: "sizes" in r.create("img"),
            pictureElement: "HTMLPictureElement" in t,
            testAll: function() {
                var t = " js";
                for (var e in this) "testAll" !== e && "constructor" !== e && this[e] && (t += " " + e);
                i.className += t.toLowerCase()
            }
        };
    t.feature = o
}(window, document), ! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Gungo", [], e) : "object" == typeof exports ? exports.Gungo = e() : t.Gungo = e()
}(this, function() {
    return function(t) {
        function e(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "http://localhost:8080/dist", e(0)
    }([function(t, e, n) {
        "function" != typeof Promise && (window.Promise = n(1));
        var i = {
            version: "0.0.5",
            Dispatcher: n(4),
            HistoryManager: n(5),
            BaseTransition: n(6),
            BaseView: n(8),
            Pjax: n(9),
            Prefetch: n(13),
            Utils: n(7)
        };
        t.exports = i
    }, function(t, e, n) {
        (function(e) {
            ! function(n) {
                function i(t, e) {
                    return function() {
                        t.apply(e, arguments)
                    }
                }

                function r(t) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof t) throw new TypeError("not a function");
                    this._state = null, this._value = null, this._deferreds = [], h(t, i(s, this), i(a, this))
                }

                function o(t) {
                    return null === this._state ? void this._deferreds.push(t) : void l(function() {
                        var e = i._state ? t.onFulfilled : t.onRejected;
                        if (null === e) return void(i._state ? t.resolve : t.reject)(i._value);
                        var n;
                        try {
                            n = e(i._value)
                        } catch (i) {
                            return void t.reject(i)
                        }
                        t.resolve(n)
                    })
                }

                function s(t) {
                    try {
                        if (t === this) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var e = t.then;
                            if ("function" == typeof e) return void h(i(e, t), i(s, this), i(a, this))
                        }
                        this._state = !0, this._value = t, c.call(this)
                    } catch (t) {
                        a.call(this, t)
                    }
                }

                function a(t) {
                    this._state = !1, this._value = t, c.call(this)
                }

                function c() {
                    for (var t = 0, e = this._deferreds.length; e > t; t++) o.call(this, this._deferreds[t]);
                    this._deferreds = null
                }

                function u(t, e, n, i) {
                    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.resolve = n, this.reject = i
                }

                function h(t, e, n) {
                    var i = !1;
                    try {
                        t(function(t) {
                            i || (i = !0, e(t))
                        }, function(t) {
                            i || (i = !0, n(t))
                        })
                    } catch (t) {
                        if (i) return;
                        i = !0, n(t)
                    }
                }
                var l = "function" == typeof e && e || function(t) {
                        setTimeout(t, 1)
                    },
                    p = Array.isArray || function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    };
                r.prototype["catch"] = function(t) {
                    return this.then(null, t)
                }, r.prototype.then = function(t, e) {
                    var n = this;
                    return new r(function(i, r) {
                        o.call(n, new u(t, e, i, r))
                    })
                }, r.all = function() {
                    var t = Array.prototype.slice.call(1 === arguments.length && p(arguments[0]) ? arguments[0] : arguments);
                    return new r(function(e, n) {
                        function i(t, o) {
                            try {
                                if (o && ("object" == typeof o || "function" == typeof o)) {
                                    var s = o.then;
                                    if ("function" == typeof s) return void s.call(o, function(e) {
                                        i(t, e)
                                    }, n)
                                }
                                a[t] = o, 0 === --r && e(a)
                            } catch (a) {
                                n(a)
                            }
                        }
                        if (0 === t.length) return e([]);
                        for (var r = t.length, o = 0; o < t.length; o++) i(o, t[o])
                    })
                }, r.resolve = function(t) {
                    return t && "object" == typeof t && t.constructor === r ? t : new r(function(e) {
                        e(t)
                    })
                }, r.reject = function(t) {
                    return new r(function(e, n) {
                        n(t)
                    })
                }, r.race = function(t) {
                    return new r(function(e, n) {
                        for (var i = 0, r = t.length; r > i; i++) t[i].then(e, n)
                    })
                }, r._setImmediateFn = function(t) {
                    l = t
                }, "undefined" != typeof t && t.exports ? t.exports = r : n.Promise || (n.Promise = r)
            }(this)
        }).call(e, n(2).setImmediate)
    }, function(t, e, n) {
        (function(t, i) {
            function r(t, e) {
                this._id = t, this._clearFn = e
            }
            var o = n(3).nextTick,
                s = Function.prototype.apply,
                a = Array.prototype.slice,
                c = {},
                u = 0;
            e.setTimeout = function() {
                return new r(s.call(setTimeout, window, arguments), clearTimeout)
            }, e.setInterval = function() {
                return new r(s.call(setInterval, window, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function(t) {
                t.close()
            }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
                this._clearFn.call(window, this._id)
            }, e.enroll = function(t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function(t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                    t._onTimeout && t._onTimeout()
                }, e))
            }, e.setImmediate = "function" == typeof t ? t : function(t) {
                var n = u++,
                    i = arguments.length < 2 ? !1 : a.call(arguments, 1);
                return c[n] = !0, o(function() {
                    c[n] && (i ? t.apply(null, i) : t.call(null), e.clearImmediate(n))
                }), n
            }, e.clearImmediate = "function" == typeof i ? i : function(t) {
                delete c[t]
            }
        }).call(e, n(2).setImmediate, n(2).clearImmediate)
    }, function(t, e) {
        function n() {
            u = !1, s.length ? c = s.concat(c) : h = -1, c.length && i()
        }

        function i() {
            if (!u) {
                var t = setTimeout(n);
                u = !0;
                for (var e = c.length; e;) {
                    for (s = c, c = []; ++h < e;) s && s[h].run();
                    h = -1, e = c.length
                }
                s = null, u = !1, clearTimeout(t)
            }
        }

        function r(t, e) {
            this.fun = t, this.array = e
        }

        function o() {}
        var s, a = t.exports = {},
            c = [],
            u = !1,
            h = -1;
        a.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            c.push(new r(t, e)), 1 !== c.length || u || setTimeout(i, 0)
        }, r.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = o, a.addListener = o, a.once = o, a.off = o, a.removeListener = o, a.removeAllListeners = o, a.emit = o, a.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, a.cwd = function() {
            return "/"
        }, a.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, a.umask = function() {
            return 0
        }
    }, function(t, e) {
        var n = {
            events: {},
            on: function(t, e) {
                this.events[t] = this.events[t] || [], this.events[t].push(e)
            },
            off: function(t, e) {
                t in this.events != 0 && this.events[t].splice(this.events[t].indexOf(e), 1)
            },
            trigger: function(t) {
                if (t in this.events != 0)
                    for (var e = 0; e < this.events[t].length; e++) this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        t.exports = n
    }, function(t, e) {
        var n = {
            states: [],
            add: function(t, e) {
                e || (e = void 0), this.states.push({
                    url: t,
                    namespace: e
                })
            },
            currentStatus: function() {
                return this.states[this.states.length - 1]
            },
            prevStatus: function() {
                var t = this.states;
                return t.length < 2 ? null : t[t.length - 2]
            }
        };
        t.exports = n
    }, function(t, e, n) {
        var i = n(7),
            r = {
                oldContainer: void 0,
                newContainer: void 0,
                newContainerLoading: void 0,
                extend: function(t) {
                    return i.extend(this, t)
                },
                init: function(t, e) {
                    var n = this;
                    return this.oldContainer = t, this._newContainerPromise = e, this.deferred = i.deferred(), this.newContainerReady = i.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function(t) {
                        n.newContainer = t, n.newContainerReady.resolve()
                    }), this.deferred.promise
                },
                done: function() {
                    this.oldContainer.parentNode.removeChild(this.oldContainer), this.deferred.resolve()
                },
                start: function() {}
            };
        t.exports = r
    }, function(t, e) {
        var n = {
            getCurrentUrl: function() {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function(t) {
                return t.replace(/#.*/, "")
            },
            xhr: function(t) {
                var e = this.deferred(),
                    n = new XMLHttpRequest;
                return n.onreadystatechange = function() {
                    return 4 === n.readyState ? 200 === n.status ? e.resolve(n.responseText) : e.reject() : void 0
                }, n.open("GET", t), n.send(), e.promise
            },
            extend: function(t, e) {
                var n = Object.create(t);
                for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
                return n
            },
            deferred: function() {
                return new function() {
                    this.resolve = null, this.reject = null, this.promise = new Promise(function(t, e) {
                        this.resolve = t, this.reject = e
                    }.bind(this))
                }
            }
        };
        t.exports = n
    }, function(t, e, n) {
        var i = n(4),
            r = n(7),
            o = {
                namespace: null,
                extend: function(t) {
                    return r.extend(this, t)
                },
                init: function() {
                    var t = this;
                    i.on("initStateChange", function(e, n) {
                        n && n.namespace === t.namespace && t.onLeave()
                    }), i.on("newPageReady", function(e, n) {
                        e.namespace === t.namespace && t.onEnter()
                    }), i.on("transitionCompleted", function(e, n) {
                        e.namespace === t.namespace && t.onEnterCompleted(), n && n.namespace === t.namespace && t.onLeaveCompleted()
                    })
                },
                onEnter: function() {},
                onEnterCompleted: function() {},
                onLeave: function() {},
                onLeaveCompleted: function() {}
            };
        t.exports = o
    }, function(t, e, n) {
        var i = n(7),
            r = n(4),
            o = n(10),
            s = n(11),
            a = n(5),
            c = n(12),
            u = {
                Dom: c,
                History: a,
                Cache: s,
                cacheEnabled: !0,
                transitionProgress: !1,
                start: function() {
                    this.init()
                },
                init: function() {
                    this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(this.Dom.getContainer())), r.trigger("initStateChange", this.History.currentStatus()), r.trigger("newPageReady", this.History.currentStatus()), r.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                },
                bindEvents: function() {
                    document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                },
                getCurrentUrl: function() {
                    return i.cleanLink(i.getCurrentUrl())
                },
                goTo: function(t) {
                    window.history.pushState(null, null, t), this.onStateChange()
                },
                forceGoTo: function(t) {
                    window.location = t
                },
                load: function(t) {
                    var e, n = i.deferred(),
                        r = this;
                    return e = this.Cache.get(t), e || (e = i.xhr(t), this.Cache.set(t, e)), e.then(function(t) {
                        var e = r.Dom.parseResponse(t);
                        r.Dom.getNamespace(e), r.Dom.putContainer(e), r.cacheEnabled || r.Cache.reset(), n.resolve(e)
                    }, function() {
                        r.forceGoTo(t), n.reject()
                    }), n.promise
                },
                onLinkClick: function(t) {
                    for (var e = t.target; e && !e.href;) e = e.parentNode;
                    this.preventCheck(t, e) && (t.stopPropagation(), t.preventDefault(), r.trigger("linkClicked", e), this.goTo(e.href))
                },
                preventCheck: function(t, e) {
                    return e && e.href ? t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey ? !1 : e.target && "_blank" === e.target ? !1 : window.location.protocol !== e.protocol || window.location.hostname !== e.hostname ? !1 : e.href.indexOf("#") > -1 ? !1 : i.cleanLink(e.href) == i.cleanLink(location.href) ? !1 : !e.classList.contains("no-gungo") : !1
                },
                getTransition: function() {
                    return o
                },
                onStateChange: function() {
                    var t = this.getCurrentUrl();
                    if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
                    this.History.add(t);
                    var e = this.load(t),
                        n = Object.create(this.getTransition());
                    this.transitionProgress = !0, r.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                    var i = n.init(this.Dom.getContainer(), e);
                    e.then(this.onNewContainerLoaded.bind(this)), i.then(this.onTransitionEnd.bind(this))
                },
                onNewContainerLoaded: function(t) {
                    var e = this.History.currentStatus();
                    e.namespace = this.Dom.getNamespace(t), r.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus())
                },
                onTransitionEnd: function() {
                    this.transitionProgress = !1, r.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                }
            };
        t.exports = u
    }, function(t, e, n) {
        var i = (n(7), n(6)),
            r = i.extend({
                start: function() {
                    this.newContainerLoading.then(this.hideShow.bind(this))
                },
                hideShow: function() {
                    this.oldContainer.style.visibility = "hidden", this.newContainer.style.visibility = "visible", document.body.scrollTop = 0, this.done()
                }
            });
        t.exports = r
    }, function(t, e) {
        var n = {
            data: [],
            extend: function(t) {
                return Utils.extend(this, t)
            },
            set: function(t, e) {
                this.data[t] = e
            },
            get: function(t) {
                return this.data[t]
            },
            reset: function() {
                this.data = []
            }
        };
        t.exports = n
    }, function(t, e) {
        var n = {
            parseResponse: function(t) {
                var e = document.createElement("div");
                e.innerHTML = t;
                var n = e.querySelector("title");
                return n && (document.title = n.textContent), this.getContainer(e)
            },
            getContainer: function(t) {
                if (t || (t = document.body), !t) throw new Error("Gungo.js: DOM not ready!");
                var e = this.parseContainer(t);
                if (e && e.jquery && (e = e[0]), !e) throw new Error("Gungo.js: no container found");
                return e
            },
            getNamespace: function(t) {
                return t && t.dataset ? t.dataset.namespace : null
            },
            putContainer: function(t) {
                t.style.visibility = "hidden", document.getElementById("gungo-wrapper").appendChild(t)
            },
            parseContainer: function(t) {
                return t.querySelector(".gungo-container")
            }
        };
        t.exports = n
    }, function(t, e, n) {
        var i = n(7),
            r = n(9),
            o = {
                init: function() {
                    document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), document.body.addEventListener("touchstart", this.onLinkEnter.bind(this))
                },
                onLinkEnter: function(t) {
                    for (var e = t.target; e && !e.href;) e = e.parentNode;
                    if (e) {
                        var n = e.href;
                        if (r.preventCheck(t, e) && !r.Cache.get(n)) {
                            var o = i.xhr(n);
                            r.Cache.set(n, o)
                        }
                    }
                }
            };
        t.exports = o
    }])
}), ! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var n = this._events = this._events || {},
                i = n[t] = n[t] || [];
            return -1 == i.indexOf(e) && i.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var n = this._onceEvents = this._onceEvents || {},
                i = n[t] = n[t] || [];
            return i[e] = !0, this
        }
    }, e.off = function(t, e) {
        var n = this._events && this._events[t];
        if (n && n.length) {
            var i = n.indexOf(e);
            return -1 != i && n.splice(i, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var n = this._events && this._events[t];
        if (n && n.length) {
            var i = 0,
                r = n[i];
            e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t]; r;) {
                var s = o && o[r];
                s && (this.off(t, r), delete o[r]), r.apply(this, e), i += s ? 0 : 1, r = n[i]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(n) {
        return e(t, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
    function n(t, e) {
        for (var n in e) t[n] = e[n];
        return t
    }

    function i(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var n = 0; n < t.length; n++) e.push(t[n]);
        else e.push(t);
        return e
    }

    function r(t, e, o) {
        return this instanceof r ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = n({}, this.options), "function" == typeof e ? o = e : n(this.options, e), o && this.on("always", o), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new r(t, e, o)
    }

    function o(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var a = t.jQuery,
        c = t.console;
    r.prototype = Object.create(e.prototype), r.prototype.options = {}, r.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, r.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && u[e]) {
            for (var n = t.querySelectorAll("img"), i = 0; i < n.length; i++) {
                var r = n[i];
                this.addImage(r)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (i = 0; i < o.length; i++) {
                    var s = o[i];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return r.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(e.backgroundImage); null !== i;) {
                var r = i && i[2];
                r && this.addBackground(r, t), i = n.exec(e.backgroundImage)
            }
    }, r.prototype.addImage = function(t) {
        var e = new o(t);
        this.images.push(e)
    }, r.prototype.addBackground = function(t, e) {
        var n = new s(t, e);
        this.images.push(n)
    }, r.prototype.check = function() {
        function t(t, n, i) {
            setTimeout(function() {
                e.progress(t, n, i)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, r.prototype.progress = function(t, e, n) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + n, t, e)
    }, r.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, o.prototype = Object.create(e.prototype), o.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, o.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, o.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, o.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, o.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, o.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(o.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, r.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function(t, e) {
            var n = new r(this, t, e);
            return n.jqDeferred.promise(a(this))
        })
    }, r.makeJQueryPlugin(), r
}), ! function() {
    "use strict";

    function t(i) {
        if (!i) throw new Error("No options passed to Waypoint constructor");
        if (!i.element) throw new Error("No element option passed to Waypoint constructor");
        if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, i), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, e += 1
    }
    var e = 0,
        n = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete n[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var i in n) e.push(n[i]);
        for (var r = 0, o = e.length; o > r; r++) e[r][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.invokeAll("enable")
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = r.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, n += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var n = 0,
        i = {},
        r = window.Waypoint,
        o = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete i[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, r.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || r.isTouch) && (e.didScroll = !0, r.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        r.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var n in e) {
            var i = e[n],
                r = i.newScroll > i.oldScroll,
                o = r ? i.forward : i.backward;
            for (var s in this.waypoints[n]) {
                var a = this.waypoints[n][s],
                    c = i.oldScroll < a.triggerPoint,
                    u = i.newScroll >= a.triggerPoint,
                    h = c && u,
                    l = !c && !u;
                (h || l) && (a.queueTrigger(o), t[a.group.id] = a.group)
            }
        }
        for (var p in t) t[p].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? r.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? r.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var n in this.waypoints[e]) t.push(this.waypoints[e][n]);
        for (var i = 0, r = t.length; r > i; i++) t[i].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            n = e ? void 0 : this.adapter.offset(),
            i = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : n.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : n.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var o in t) {
            var s = t[o];
            for (var a in this.waypoints[o]) {
                var c, u, h, l, p, d = this.waypoints[o][a],
                    f = d.options.offset,
                    m = d.triggerPoint,
                    g = 0,
                    v = null == m;
                d.element !== d.element.window && (g = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), c = s.contextScroll - s.contextOffset, d.triggerPoint = g + c - f, u = m < s.oldScroll, h = d.triggerPoint >= s.oldScroll, l = u && h, p = !u && !h, !v && l ? (d.queueTrigger(s.backward), i[d.group.id] = d.group) : !v && p ? (d.queueTrigger(s.forward), i[d.group.id] = d.group) : v && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), i[d.group.id] = d.group)
            }
        }
        return r.requestAnimationFrame(function() {
            for (var t in i) i[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in i) i[t].refresh()
    }, e.findByElement = function(t) {
        return i[t.waypointContextKey]
    }, window.onload = function() {
        o && o(), e.refreshAll()
    }, r.requestAnimationFrame = function(e) {
        var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        n.call(window, e)
    }, r.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function n(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
    }
    var i = {
            vertical: {},
            horizontal: {}
        },
        r = window.Waypoint;
    n.prototype.add = function(t) {
        this.waypoints.push(t)
    }, n.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, n.prototype.flushTriggers = function() {
        for (var n in this.triggerQueues) {
            var i = this.triggerQueues[n],
                r = "up" === n || "left" === n;
            i.sort(r ? e : t);
            for (var o = 0, s = i.length; s > o; o += 1) {
                var a = i[o];
                (a.options.continuous || o === i.length - 1) && a.trigger([n])
            }
        }
        this.clearTriggerQueues()
    }, n.prototype.next = function(e) {
        this.waypoints.sort(t);
        var n = r.Adapter.inArray(e, this.waypoints),
            i = n === this.waypoints.length - 1;
        return i ? null : this.waypoints[n + 1]
    }, n.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var n = r.Adapter.inArray(e, this.waypoints);
        return n ? this.waypoints[n - 1] : null
    }, n.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, n.prototype.remove = function(t) {
        var e = r.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, n.prototype.first = function() {
        return this.waypoints[0]
    }, n.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, n.findOrCreate = function(t) {
        return i[t.axis][t.name] || new n(t)
    }, r.Group = n
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        n = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, n) {
        t.prototype[n] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[n].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(n, i) {
        t[i] = e[i]
    }), n.adapters.push({
        name: "jquery",
        Adapter: t
    }), n.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var n = [],
                i = arguments[0];
            return t.isFunction(arguments[0]) && (i = t.extend({}, arguments[1]), i.handler = arguments[0]), this.each(function() {
                var r = t.extend({}, i, {
                    element: this
                });
                "string" == typeof r.context && (r.context = t(this).closest(r.context)[0]), n.push(new e(r))
            }), n
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(), window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame, CubicBezier.create("custom-0.25", .25, .1, .25, 1), CubicBezier.create("custom-0.63-0.38", .63, .01, .38, 1), CubicBezier.create("custom-0.63-0.25", .63, -.01, .25, 1), CubicBezier.create("custom-0.66", .66, .01, .25, 1), CubicBezier.create("custom-0.68", .68, .02, .35, 1.01), CubicBezier.create("custom-0.74", .74, 0, .22, 1.01), CubicBezier.create("custom-0.84", .84, 0, .25, 1), TweenLite.defaultEase = Power1.easeOut, Gungo.Pjax.load = function(t) {
    var e, n = Gungo.Utils.deferred(),
        i = this;
    return e = this.Cache.get(t), e || (e = Gungo.Utils.xhr(t), this.Cache.set(t, e)), e.then(function(t) {
        var e = i.Dom.parseResponse(t);
        i.Dom.getNamespace(e);
        if (i.Dom.putContainer(e), i.cacheEnabled || i.Cache.reset(), void 0 === imagesLoaded || "function" != typeof imagesLoaded) return n.resolve(e);
        var r = imagesLoaded(e, {
                background: "*"
            }),
            o = 0;
        r.on("progress", function(t, e) {
            o++;
            var n = o / t.images.length;
            Gungo.Dispatcher.trigger("newPageProgress", n)
        }), r.on("always", function(t) {
            Gungo.Dispatcher.trigger("newPageProgress", 1), n.resolve(e)
        })
    }, function() {
        i.forceGoTo(t), n.reject()
    }), n.promise
}, Gungo.Dispatcher.on("linkClicked", function(t) {
    t.dataset && t.dataset.namespace && Gungo.Pjax.History.storeNamespace(t.dataset.namespace)
}), Gungo.Dispatcher.on("initStateChange", function(t) {
    app.disableScroll(), {}, TweenLite.killTweensOf(loader.$progressbar), TweenLite.killTweensOf(loader.$progressbar_inner), t.namespace || Gungo.Pjax.History.setCurrentNamespace()
}), Gungo.Dispatcher.on("newPageReady", function(t, e) {
    app.inlineSVG()
}), Gungo.Dispatcher.on("newPageProgress", function(t) {
    loader.progress(t)
}), Gungo.Dispatcher.on("transitionCompleted", function(t, e) {
    if ($("body").addClass("loaded ready"), app.enableScroll(!1), app.resetWaypoints(), TweenLite.set(Gungo.Pjax.Dom.getContainer(), {
            opacity: 1
        }), "undefined" != typeof e) {
        var n = "white";
        t.namespace && -1 === ["page", "contact"].indexOf(t.namespace) || (n = "black"), app.setHeaderColor(n)
    }
}), Gungo.HistoryManager.getNamespace = function(t) {
    if (this.states.length) {
        var e = void 0;
        return this.states.forEach(function(n, i) {
            e || t !== n.url || (e = n.namespace)
        }), e
    }
}, Gungo.HistoryManager.storeNamespace = function(t) {
    this._namespace = t
}, Gungo.HistoryManager.setCurrentNamespace = function() {
    if ("undefined" != typeof this._namespace) {
        var t = this.currentStatus();
        t && (this._namespace || (this._namespace = this.getNamespace(t.url)), t.namespace = this._namespace, this._namespace = null);
    }
};
var BasicTransition = Gungo.BaseTransition.extend({
    start: function() {
        var t = this;
        Promise.all([this.exit(), this.progress(), this.newContainerLoading]).then(function() {
            var e = Gungo.Pjax.History.currentStatus();
            "project" !== e.namespace && TweenLite.set(loader.$progressbar, {
                clearProps: "background"
            }), app.setTitles(), app.enableScroll(0), t.enter.call(t)
        })
    },
    exit: function() {
        var t = Gungo.Utils.deferred(),
            e = new TimelineLite({
                onComplete: function() {
                    t.resolve()
                }
            }),
            n = {
                opacity: 1,
                zIndex: 9
            },
            i = !!+loader.$progressbar.css("opacity");
        i || (n.background = "none"), e.set(loader.$progressbar, n);
        var r = Gungo.Pjax.History.prevStatus(),
            o = Gungo.Pjax.History.currentStatus(),
            s = this.getColor(r.namespace),
            a = "";
        "home" === o.namespace ? a = first_project_color : "#fff" === s && (a = loader.$progressbar.data("initial-color")), a && e.set(loader.$progressbar_inner, {
            backgroundColor: a
        });
        var c = "";
        return $(this.oldContainer).find(".site__content"), c && e.to(c, .5, {
            opacity: 0,
            ease: Power1.easeOut
        }), t.promise
    },
    progress: function() {
        return loader.startProgress()
    },
    enter: function() {
        var t = new TimelineLite({
                onComplete: this.done,
                onCompleteScope: this
            }),
            e = Gungo.Pjax.History.prevStatus(),
            n = Gungo.Pjax.History.currentStatus(),
            i = this.getColor(e.namespace);
        loader.displayProgressbar(n.namespace), t.set([this.oldContainer, this.newContainer], {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%"
        }).set(this.oldContainer, {
            autoAlpha: 0
        }).set(this.newContainer, {
            autoAlpha: 1
        }).set(".doors-transition_top", {
            top: 0,
            bottom: "auto"
        }).set(".doors-transition_bottom", {
            bottom: -1,
            top: "auto"
        }).fromTo(".doors-transition", .8, {
            height: "50%",
            backgroundColor: i
        }, {
            height: 0,
            clearProps: "top, bottom",
            ease: CubicBezier.get("custom-0.74")
        }).set(this.newContainer, {
            clearProps: "position, top, left, width"
        })
    },
    getColor: function(t) {
        var e = "#000";
        return "home" === t ? e = Home.getColor() : -1 !== ["contact", "project", "page"].indexOf(t) && (e = "#fff"), e
    }
});
Gungo.Pjax.getTransition = function() {
    var t = Gungo.Pjax.History.prevStatus(),
        e = Gungo.Pjax.History.currentStatus();
    return e.namespace || Gungo.Pjax.History.setCurrentNamespace(), "projects" === t.namespace && "project" === e.namespace ? ProjectsToProjectTransition : "home" === t.namespace && "project" === e.namespace ? HomeToProjectTransition : "project" === t.namespace && "project" === e.namespace ? ProjectToProjectTransition : BasicTransition
};
var loader = {
    done: !1,
    deferred: null,
    _progress: 0,
    _timeout_id: null,
    $body: null,
    $progressbar: null,
    $progressbar_inner: null,
    init: function() {
        $("body").removeClass("loaded ready"), this.$progressbar = $(".progressbar"), this.$progressbar_inner = $("#progressbar").show();
        var t = this.$progressbar.css("background-color");
        this.$progressbar.data("initial-color", t), this._progress = 0, this._timeout_id = null, this.done = !1, this.deferred = null, this.start()
    },
    start: function() {
        var t = this;
        if (!this.done) {
            var e = new TimelineLite({
                delay: .6,
                onComplete: function() {
                    this.done = !0, $("body").addClass("ready"), Gungo.Pjax.start()
                },
                onCompleteScope: this
            });
            e.set(Gungo.Pjax.Dom.getContainer(), {
                opacity: 1
            }).set(".doors-transition_top", {
                top: 0,
                bottom: "auto"
            }).set(".doors-transition_bottom", {
                bottom: -1,
                top: "auto"
            }).set(this.$progressbar, {
                background: "none"
            }).set(this.$progressbar_inner, {
                backgroundColor: this.$progressbar.data("initial-color")
            }).fromTo(this.$progressbar_inner, 1, {
                right: 0,
                left: "auto",
                width: "100%"
            }, {
                width: 0,
                force3D: "auto",
                clearProps: "all",
                ease: CubicBezier.get("custom-0.66")
            }).set(this.$progressbar, {
                clearProps: "background"
            }).add(function() {
                app.enableScroll(0), app.setTitles();
                var e = Gungo.Pjax.Dom.getNamespace(Gungo.Pjax.Dom.getContainer());
                t.displayProgressbar(e), $("body").addClass("loaded")
            }).to(".doors-transition", .8, {
                height: 0,
                clearProps: "top, bottom",
                ease: CubicBezier.get("custom-0.74")
            }).fromTo([".site__logo", ".site__nav"], 1, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                ease: CubicBezier.get("custom-0.84")
            })
        }
    },
    startProgress: function() {
        var t = this;
        return this.deferred = Gungo.Utils.deferred(), this._progress = 0, TweenLite.set(this.$progressbar_inner, {
            opacity: 1,
            left: 0,
            right: "auto"
        }), this._timeout_id = setTimeout(function() {
            t._timeout_id = null, 1 === t._progress && t.endProgress()
        }, 1e3), this.deferred.promise
    },
    progress: function(t) {
        isNaN(t) || (t = Math.max(0, Math.min(1, t)), TweenLite.to(this.$progressbar_inner, .3, {
            width: 100 * t + "%",
            ease: Power0.easeNone,
            onComplete: function(t) {
                this._progress = t, 1 !== t || this._timeout_id || this.endProgress()
            },
            onCompleteScope: this,
            onCompleteParams: [t]
        }))
    },
    endProgress: function() {
        return this._progress = 1, this.deferred ? (TweenLite.set(this.$progressbar_inner, {
            clearProps: "all"
        }), this.deferred.resolve()) : void 0
    },
    displayProgressbar: function(t) {
        var e = {
            opacity: +(-1 !== ["home", "projects"].indexOf(t))
        };
        "projects" === t && (e.zIndex = 2), TweenLite.set(this.$progressbar, e)
    }
};
$(function() {
    loader.init()
});

! function(t) {
    "use strict";
    var e = function(e, s) {
        this.el = t(e), this.options = t.extend({}, t.fn.typed.defaults, s), this.isInput = this.el.is("input, textarea"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    e.prototype = {
        constructor: e,
        init: function() {
            var t = this;
            t.timeout = setTimeout(function() {
                for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.isInput && t.el.focus(), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function() {
            var e = this;
            if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                e.strings = [], this.stringsElement.hide();
                var s = this.stringsElement.find("p");
                t.each(s, function(s, i) {
                    e.strings.push(t(i).html())
                })
            }
            this.init()
        },
        typewrite: function(t, e) {
            if (this.stop !== !0) {
                var s = Math.round(70 * Math.random()) + this.typeSpeed,
                    i = this;
                i.timeout = setTimeout(function() {
                    var s = 0,
                        n = t.substr(e);
                    if ("^" === n.charAt(0)) {
                        var o = 1;
                        /^\^\d+/.test(n) && (n = /\d+/.exec(n)[0], o += n.length, s = parseInt(n)), t = t.substring(0, e) + t.substring(e + o)
                    }
                    if ("html" === i.contentType) {
                        var r = t.substr(e).charAt(0);
                        if ("<" === r || "&" === r) {
                            var a = "",
                                u = "";
                            for (u = "<" === r ? ">" : ";"; t.substr(e).charAt(0) !== u;) a += t.substr(e).charAt(0), e++;
                            e++, a += u
                        }
                    }
                    i.timeout = setTimeout(function() {
                        if (e === t.length) {
                            if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                            i.timeout = setTimeout(function() {
                                i.backspace(t, e)
                            }, i.backDelay)
                        } else {
                            0 === e && i.options.preStringTyped(i.arrayPos);
                            var s = t.substr(0, e + 1);
                            i.attr ? i.el.attr(i.attr, s) : i.isInput ? i.el.val(s) : "html" === i.contentType ? i.el.html(s) : i.el.text(s), e++, i.typewrite(t, e)
                        }
                    }, s)
                }, s)
            }
        },
        backspace: function(t, e) {
            if (this.stop !== !0) {
                var s = Math.round(70 * Math.random()) + this.backSpeed,
                    i = this;
                i.timeout = setTimeout(function() {
                    if ("html" === i.contentType && ">" === t.substr(e).charAt(0)) {
                        for (var s = "";
                            "<" !== t.substr(e).charAt(0);) s -= t.substr(e).charAt(0), e--;
                        e--, s += "<"
                    }
                    var n = t.substr(0, e);
                    i.attr ? i.el.attr(i.attr, n) : i.isInput ? i.el.val(n) : "html" === i.contentType ? i.el.html(n) : i.el.text(n), e > i.stopNum ? (e--, i.backspace(t, e)) : e <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], e))
                }, s)
            }
        },
        shuffleArray: function(t) {
            var e, s, i = t.length;
            if (i)
                for (; --i;) s = Math.floor(Math.random() * (i + 1)), e = t[s], t[s] = t[i], t[i] = e;
            return t
        },
        reset: function() {
            var t = this;
            clearInterval(t.timeout);
            var e = this.el.attr("id");
            this.el.after('<span id="' + e + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), t.options.resetCallback()
        }
    }, t.fn.typed = function(s) {
        return this.each(function() {
            var i = t(this),
                n = i.data("typed"),
                o = "object" == typeof s && s;
            n || i.data("typed", n = new e(this, o)), "string" == typeof s && n[s]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery), ! function(t, e) {
    if ("function" == typeof define && define.amd) define(["exports", "module"], e);
    else if ("undefined" != typeof exports && "undefined" != typeof module) e(exports, module);
    else {
        var s = {
            exports: {}
        };
        e(s.exports, s), t.autosize = s.exports
    }
}(this, function(t, e) {
    "use strict";

    function s(t) {
        function e() {
            var e = window.getComputedStyle(t, null);
            p = e.overflowY, "vertical" === e.resize ? t.style.resize = "none" : "both" === e.resize && (t.style.resize = "horizontal"), d = "content-box" === e.boxSizing ? -(parseFloat(e.paddingTop) + parseFloat(e.paddingBottom)) : parseFloat(e.borderTopWidth) + parseFloat(e.borderBottomWidth), isNaN(d) && (d = 0), n()
        }

        function s(e) {
            var s = t.style.width;
            t.style.width = "0px", t.offsetWidth, t.style.width = s, p = e, c && (t.style.overflowY = e), i()
        }

        function i() {
            var e = window.pageYOffset,
                s = document.body.scrollTop,
                i = t.style.height;
            t.style.height = "auto";
            var n = t.scrollHeight + d;
            return 0 === t.scrollHeight ? void(t.style.height = i) : (t.style.height = n + "px", f = t.clientWidth, document.documentElement.scrollTop = e, void(document.body.scrollTop = s))
        }

        function n() {
            var e = t.style.height;
            i();
            var n = window.getComputedStyle(t, null);
            if (n.height !== t.style.height ? "visible" !== p && s("visible") : "hidden" !== p && s("hidden"), e !== t.style.height) {
                var o = r("autosize:resized");
                t.dispatchEvent(o)
            }
        }
        var a = void 0 === arguments[1] ? {} : arguments[1],
            u = a.setOverflowX,
            l = void 0 === u ? !0 : u,
            h = a.setOverflowY,
            c = void 0 === h ? !0 : h;
        if (t && t.nodeName && "TEXTAREA" === t.nodeName && !o.has(t)) {
            var d = null,
                p = null,
                f = t.clientWidth,
                y = function() {
                    t.clientWidth !== f && n()
                },
                v = function(e) {
                    window.removeEventListener("resize", y, !1), t.removeEventListener("input", n, !1), t.removeEventListener("keyup", n, !1), t.removeEventListener("autosize:destroy", v, !1), t.removeEventListener("autosize:update", n, !1), o["delete"](t), Object.keys(e).forEach(function(s) {
                        t.style[s] = e[s]
                    })
                }.bind(t, {
                    height: t.style.height,
                    resize: t.style.resize,
                    overflowY: t.style.overflowY,
                    overflowX: t.style.overflowX,
                    wordWrap: t.style.wordWrap
                });
            t.addEventListener("autosize:destroy", v, !1), "onpropertychange" in t && "oninput" in t && t.addEventListener("keyup", n, !1), window.addEventListener("resize", y, !1), t.addEventListener("input", n, !1), t.addEventListener("autosize:update", n, !1), o.add(t), l && (t.style.overflowX = "hidden", t.style.wordWrap = "break-word"), e()
        }
    }

    function i(t) {
        if (t && t.nodeName && "TEXTAREA" === t.nodeName) {
            var e = r("autosize:destroy");
            t.dispatchEvent(e)
        }
    }

    function n(t) {
        if (t && t.nodeName && "TEXTAREA" === t.nodeName) {
            var e = r("autosize:update");
            t.dispatchEvent(e)
        }
    }
    var o = "function" == typeof Set ? new Set : function() {
            var t = [];
            return {
                has: function(e) {
                    return Boolean(t.indexOf(e) > -1)
                },
                add: function(e) {
                    t.push(e)
                },
                "delete": function(e) {
                    t.splice(t.indexOf(e), 1)
                }
            }
        }(),
        r = function(t) {
            return new Event(t)
        };
    try {
        new Event("test")
    } catch (a) {
        r = function(t) {
            var e = document.createEvent("Event");
            return e.initEvent(t, !0, !1), e
        }
    }
    var u = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (u = function(t) {
        return t
    }, u.destroy = function(t) {
        return t
    }, u.update = function(t) {
        return t
    }) : (u = function(t, e) {
        return t && Array.prototype.forEach.call(t.length ? t : [t], function(t) {
            return s(t, e)
        }), t
    }, u.destroy = function(t) {
        return t && Array.prototype.forEach.call(t.length ? t : [t], i), t
    }, u.update = function(t) {
        return t && Array.prototype.forEach.call(t.length ? t : [t], n), t
    }), e.exports = u
});
var Contact = Gungo.BaseView.extend({
    namespace: "contact",
    onEnterCompleted: function() {
        this._construct()
    },
    onLeave: function() {
        this.destroy()
    },
    _waypoints: null,
    _began: !1,
    _default_msg: "",
    $el: null,
    _$textarea: null,
    _$submit: null,
    _$sent: null,
    _construct: function() {
        this.$el = $("#js-form-contact");
        if(this.$el.length) {
            this._$textarea = $("#js-form--textarea");
            this._$submit = $(".js-form--submit").show().removeClass("active disabled invalid sending").attr("disabled", !0); 
            this._$sent = $("#js-form--sent").removeAttr("style");
            this._began = false;
            this._default_msg = "";
            this._initPlugins();
        }
    },
    _initPlugins: function() {
        var t = this;
        autosize(this._$textarea); 
        this._waypoints = this.$el.waypoint({
            offset: "bottom-in-view",
            handler: function(e) {
                "down" !== e || t._began || t.typewrite()
            }
        });

        this.$el.ajaxForm({
            beforeSubmit: function(e, s, i) {
                var n = t.validate(t._$textarea.val());            
                return t._$submit.toggleClass("invalid disabled", !n).attr("disabled", !n), n && t.onSubmit(), n
            },
            data: {
                // _my_little_secret: 1
            },
            dataType: "json",
            complete: function(jqXHR) {
                // console.log(jqXHR);
            },
            success: function(e, s, i, n) {                
                $.isPlainObject(e) && !$.isEmptyObject(e) && e.success == "true" && setTimeout(function() {
                    t.onMailSent(e.message)
                }, 600)
            },
            error: function(t, e, s, i) {
                var n = $('<div class="ajax-error"></div>').text(s.message);
                i.after(n)
            }
        });
    },
    _initEvents: function() {
        var t = this;
        this._$textarea.on("keyup." + this.namespace, function(e) {
            var s = t._$textarea.val(),
                i = !0;
            (t._isEmpty(s) || t._isDefault(s)) && (i = !1), t._$submit.removeClass("invalid").toggleClass("disabled", !i).attr("disabled", !i)
        }), this.$el.on("click." + this.namespace + " tap." + this.namespace, function(e) {
            t._$textarea.trigger("focus")
        })
    },
    destroy: function() {
        if (this.$el.length) {
            if (this._waypoints && this._waypoints.length)
                for (var t in this._waypoints) this._waypoints[t].destroy();
            this._$textarea.data("typed") && clearInterval(this._$textarea.data("typed").timeout), this._$textarea.removeData("typed"), this._began = !1, this._default_msg = ""
        }
    },
    typewrite: function() {
        var t = this;
        this._began = !0, this._default_msg = this._$textarea.data("strings").replace(/<br>/g, "\n"), this._$textarea.typed({
            strings: [this._default_msg],
            callback: function() {
                autosize.update(t._$textarea), t._initEvents(), t._$submit.addClass("active disabled")
            }
        })
    },
    _isEmpty: function(t) {
        return 0 === t.replace(/\s|\r\n|\r|\n/gm, "").length
    },
    _isDefault: function(t) {
        var e = this._default_msg.replace(/\s|\r\n|\r|\n/gm, "");
        return t = t.replace(/\s|\r\n|\r|\n/gm, ""), e.length === t.length && e.toLocaleUpperCase() === t.toLocaleUpperCase()
    },
    _containsEmail: function(t) {
        var e = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
            s = t.match(e);
        return s ? s[0] : !1
    },
    validate: function(t) {
        return this._isEmpty(t) || this._isDefault(t) ? !1 : !!this._containsEmail(t)
    },
    onSubmit: function() {
        this._$submit.addClass("sending").attr("disabled", !0), this._$textarea.attr("readonly", !0), TweenLite.to(this._$textarea, .8, {
            height: 0,
            ease: CubicBezier.get("custom-0.74")
        })
    },
    onMailSent: function(t) {
        var e = this;
        console.log(t), this._$submit.addClass("sent"), TweenLite.set(this._$sent, {
            autoAlpha: 1
        }), setTimeout(function() {
            e._$submit.hide(), e._$sent.typed({
                strings: [t],
                cursorChar: "",
                callback: function() {
                    $(".typed-cursor").hide()
                }
            })
        }, 800)
    }
});
Contact.init();

var app = {
    _body_scrollLeft: 0,
    _body_scrollTop: 0,
    _waypoints: null,
    is_mobile: !0,
    is_touch: !0,
    viewport: {
        width: 0,
        height: 0
    },
    $header: null,
    $nav: null,
    init: function() {
        this.$header = $("#js-header"), this.$nav = $("#js-nav"), this.inlineSVG(), this._resetFeatureTests(), this._resetViewportDimensions(), this._initPlugins(), this._initEvents()
    },
    _initPlugins: function() {},
    _initEvents: function() {
        var t = this;
        $(window).on("resize.app", function() {
            t._resetFeatureTests(), t._resetViewportDimensions()
        }).on("orientationchange.app", function() {
            t._resetViewportDimensions()
        })
    },
    disableScroll: function() {
        this._body_scrollLeft = self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, this._body_scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, $("html").css("overflow", "hidden"), window.scrollTo(this._body_scrollLeft, this._body_scrollTop), this.is_touch && $(document).on("touchmove.app", function(t) {
            t.preventDefault()
        })
    },
    enableScroll: function(t) {
        "undefined" == typeof t && (t = this._body_scrollTop);
        var e = !0;
        "boolean" == typeof t && t === !1 && (e = !1), $("html").css("overflow", "visible"), e && window.scrollTo(this._body_scrollLeft, t), this.is_touch && $(document).off("touchmove.app")
    },
    _resetFeatureTests: function() {
        this.is_mobile = feature.matchMedia && window.matchMedia("(max-width: 991px)").matches, this.is_touch = feature.touch
    },
    _resetViewportDimensions: function() {
        this.viewport.width = $(window).width(), this.viewport.height = $(window).height()
    },
    resetWaypoints: function() {
        var t = this;
        if (this._waypoints && this._waypoints.length) {
            for (var e in this._waypoints) this._waypoints[e].destroy();
            this._waypoints = null
        }
        this._waypoints = $("[data-nav-color]").waypoint({
            group: "nav-color",
            offset: function() {
                return parseInt(t.$nav.css("top")) + t.$nav.outerHeight() / 2
            },
            handler: function(e) {
                var i = "down" === e ? this : this.previous();
                if (i) {
                    var o = $(i.element).data("nav-color");
                    t.setHeaderColor(o)
                }
            }
        })
    },
    setHeaderColor: function(t) {
        this.$header.removeClass(function() {
            return this.className.split(" ").filter(function(t) {
                return t.match(/color-+/)
            }).join(" ")
        }), "undefined" != typeof t && this.$header.addClass("color-" + t)
    },
    inlineSVG: function() {
        $("img.svg").each(function() {
            var t = $(this),
                e = t.attr("id"),
                i = t.attr("class"),
                o = t.attr("src"),
                n = t.attr("width"),
                s = t.attr("height");
            $.get(o, function(o) {
                var a = $(o).find("svg");
                "undefined" != typeof e && (a = a.attr("id", e)), "undefined" != typeof i && (a = a.attr("class", i + " replaced-svg")), a = a.removeAttr("xmlns:a"), n && s && a.attr({
                    width: n,
                    height: s
                }), !a.attr("viewBox") && a.attr("height") && a.attr("width") && a.attr("viewBox", "0 0 " + a.attr("height") + " " + a.attr("width")), t.replaceWith(a)
            }, "xml")
        })
    },
    setTitles: function() {
       
    }
};
$(function() {
    app.init()
});


