(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    class BeforeAfter {
        constructor(props) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const beforeAfterItems = document.querySelectorAll("[data-ba]");
                if (beforeAfterItems.length > 0) {
                    this.setLogging(`Прокинувся, бачу елементів: ${beforeAfterItems.length}`);
                    this.beforeAfterInit(beforeAfterItems);
                } else this.setLogging(`Прокинувся, не бачу елементів`);
            }
        }
        beforeAfterInit(beforeAfterItems) {
            beforeAfterItems.forEach((beforeAfter => {
                if (beforeAfter) {
                    this.beforeAfterClasses(beforeAfter);
                    this.beforeAfterItemInit(beforeAfter);
                }
            }));
        }
        beforeAfterClasses(beforeAfter) {
            beforeAfter.querySelector("[data-ba-arrow]");
            beforeAfter.addEventListener("mouseover", (function(e) {
                const targetElement = e.target;
                if (!targetElement.hasAttribute("data-ba-arrow")) if (targetElement.closest("[data-ba-before]")) {
                    beforeAfter.classList.remove("_right");
                    beforeAfter.classList.add("_left");
                } else {
                    beforeAfter.classList.add("_right");
                    beforeAfter.classList.remove("_left");
                }
            }));
            beforeAfter.addEventListener("mouseleave", (function() {
                beforeAfter.classList.remove("_left");
                beforeAfter.classList.remove("_right");
            }));
        }
        beforeAfterItemInit(beforeAfter) {
            const beforeAfterArrow = beforeAfter.querySelector("[data-ba-arrow]");
            const afterItem = beforeAfter.querySelector("[data-ba-after]");
            const beforeAfterArrowWidth = parseFloat(window.getComputedStyle(beforeAfterArrow).getPropertyValue("width"));
            let beforeAfterSizes = {};
            if (beforeAfterArrow) isMobile.any() ? beforeAfterArrow.addEventListener("touchstart", beforeAfterDrag) : beforeAfterArrow.addEventListener("mousedown", beforeAfterDrag);
            function beforeAfterDrag(e) {
                beforeAfterSizes = {
                    width: beforeAfter.offsetWidth,
                    left: beforeAfter.getBoundingClientRect().left - scrollX
                };
                if (isMobile.any()) {
                    document.addEventListener("touchmove", beforeAfterArrowMove);
                    document.addEventListener("touchend", (function(e) {
                        document.removeEventListener("touchmove", beforeAfterArrowMove);
                    }), {
                        once: true
                    });
                } else {
                    document.addEventListener("mousemove", beforeAfterArrowMove);
                    document.addEventListener("mouseup", (function(e) {
                        document.removeEventListener("mousemove", beforeAfterArrowMove);
                    }), {
                        once: true
                    });
                }
                document.addEventListener("dragstart", (function(e) {
                    e.preventDefault();
                }), {
                    once: true
                });
            }
            function beforeAfterArrowMove(e) {
                const posLeft = e.type === "touchmove" ? e.touches[0].clientX - beforeAfterSizes.left : e.clientX - beforeAfterSizes.left;
                if (posLeft <= beforeAfterSizes.width && posLeft > 0) {
                    const way = posLeft / beforeAfterSizes.width * 100;
                    beforeAfterArrow.style.cssText = `left:calc(${way}% - ${beforeAfterArrowWidth}px)`;
                    afterItem.style.cssText = `width: ${100 - way}%`;
                } else if (posLeft >= beforeAfterSizes.width) {
                    beforeAfterArrow.style.cssText = `left: calc(100% - ${beforeAfterArrowWidth}px)`;
                    afterItem.style.cssText = `width: 0%`;
                } else if (posLeft <= 0) {
                    beforeAfterArrow.style.cssText = `left: 0%`;
                    afterItem.style.cssText = `width: 100%`;
                }
            }
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[BeforeAfter]: ${message} `) : null;
        }
    }
    modules_flsModules.ba = new BeforeAfter({});
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window["FLS"] = false;
    isWebp();
    addLoadedClass();
})();