/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

if (typeof $.fancybox !== "function") {
(function (window, document, $, undefined) {
    "use strict";

    var H = $("html"),
        W = $(window),
        D = $(document),
        F = $.fancybox = function () {
            F.open.apply( this, arguments );
        },
        IE =  navigator.userAgent.match(/msie/i),
        didUpdate   = null,
        isTouch     = document.createTouch !== undefined,

        isQuery = function(obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function(str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function(str) {
            return isString(str) && str.indexOf('%') > 0;
        },
        isScrollable = function(el) {
            return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
        },
        getScalar = function(orig, dim) {
            var value = parseInt(orig, 10) || 0;

            if (dim && isPercentage(orig)) {
                value = F.getViewport()[ dim ] / 100 * value;
            }

            return Math.ceil(value);
        },
        getValue = function(value, dim) {
            return getScalar(value, dim) + 'px';
        };

    $.extend(F, {
        // The current version of fancyBox
        version: '2.1.5',

        defaults: {
            padding : 15,
            margin  : 20,

            width     : 800,
            height    : 600,
            minWidth  : 100,
            minHeight : 100,
            maxWidth  : 9999,
            maxHeight : 9999,
            pixelRatio: 1, // Set to 2 for retina display support

            autoSize   : true,
            autoHeight : false,
            autoWidth  : false,

            autoResize  : true,
            autoCenter  : !isTouch,
            fitToView   : true,
            aspectRatio : false,
            topRatio    : 0.5,
            leftRatio   : 0.5,

            scrolling : 'auto', // 'auto', 'yes' or 'no'
            wrapCSS   : '',

            arrows     : true,
            closeBtn   : true,
            closeClick : false,
            nextClick  : false,
            mouseWheel : true,
            autoPlay   : false,
            playSpeed  : 3000,
            preload    : 3,
            modal      : false,
            loop       : true,

            ajax  : {
                dataType : 'html',
                headers  : { 'X-fancyBox': true }
            },
            iframe : {
                scrolling : 'auto',
                preload   : true
            },
            swf : {
                wmode: 'transparent',
                allowfullscreen   : 'true',
                allowscriptaccess : 'always'
            },

            keys  : {
                next : {
                    13 : 'left', // enter
                    34 : 'up',   // page down
                    39 : 'left', // right arrow
                    40 : 'up'    // down arrow
                },
                prev : {
                    8  : 'right',  // backspace
                    33 : 'down',   // page up
                    37 : 'right',  // left arrow
                    38 : 'down'    // up arrow
                },
                close  : [27], // escape key
                play   : [32], // space - start/stop slideshow
                toggle : [70]  // letter "f" - toggle fullscreen
            },

            direction : {
                next : 'left',
                prev : 'right'
            },

            scrollOutside  : true,

            // Override some properties
            index   : 0,
            type    : null,
            href    : null,
            content : null,
            title   : null,

            // HTML templates
            tpl: {
                wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image    : '<img class="fancybox-image" src="{href}" alt="" />',
                iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
                error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },

            // Properties for each animation type
            // Opening fancyBox
            openEffect  : 'fade', // 'elastic', 'fade' or 'none'
            openSpeed   : 250,
            openEasing  : 'swing',
            openOpacity : true,
            openMethod  : 'zoomIn',

            // Closing fancyBox
            closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
            closeSpeed   : 250,
            closeEasing  : 'swing',
            closeOpacity : true,
            closeMethod  : 'zoomOut',

            // Changing next gallery item
            nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
            nextSpeed  : 250,
            nextEasing : 'swing',
            nextMethod : 'changeIn',

            // Changing previous gallery item
            prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
            prevSpeed  : 250,
            prevEasing : 'swing',
            prevMethod : 'changeOut',

            // Enable default helpers
            helpers : {
                overlay : true,
                title   : true
            },

            // Callbacks
            onCancel     : $.noop, // If canceling
            beforeLoad   : $.noop, // Before loading
            afterLoad    : $.noop, // After loading
            beforeShow   : $.noop, // Before changing in current item
            afterShow    : $.noop, // After opening
            beforeChange : $.noop, // Before changing gallery item
            beforeClose  : $.noop, // Before closing
            afterClose   : $.noop  // After closing
        },

        //Current state
        group    : {}, // Selected group
        opts     : {}, // Group options
        previous : null,  // Previous element
        coming   : null,  // Element being loaded
        current  : null,  // Currently loaded element
        isActive : false, // Is activated
        isOpen   : false, // Is currently open
        isOpened : false, // Have been fully opened at least once

        wrap  : null,
        skin  : null,
        outer : null,
        inner : null,

        player : {
            timer    : null,
            isActive : false
        },

        // Loaders
        ajaxLoad   : null,
        imgPreload : null,

        // Some collections
        transitions : {},
        helpers     : {},

        /*
         *  Static methods
         */

        open: function (group, opts) {
            if (!group) {
                return;
            }

            if (!$.isPlainObject(opts)) {
                opts = {};
            }

            // Close if already active
            if (false === F.close(true)) {
                return;
            }

            // Normalize group
            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            }

            // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
            $.each(group, function(i, element) {
                var obj = {},
                    href,
                    title,
                    content,
                    type,
                    rez,
                    hrefParts,
                    selector;

                if ($.type(element) === "object") {
                    // Check if is DOM element
                    if (element.nodeType) {
                        element = $(element);
                    }

                    if (isQuery(element)) {
                        obj = {
                            href    : element.data('fancybox-href') || element.attr('href'),
                            title   : element.data('fancybox-title') || element.attr('title'),
                            isDom   : true,
                            element : element
                        };

                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }

                    } else {
                        obj = element;
                    }
                }

                href  = opts.href  || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || '';

                content = opts.content || obj.content;
                type    = content ? 'html' : (opts.type  || obj.type);

                if (!type && obj.isDom) {
                    type = element.data('fancybox-type');

                    if (!type) {
                        rez  = element.prop('class').match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }

                if (isString(href)) {
                    // Try to guess the content type
                    if (!type) {
                        if (F.isImage(href)) {
                            type = 'image';

                        } else if (F.isSWF(href)) {
                            type = 'swf';

                        } else if (href.charAt(0) === '#') {
                            type = 'inline';

                        } else if (isString(element)) {
                            type    = 'html';
                            content = element;
                        }
                    }

                    // Split url into two pieces with source url and content selector, e.g,
                    // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
                    if (type === 'ajax') {
                        hrefParts = href.split(/\s+/, 2);
                        href      = hrefParts.shift();
                        selector  = hrefParts.shift();
                    }
                }

                if (!content) {
                    if (type === 'inline') {
                        if (href) {
                            content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

                        } else if (obj.isDom) {
                            content = element;
                        }

                    } else if (type === 'html') {
                        content = href;

                    } else if (!type && !href && obj.isDom) {
                        type    = 'inline';
                        content = element;
                    }
                }

                $.extend(obj, {
                    href     : href,
                    type     : type,
                    content  : content,
                    title    : title,
                    selector : selector
                });

                group[ i ] = obj;
            });

            // Extend the defaults
            F.opts = $.extend(true, {}, F.defaults, opts);

            // All options are merged recursive except keys
            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }

            F.group = group;

            return F._start(F.opts.index);
        },

        // Cancel image loading or abort ajax request
        cancel: function () {
            var coming = F.coming;

            if (!coming || false === F.trigger('onCancel')) {
                return;
            }

            F.hideLoading();

            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }

            F.ajaxLoad = null;

            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }

            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger('onReset').remove();
            }

            F.coming = null;

            // If the first item has been canceled, then clear everything
            if (!F.current) {
                F._afterZoomOut( coming );
            }
        },

        // Start closing animation if is open; remove immediately if opening/closing
        close: function (event) {
            F.cancel();

            if (false === F.trigger('beforeClose')) {
                return;
            }

            F.unbindEvents();

            if (!F.isActive) {
                return;
            }

            if (!F.isOpen || event === true) {
                $('.fancybox-wrap').stop(true).trigger('onReset').remove();

                F._afterZoomOut();

            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;

                $('.fancybox-item, .fancybox-nav').remove();

                F.wrap.stop(true, true).removeClass('fancybox-opened');

                F.transitions[ F.current.closeMethod ]();
            }
        },

        // Manage slideshow:
        //   $.fancybox.play(); - toggle slideshow
        //   $.fancybox.play( true ); - start
        //   $.fancybox.play( false ); - stop
        play: function ( action ) {
            var clear = function () {
                    clearTimeout(F.player.timer);
                },
                set = function () {
                    clear();

                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function () {
                    clear();

                    D.unbind('.player');

                    F.player.isActive = false;

                    F.trigger('onPlayEnd');
                },
                start = function () {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;

                        D.bind({
                            'onCancel.player beforeClose.player' : stop,
                            'onUpdate.player'   : set,
                            'beforeLoad.player' : clear
                        });

                        set();

                        F.trigger('onPlayStart');
                    }
                };

            if (action === true || (!F.player.isActive && action !== false)) {
                start();
            } else {
                stop();
            }
        },

        // Navigate to next gallery item
        next: function ( direction ) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }

                F.jumpto(current.index + 1, direction, 'next');
            }
        },

        // Navigate to previous gallery item
        prev: function ( direction ) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }

                F.jumpto(current.index - 1, direction, 'prev');
            }
        },

        // Navigate to gallery item by index
        jumpto: function ( index, direction, router ) {
            var current = F.current;

            if (!current) {
                return;
            }

            index = getScalar(index);

            F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
            F.router    = router || 'jumpto';

            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + (index % current.group.length);
                }

                index = index % current.group.length;
            }

            if (current.group[ index ] !== undefined) {
                F.cancel();

                F._start(index);
            }
        },

        // Center inside viewport and toggle position type to fixed or absolute if needed
        reposition: function (e, onlyAbsolute) {
            var current = F.current,
                wrap    = current ? current.wrap : null,
                pos;

            if (wrap) {
                pos = F._getPosition(onlyAbsolute);

                if (e && e.type === 'scroll') {
                    delete pos.position;

                    wrap.stop(true, true).animate(pos, 200);

                } else {
                    wrap.css(pos);

                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },

        update: function (e) {
            var type = (e && e.type),
                anyway = !type || type === 'orientationchange';

            if (anyway) {
                clearTimeout(didUpdate);

                didUpdate = null;
            }

            if (!F.isOpen || didUpdate) {
                return;
            }

            didUpdate = setTimeout(function() {
                var current = F.current;

                if (!current || F.isClosing) {
                    return;
                }

                F.wrap.removeClass('fancybox-tmp');

                if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
                    F._setDimension();
                }

                if (!(type === 'scroll' && current.canShrink)) {
                    F.reposition(e);
                }

                F.trigger('onUpdate');

                didUpdate = null;

            }, (anyway && !isTouch ? 0 : 300));
        },

        // Shrink content to fit inside viewport or restore if resized
        toggle: function ( action ) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

                // Help browser to restore document dimensions
                if (isTouch) {
                    F.wrap.removeAttr('style').addClass('fancybox-tmp');

                    F.trigger('onUpdate');
                }

                F.update();
            }
        },

        hideLoading: function () {
            D.unbind('.loading');

            $('#fancybox-loading').remove();
        },

        showLoading: function () {
            var el, viewport;

            F.hideLoading();

            el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

            // If user will press the escape-button, the request will be canceled
            D.bind('keydown.loading', function(e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();

                    F.cancel();
                }
            });

            if (!F.defaults.fixed) {
                viewport = F.getViewport();

                el.css({
                    position : 'absolute',
                    top  : (viewport.h * 0.5) + viewport.y,
                    left : (viewport.w * 0.5) + viewport.x
                });
            }
        },

        getViewport: function () {
            var locked = (F.current && F.current.locked) || false,
                rez    = {
                    x: W.scrollLeft(),
                    y: W.scrollTop()
                };

            if (locked) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;

            } else {
                // See http://bugs.jquery.com/ticket/6724
                rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }

            return rez;
        },

        // Unbind the keyboard / clicking actions
        unbindEvents: function () {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind('.fb');
            }

            D.unbind('.fb');
            W.unbind('.fb');
        },

        bindEvents: function () {
            var current = F.current,
                keys;

            if (!current) {
                return;
            }

            // Changing document height on iOS devices triggers a 'resize' event,
            // that can change document height... repeating infinitely
            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

            keys = current.keys;

            if (keys) {
                D.bind('keydown.fb', function (e) {
                    var code   = e.which || e.keyCode,
                        target = e.target || e.srcElement;

                    // Skip esc key if loading, because showLoading will cancel preloading
                    if (code === 27 && F.coming) {
                        return false;
                    }

                    // Ignore key combinations and key events within form elements
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                        $.each(keys, function(i, val) {
                            if (current.group.length > 1 && val[ code ] !== undefined) {
                                F[ i ]( val[ code ] );

                                e.preventDefault();
                                return false;
                            }

                            if ($.inArray(code, val) > -1) {
                                F[ i ] ();

                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }

            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;

                    while (parent.length) {
                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                            break;
                        }

                        canScroll = isScrollable( parent[0] );
                        parent    = $(parent).parent();
                    }

                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev( deltaY > 0 ? 'down' : 'left' );

                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next( deltaY < 0 ? 'up' : 'right' );
                            }

                            e.preventDefault();
                        }
                    }
                });
            }
        },

        trigger: function (event, o) {
            var ret, obj = o || F.coming || F.current;

            if (!obj) {
                return;
            }

            if ($.isFunction( obj[event] )) {
                ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
            }

            if (ret === false) {
                return false;
            }

            if (obj.helpers) {
                $.each(obj.helpers, function (helper, opts) {
                    if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                        F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                    }
                });
            }

            D.trigger(event);
        },

        isImage: function (str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },

        isSWF: function (str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },

        _start: function (index) {
            var coming = {},
                obj,
                href,
                type,
                margin,
                padding;

            index = getScalar( index );
            obj   = F.group[ index ] || null;

            if (!obj) {
                return false;
            }

            coming = $.extend(true, {}, F.opts, obj);

            // Convert margin and padding properties to array - top, right, bottom, left
            margin  = coming.margin;
            padding = coming.padding;

            if ($.type(margin) === 'number') {
                coming.margin = [margin, margin, margin, margin];
            }

            if ($.type(padding) === 'number') {
                coming.padding = [padding, padding, padding, padding];
            }

            // 'modal' propery is just a shortcut
            if (coming.modal) {
                $.extend(true, coming, {
                    closeBtn   : false,
                    closeClick : false,
                    nextClick  : false,
                    arrows     : false,
                    mouseWheel : false,
                    keys       : null,
                    helpers: {
                        overlay : {
                            closeClick : false
                        }
                    }
                });
            }

            // 'autoSize' property is a shortcut, too
            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }

            if (coming.width === 'auto') {
                coming.autoWidth = true;
            }

            if (coming.height === 'auto') {
                coming.autoHeight = true;
            }

            /*
             * Add reference to the group, so it`s possible to access from callbacks, example:
             * afterLoad : function() {
             *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
             * }
             */

            coming.group  = F.group;
            coming.index  = index;

            // Give a chance for callback or helpers to update coming item (type, title, etc)
            F.coming = coming;

            if (false === F.trigger('beforeLoad')) {
                F.coming = null;

                return;
            }

            type = coming.type;
            href = coming.href;

            if (!type) {
                F.coming = null;

                //If we can not determine content type then drop silently or display next/prev item if looping through gallery
                if (F.current && F.router && F.router !== 'jumpto') {
                    F.current.index = index;

                    return F[ F.router ]( F.direction );
                }

                return false;
            }

            F.isActive = true;

            if (type === 'image' || type === 'swf') {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling  = 'visible';
            }

            if (type === 'image') {
                coming.aspectRatio = true;
            }

            if (type === 'iframe' && isTouch) {
                coming.scrolling = 'scroll';
            }

            // Build the neccessary markup
            coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

            $.extend(coming, {
                skin  : $('.fancybox-skin',  coming.wrap),
                outer : $('.fancybox-outer', coming.wrap),
                inner : $('.fancybox-inner', coming.wrap)
            });

            $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
                coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
            });

            F.trigger('onReady');

            // Check before try to load; 'inline' and 'html' types need content, others - href
            if (type === 'inline' || type === 'html') {
                if (!coming.content || !coming.content.length) {
                    return F._error( 'content' );
                }

            } else if (!href) {
                return F._error( 'href' );
            }

            if (type === 'image') {
                F._loadImage();

            } else if (type === 'ajax') {
                F._loadAjax();

            } else if (type === 'iframe') {
                F._loadIframe();

            } else {
                F._afterLoad();
            }
        },

        _error: function ( type ) {
            $.extend(F.coming, {
                type       : 'html',
                autoWidth  : true,
                autoHeight : true,
                minWidth   : 0,
                minHeight  : 0,
                scrolling  : 'no',
                hasError   : type,
                content    : F.coming.tpl.error
            });

            F._afterLoad();
        },

        _loadImage: function () {
            // Reset preload image so it is later possible to check "complete" property
            var img = F.imgPreload = new Image();

            img.onload = function () {
                this.onload = this.onerror = null;

                F.coming.width  = this.width / F.opts.pixelRatio;
                F.coming.height = this.height / F.opts.pixelRatio;

                F._afterLoad();
            };

            img.onerror = function () {
                this.onload = this.onerror = null;

                F._error( 'image' );
            };

            img.src = F.coming.href;

            if (img.complete !== true) {
                F.showLoading();
            }
        },

        _loadAjax: function () {
            var coming = F.coming;

            F.showLoading();

            F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                url: coming.href,
                error: function (jqXHR, textStatus) {
                    if (F.coming && textStatus !== 'abort') {
                        F._error( 'ajax', jqXHR );

                    } else {
                        F.hideLoading();
                    }
                },
                success: function (data, textStatus) {
                    if (textStatus === 'success') {
                        coming.content = data;

                        F._afterLoad();
                    }
                }
            }));
        },

        _loadIframe: function() {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
                    .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
                    .attr('src', coming.href);

            // This helps IE
            $(coming.wrap).bind('onReset', function () {
                try {
                    $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
                } catch (e) {}
            });

            if (coming.iframe.preload) {
                F.showLoading();

                iframe.one('load', function() {
                    $(this).data('ready', 1);

                    // iOS will lose scrolling if we resize
                    if (!isTouch) {
                        $(this).bind('load.fb', F.update);
                    }

                    // Without this trick:
                    //   - iframe won't scroll on iOS devices
                    //   - IE7 sometimes displays empty iframe
                    $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

                    F._afterLoad();
                });
            }

            coming.content = iframe.appendTo( coming.inner );

            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },

        _preloadImages: function() {
            var group   = F.group,
                current = F.current,
                len     = group.length,
                cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
                item,
                i;

            for (i = 1; i <= cnt; i += 1) {
                item = group[ (current.index + i ) % len ];

                if (item.type === 'image' && item.href) {
                    new Image().src = item.href;
                }
            }
        },

        _afterLoad: function () {
            var coming   = F.coming,
                previous = F.current,
                placeholder = 'fancybox-placeholder',
                current,
                content,
                type,
                scrolling,
                href,
                embed;

            F.hideLoading();

            if (!coming || F.isActive === false) {
                return;
            }

            if (false === F.trigger('afterLoad', coming, previous)) {
                coming.wrap.stop(true).trigger('onReset').remove();

                F.coming = null;

                return;
            }

            if (previous) {
                F.trigger('beforeChange', previous);

                previous.wrap.stop(true).removeClass('fancybox-opened')
                    .find('.fancybox-item, .fancybox-nav')
                    .remove();
            }

            F.unbindEvents();

            current   = coming;
            content   = coming.content;
            type      = coming.type;
            scrolling = coming.scrolling;

            $.extend(F, {
                wrap  : current.wrap,
                skin  : current.skin,
                outer : current.outer,
                inner : current.inner,
                current  : current,
                previous : previous
            });

            href = current.href;

            switch (type) {
                case 'inline':
                case 'ajax':
                case 'html':
                    if (current.selector) {
                        content = $('<div>').html(content).find(current.selector);

                    } else if (isQuery(content)) {
                        if (!content.data(placeholder)) {
                            content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
                        }

                        content = content.show().detach();

                        current.wrap.bind('onReset', function () {
                            if ($(this).find(content).length) {
                                content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
                            }
                        });
                    }
                break;

                case 'image':
                    content = current.tpl.image.replace('{href}', href);
                break;

                case 'swf':
                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                    embed   = '';

                    $.each(current.swf, function(name, val) {
                        content += '<param name="' + name + '" value="' + val + '"></param>';
                        embed   += ' ' + name + '="' + val + '"';
                    });

                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                break;
            }

            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append( content );
            }

            // Give a chance for helpers or callbacks to update elements
            F.trigger('beforeShow');

            // Set scrolling before calculating dimensions
            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

            // Set initial dimensions and start position
            F._setDimension();

            F.reposition();

            F.isOpen = false;
            F.coming = null;

            F.bindEvents();

            if (!F.isOpened) {
                $('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

            } else if (previous.prevMethod) {
                F.transitions[ previous.prevMethod ]();
            }

            F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

            F._preloadImages();
        },

        _setDimension: function () {
            var viewport   = F.getViewport(),
                steps      = 0,
                canShrink  = false,
                canExpand  = false,
                wrap       = F.wrap,
                skin       = F.skin,
                inner      = F.inner,
                current    = F.current,
                width      = current.width,
                height     = current.height,
                minWidth   = current.minWidth,
                minHeight  = current.minHeight,
                maxWidth   = current.maxWidth,
                maxHeight  = current.maxHeight,
                scrolling  = current.scrolling,
                scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
                margin     = current.margin,
                wMargin    = getScalar(margin[1] + margin[3]),
                hMargin    = getScalar(margin[0] + margin[2]),
                wPadding,
                hPadding,
                wSpace,
                hSpace,
                origWidth,
                origHeight,
                origMaxWidth,
                origMaxHeight,
                ratio,
                width_,
                height_,
                maxWidth_,
                maxHeight_,
                iframe,
                body;

            // Reset dimensions so we could re-check actual size
            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

            wPadding = getScalar(skin.outerWidth(true)  - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height());

            // Any space between content and viewport (margin, padding, border, title)
            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;

            origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

            if (current.type === 'iframe') {
                iframe = current.content;

                if (current.autoHeight && iframe.data('ready') === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width( origWidth ).height(9999);

                            body = iframe.contents().find('body');

                            if (scrollOut) {
                                body.css('overflow-x', 'hidden');
                            }

                            origHeight = body.outerHeight(true);
                        }

                    } catch (e) {}
                }

            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass( 'fancybox-tmp' );

                // Set width or height in case we need to calculate only one dimension
                if (!current.autoWidth) {
                    inner.width( origWidth );
                }

                if (!current.autoHeight) {
                    inner.height( origHeight );
                }

                if (current.autoWidth) {
                    origWidth = inner.width();
                }

                if (current.autoHeight) {
                    origHeight = inner.height();
                }

                inner.removeClass( 'fancybox-tmp' );
            }

            width  = getScalar( origWidth );
            height = getScalar( origHeight );

            ratio  = origWidth / origHeight;

            // Calculations for the content
            minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
            maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

            // These will be used to determine if wrap can fit in the viewport
            origMaxWidth  = maxWidth;
            origMaxHeight = maxHeight;

            if (current.fitToView) {
                maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }

            maxWidth_  = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;

            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width  = maxWidth;
                    height = getScalar(width / ratio);
                }

                if (height > maxHeight) {
                    height = maxHeight;
                    width  = getScalar(height * ratio);
                }

                if (width < minWidth) {
                    width  = minWidth;
                    height = getScalar(width / ratio);
                }

                if (height < minHeight) {
                    height = minHeight;
                    width  = getScalar(height * ratio);
                }

            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));

                if (current.autoHeight && current.type !== 'iframe') {
                    inner.width( width );

                    height = inner.height();
                }

                height = Math.max(minHeight, Math.min(height, maxHeight));
            }

            // Try to fit inside viewport (including the title)
            if (current.fitToView) {
                inner.width( width ).height( height );

                wrap.width( width + wPadding );

                // Real wrap dimensions
                width_  = wrap.width();
                height_ = wrap.height();

                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }

                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width  = getScalar(height * ratio);

                        if (width < minWidth) {
                            width  = minWidth;
                            height = getScalar(width / ratio);
                        }

                        if (width > maxWidth) {
                            width  = maxWidth;
                            height = getScalar(width / ratio);
                        }

                        inner.width( width ).height( height );

                        wrap.width( width + wPadding );

                        width_  = wrap.width();
                        height_ = wrap.height();
                    }

                } else {
                    width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }

            if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
                width += scrollOut;
            }

            inner.width( width ).height( height );

            wrap.width( width + wPadding );

            width_  = wrap.width();
            height_ = wrap.height();

            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

            $.extend(current, {
                dim : {
                    width   : getValue( width_ ),
                    height  : getValue( height_ )
                },
                origWidth  : origWidth,
                origHeight : origHeight,
                canShrink  : canShrink,
                canExpand  : canExpand,
                wPadding   : wPadding,
                hPadding   : hPadding,
                wrapSpace  : height_ - skin.outerHeight(true),
                skinSpace  : skin.height() - height
            });

            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height('auto');
            }
        },

        _getPosition: function (onlyAbsolute) {
            var current  = F.current,
                viewport = F.getViewport(),
                margin   = current.margin,
                width    = F.wrap.width()  + margin[1] + margin[3],
                height   = F.wrap.height() + margin[0] + margin[2],
                rez      = {
                    position: 'absolute',
                    top  : margin[0],
                    left : margin[3]
                };

            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = 'fixed';

            } else if (!current.locked) {
                rez.top  += viewport.y;
                rez.left += viewport.x;
            }

            rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
            rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

            return rez;
        },

        _afterZoomIn: function () {
            var current = F.current;

            if (!current) {
                return;
            }

            F.isOpen = F.isOpened = true;

            F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

            F.update();

            // Assign a click event
            if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
                F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                        e.preventDefault();

                        F[ current.closeClick ? 'close' : 'next' ]();
                    }
                });
            }

            // Create a close button
            if (current.closeBtn) {
                $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
                    e.preventDefault();

                    F.close();
                });
            }

            // Create navigation arrows
            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
                }

                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
                }
            }

            F.trigger('afterShow');

            // Stop the slideshow if this is the last item
            if (!current.loop && current.index === current.group.length - 1) {
                F.play( false );

            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;

                F.play();
            }
        },

        _afterZoomOut: function ( obj ) {
            obj = obj || F.current;

            $('.fancybox-wrap').trigger('onReset').remove();

            $.extend(F, {
                group  : {},
                opts   : {},
                router : false,
                current   : null,
                isActive  : false,
                isOpened  : false,
                isOpen    : false,
                isClosing : false,
                wrap   : null,
                skin   : null,
                outer  : null,
                inner  : null
            });

            F.trigger('afterClose', obj);
        }
    });

    /*
     *  Default transitions
     */

    F.transitions = {
        getOrigPosition: function () {
            var current  = F.current,
                element  = current.element,
                orig     = current.orig,
                pos      = {},
                width    = 50,
                height   = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();

            if (!orig && current.isDom && element.is(':visible')) {
                orig = element.find('img:first');

                if (!orig.length) {
                    orig = element;
                }
            }

            if (isQuery(orig)) {
                pos = orig.offset();

                if (orig.is('img')) {
                    width  = orig.outerWidth();
                    height = orig.outerHeight();
                }

            } else {
                pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
            }

            if (F.wrap.css('position') === 'fixed' || current.locked) {
                pos.top  -= viewport.y;
                pos.left -= viewport.x;
            }

            pos = {
                top     : getValue(pos.top  - hPadding * current.topRatio),
                left    : getValue(pos.left - wPadding * current.leftRatio),
                width   : getValue(width  + wPadding),
                height  : getValue(height + hPadding)
            };

            return pos;
        },

        step: function (now, fx) {
            var ratio,
                padding,
                value,
                prop       = fx.prop,
                current    = F.current,
                wrapSpace  = current.wrapSpace,
                skinSpace  = current.skinSpace;

            if (prop === 'width' || prop === 'height') {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

                if (F.isClosing) {
                    ratio = 1 - ratio;
                }

                padding = prop === 'width' ? current.wPadding : current.hPadding;
                value   = now - padding;

                F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
                F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
            }
        },

        zoomIn: function () {
            var current  = F.current,
                startPos = current.pos,
                effect   = current.openEffect,
                elastic  = effect === 'elastic',
                endPos   = $.extend({opacity : 1}, startPos);

            // Remove "position" property that breaks older IE
            delete endPos.position;

            if (elastic) {
                startPos = this.getOrigPosition();

                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }

            } else if (effect === 'fade') {
                startPos.opacity = 0.1;
            }

            F.wrap.css(startPos).animate(endPos, {
                duration : effect === 'none' ? 0 : current.openSpeed,
                easing   : current.openEasing,
                step     : elastic ? this.step : null,
                complete : F._afterZoomIn
            });
        },

        zoomOut: function () {
            var current  = F.current,
                effect   = current.closeEffect,
                elastic  = effect === 'elastic',
                endPos   = {opacity : 0.1};

            if (elastic) {
                endPos = this.getOrigPosition();

                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }

            F.wrap.animate(endPos, {
                duration : effect === 'none' ? 0 : current.closeSpeed,
                easing   : current.closeEasing,
                step     : elastic ? this.step : null,
                complete : F._afterZoomOut
            });
        },

        changeIn: function () {
            var current   = F.current,
                effect    = current.nextEffect,
                startPos  = current.pos,
                endPos    = { opacity : 1 },
                direction = F.direction,
                distance  = 200,
                field;

            startPos.opacity = 0.1;

            if (effect === 'elastic') {
                field = direction === 'down' || direction === 'up' ? 'top' : 'left';

                if (direction === 'down' || direction === 'right') {
                    startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
                    endPos[ field ]   = '+=' + distance + 'px';

                } else {
                    startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
                    endPos[ field ]   = '-=' + distance + 'px';
                }
            }

            // Workaround for http://bugs.jquery.com/ticket/12273
            if (effect === 'none') {
                F._afterZoomIn();

            } else {
                F.wrap.css(startPos).animate(endPos, {
                    duration : current.nextSpeed,
                    easing   : current.nextEasing,
                    complete : F._afterZoomIn
                });
            }
        },

        changeOut: function () {
            var previous  = F.previous,
                effect    = previous.prevEffect,
                endPos    = { opacity : 0.1 },
                direction = F.direction,
                distance  = 200;

            if (effect === 'elastic') {
                endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
            }

            previous.wrap.animate(endPos, {
                duration : effect === 'none' ? 0 : previous.prevSpeed,
                easing   : previous.prevEasing,
                complete : function () {
                    $(this).trigger('onReset').remove();
                }
            });
        }
    };

    /*
     *  Overlay helper
     */

    F.helpers.overlay = {
        defaults : {
            closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
            speedOut   : 200,       // duration of fadeOut animation
            showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
            css        : {},        // custom CSS properties
            locked     : !isTouch,  // if true, the content will be locked into overlay
            fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
        },

        overlay : null,      // current handle
        fixed   : false,     // indicates if the overlay has position "fixed"
        el      : $('html'), // element that contains "the lock"

        // Public methods
        create : function(opts) {
            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.close();
            }

            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
            this.fixed   = false;

            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');

                this.fixed = true;
            }
        },

        open : function(opts) {
            var that = this;

            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.overlay.unbind('.overlay').width('auto').height('auto');

            } else {
                this.create(opts);
            }

            if (!this.fixed) {
                W.bind('resize.overlay', $.proxy( this.update, this) );

                this.update();
            }

            if (opts.closeClick) {
                this.overlay.bind('click.overlay', function(e) {
                    if ($(e.target).hasClass('fancybox-overlay')) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }

                        return false;
                    }
                });
            }

            this.overlay.css( opts.css ).show();
        },

        close : function() {
            var scrollV, scrollH;

            W.unbind('resize.overlay');

            if (this.el.hasClass('fancybox-lock')) {
                $('.fancybox-margin').removeClass('fancybox-margin');

                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();

                this.el.removeClass('fancybox-lock');

                W.scrollTop( scrollV ).scrollLeft( scrollH );
            }

            $('.fancybox-overlay').remove().hide();

            $.extend(this, {
                overlay : null,
                fixed   : false
            });
        },

        // Private, callbacks

        update : function () {
            var width = '100%', offsetWidth;

            // Reset width/height so it will not mess
            this.overlay.width(width).height('100%');

            // jQuery does not return reliable result for IE
            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

                if (D.width() > offsetWidth) {
                    width = D.width();
                }

            } else if (D.width() > W.width()) {
                width = D.width();
            }

            this.overlay.width(width).height(D.height());
        },

        // This is where we can manipulate DOM, because later it would cause iframes to reload
        onReady : function (opts, obj) {
            var overlay = this.overlay;

            $('.fancybox-overlay').stop(true, true);

            if (!overlay) {
                this.create(opts);
            }

            if (opts.locked && this.fixed && obj.fixed) {
                if (!overlay) {
                    this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
                }

                obj.locked = this.overlay.append( obj.wrap );
                obj.fixed  = false;
            }

            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },

        beforeShow : function(opts, obj) {
            var scrollV, scrollH;

            if (obj.locked) {
                if (this.margin !== false) {
                    $('*').filter(function(){
                        return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
                    }).addClass('fancybox-margin');

                    this.el.addClass('fancybox-margin');
                }

                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();

                this.el.addClass('fancybox-lock');

                W.scrollTop( scrollV ).scrollLeft( scrollH );
            }

            this.open(opts);
        },

        onUpdate : function() {
            if (!this.fixed) {
                this.update();
            }
        },

        afterClose: function (opts) {
            // Remove overlay if exists and fancyBox is not opening
            // (e.g., it is not being open using afterClose callback)
            //if (this.overlay && !F.isActive) {
            if (this.overlay && !F.coming) {
                this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
            }
        }
    };

    /*
     *  Title helper
     */

    F.helpers.title = {
        defaults : {
            type     : 'float', // 'float', 'inside', 'outside' or 'over',
            position : 'bottom' // 'top' or 'bottom'
        },

        beforeShow: function (opts) {
            var current = F.current,
                text    = current.title,
                type    = opts.type,
                title,
                target;

            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }

            if (!isString(text) || $.trim(text) === '') {
                return;
            }

            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

            switch (type) {
                case 'inside':
                    target = F.skin;
                break;

                case 'outside':
                    target = F.wrap;
                break;

                case 'over':
                    target = F.inner;
                break;

                default: // 'float'
                    target = F.skin;

                    title.appendTo('body');

                    if (IE) {
                        title.width( title.width() );
                    }

                    title.wrapInner('<span class="child"></span>');

                    //Increase bottom margin so this title will also fit into viewport
                    F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
                break;
            }

            title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
        }
    };

    // jQuery plugin initialization
    $.fn.fancybox = function (options) {
        var index,
            that     = $(this),
            selector = this.selector || '',
            run      = function(e) {
                var what = $(this).blur(), idx = index, relType, relVal;

                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                    relType = options.groupAttr || 'data-fancybox-group';
                    relVal  = what.attr(relType);

                    if (!relVal) {
                        relType = 'rel';
                        relVal  = what.get(0)[ relType ];
                    }

                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
                        what = selector.length ? $(selector) : that;
                        what = what.filter('[' + relType + '="' + relVal + '"]');
                        idx  = what.index(this);
                    }

                    options.index = idx;

                    // Stop an event from bubbling if everything is fine
                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };

        options = options || {};
        index   = options.index || 0;

        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);

        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }

        this.filter('[data-fancybox-start=1]').trigger('click');

        return this;
    };

    // Tests that need a body at doc ready
    D.ready(function() {
        var w1, w2;

        if ( $.scrollbarWidth === undefined ) {
            // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
            $.scrollbarWidth = function() {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
                    child  = parent.children(),
                    width  = child.innerWidth() - child.height( 99 ).innerWidth();

                parent.remove();

                return width;
            };
        }

        if ( $.support.fixedPosition === undefined ) {
            $.support.fixedPosition = (function() {
                var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
                    fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

                elem.remove();

                return fixed;
            }());
        }

        $.extend(F.defaults, {
            scrollbarWidth : $.scrollbarWidth(),
            fixed  : $.support.fixedPosition,
            parent : $('body')
        });

        //Get real width of page scroll-bar
        w1 = $(window).width();

        H.addClass('fancybox-lock-test');

        w2 = $(window).width();

        H.removeClass('fancybox-lock-test');

        $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    });

}(window, document, jQuery));
}
/*
sessvars ver 1.01
- JavaScript based session object
copyright 2008 Thomas Frank

This EULA grants you the following rights:

Installation and Use. You may install and use an unlimited number of copies of the SOFTWARE PRODUCT.

Reproduction and Distribution. You may reproduce and distribute an unlimited number of copies of the SOFTWARE PRODUCT either in whole or in part; each copy should include all copyright and trademark notices, and shall be accompanied by a copy of this EULA. Copies of the SOFTWARE PRODUCT may be distributed as a standalone product or included with your own product.

Commercial Use. You may sell for profit and freely distribute scripts and/or compiled scripts that were created with the SOFTWARE PRODUCT.

v 1.0 --> 1.01
sanitizer added to toObject-method & includeFunctions flag now defaults to false

*/

sessvars=function(){

    var x={};

    x.$={
        prefs:{
            memLimit:2000,
            autoFlush:true,
            crossDomain:false,
            includeProtos:false,
            includeFunctions:false
        },
        parent:x,
        clearMem:function(){
            for(var i in this.parent){if(i!="$"){this.parent[i]=undefined}};
            this.flush();
        },
        usedMem:function(){
            x={};
            return Math.round(this.flush(x)/1024);
        },
        usedMemPercent:function(){
            return Math.round(this.usedMem()/this.prefs.memLimit);
        },
        flush:function(x){
            var y,o={},j=this.$$;
            x=x||top;
            for(var i in this.parent){o[i]=this.parent[i]};
            o.$=this.prefs;
            j.includeProtos=this.prefs.includeProtos;
            j.includeFunctions=this.prefs.includeFunctions;
            y=this.$$.make(o);
            if(x!=top){return y.length};
            if(y.length/1024>this.prefs.memLimit){return false}
            x.name=y;
            return true;
        },
        getDomain:function(){
                var l=location.href
                l=l.split("///").join("//");
                l=l.substring(l.indexOf("://")+3).split("/")[0];
                while(l.split(".").length>2){l=l.substring(l.indexOf(".")+1)};
                return l
        },
        debug:function(t){
            var t=t||this,a=arguments.callee;
            if(!document.body){setTimeout(function(){a(t)},200);return};
            t.flush();
            var d=document.getElementById("sessvarsDebugDiv");
            if(!d){d=document.createElement("div");document.body.insertBefore(d,document.body.firstChild)};
            d.id="sessvarsDebugDiv";
            d.innerHTML='<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;'+
                        'z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px">'+
                        '<b style="font-family:Trebuchet MS;font-size:20px">sessvars.js - debug info:</b><br/><br/>'+
                        'Memory usage: '+t.usedMem()+' Kb ('+t.usedMemPercent()+'%)&nbsp;&nbsp;&nbsp;'+
                        '<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>'+
                        top.name.split('\n').join('<br/>')+'</div>';
            d.getElementsByTagName('span')[0].onclick=function(){t.clearMem();location.reload()}
        },
        init:function(){
            var o={}, t=this;
            try {o=this.$$.toObject(top.name)} catch(e){o={}};
            this.prefs=o.$||t.prefs;
            if(this.prefs.crossDomain || this.prefs.currentDomain==this.getDomain()){
                for(var i in o){this.parent[i]=o[i]};
            }
            else {
                this.prefs.currentDomain=this.getDomain();
            };
            this.parent.$=t;
            t.flush();
            var f=function(){if(t.prefs.autoFlush){t.flush()}};
            if(window["addEventListener"]){addEventListener("unload",f,false)}
            else if(window["attachEvent"]){window.attachEvent("onunload",f)}
            else {this.prefs.autoFlush=false};
        }
    };

    x.$.$$={
        compactOutput:false,
        includeProtos:false,
        includeFunctions: false,
        detectCirculars:true,
        restoreCirculars:true,
        make:function(arg,restore) {
            this.restore=restore;
            this.mem=[];this.pathMem=[];
            return this.toJsonStringArray(arg).join('');
        },
        toObject:function(x){
            if(!this.cleaner){
                try{this.cleaner=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
                catch(a){this.cleaner=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
            };
            if(!this.cleaner.test(x)){return {}};
            eval("this.myObj="+x);
            if(!this.restoreCirculars || !alert){return this.myObj};
            if(this.includeFunctions){
                var x=this.myObj;
                for(var i in x){if(typeof x[i]=="string" && !x[i].indexOf("JSONincludedFunc:")){
                    x[i]=x[i].substring(17);
                    eval("x[i]="+x[i])
                }}
            };
            this.restoreCode=[];
            this.make(this.myObj,true);
            var r=this.restoreCode.join(";")+";";
            eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
            eval(r);
            return this.myObj
        },
        toJsonStringArray:function(arg, out) {
            if(!out){this.path=[]};
            out = out || [];
            var u; // undefined
            switch (typeof arg) {
            case 'object':
                this.lastObj=arg;
                if(this.detectCirculars){
                    var m=this.mem; var n=this.pathMem;
                    for(var i=0;i<m.length;i++){
                        if(arg===m[i]){
                            out.push('"JSONcircRef:'+n[i]+'"');return out
                        }
                    };
                    m.push(arg); n.push(this.path.join("."));
                };
                if (arg) {
                    if (arg.constructor == Array) {
                        out.push('[');
                        for (var i = 0; i < arg.length; ++i) {
                            this.path.push(i);
                            if (i > 0)
                                out.push(',\n');
                            this.toJsonStringArray(arg[i], out);
                            this.path.pop();
                        }
                        out.push(']');
                        return out;
                    } else if (typeof arg.toString != 'undefined') {
                        out.push('{');
                        var first = true;
                        for (var i in arg) {
                            if(!this.includeProtos && arg[i]===arg.constructor.prototype[i]){continue};
                            this.path.push(i);
                            var curr = out.length;
                            if (!first)
                                out.push(this.compactOutput?',':',\n');
                            this.toJsonStringArray(i, out);
                            out.push(':');
                            this.toJsonStringArray(arg[i], out);
                            if (out[out.length - 1] == u)
                                out.splice(curr, out.length - curr);
                            else
                                first = false;
                            this.path.pop();
                        }
                        out.push('}');
                        return out;
                    }
                    return out;
                }
                out.push('null');
                return out;
            case 'unknown':
            case 'undefined':
            case 'function':
                if(!this.includeFunctions){out.push(u);return out};
                arg="JSONincludedFunc:"+arg;
                out.push('"');
                var a=['\n','\\n','\r','\\r','"','\\"'];
                arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
                out.push(arg);
                out.push('"');
                return out;
            case 'string':
                if(this.restore && arg.indexOf("JSONcircRef:")==0){
                    this.restoreCode.push('this.myObj.'+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
                };
                out.push('"');
                var a=['\n','\\n','\r','\\r','"','\\"'];
                arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
                out.push(arg);
                out.push('"');
                return out;
            default:
                out.push(String(arg));
                return out;
            }
        }
    };

    x.$.init();
    return x;
}()

ADF = {
    Settings: {
        customAddressID : 'EF0C022E-A34C-4FA8-B205-0622F7F77284',
        customCityID    : '0B0A3DE9-E908-46E3-9062-97D22353FF6A',
        customClosingID : 'AB71F8B-B1C0-4256-9897-9C4660647D3B',
        customEmailID   : '7624998C-EDFD-46DE-844E-9D1C7EBBF0AF',
        customMessageID : 'D005CB07-A7CB-4D86-AC14-0BA4C7C65588',
        customOccasionID: '5773ECA3-4AF0-4975-A4AB-B3DA063B4286',
        customPhoneID   : 'B40E7C84-42D1-413A-82C1-D83344B014E9',
        customRecipientID: '1E12C702-EE5A-44DF-9925-FE6A8E4F6E8A',
        customStateID   : 'F33AA75D-1C9E-4C88-81BD-B6E96F2E27C4',
        customZipID     : '6E203517-DB3D-447C-B08B-FDDF3F22BCA3',
        designationID   : '2fc2d314-f3bd-4cab-81fb-2c47b5b399ac',
        merchantID      : 'b3d5af59-9f26-4414-9f9a-b13f7aae7899',    //,'46b94b1e-383b-479f-8f7e-bba4ea285c98'  
        countryID       : "d81cef85-7569-4b2e-8f2e-f7cf998a3342",
        eventsID        : "122e657c-2bcb-454d-940e-8f6a51d1a32c",
        customClosingTable :   "d00484b6-3d87-4479-802e-8f3862031abb",
        eventCateogryID : "23a343cf-57f7-4f94-b567-b58c8ecfd94a",
        blogCategoryFeed: "/feed.rss?id=2",
        isEditView      :  window.location.href.match('pagedesign')
    },
    Methods: {
        initializeADF: function() {
            var transactionID = BLACKBAUD.api.querystring.getQueryStringValue("t");
            var partId = $('.BBDonationApiContainer').attr('data-partid');
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;
            var donationService = new BLACKBAUD.api.DonationService(partId, {url: bbisURL, crossDomain: true});
            var cartService = BLACKBAUD.netcommunity.Cart.AddDonationToCart;
            function completeBBSPPayment(transactionID) {
                  donationSuccess = function (response) {
                    if (response.Donation.TransactionStatus === 1) {
                      $('.adfWrapper').hide();
                      $('.adfConfirmationWrapper').show();
                      getConfirmationHtml(response.Donation.Id);
                    }
                  };

                  donationFail = function (error) {
                    $('.adfValidationWrapper').html(ADF.Methods.convertErrorsToHtml(error));
                    $('.adfWrapper').find('input, select, textbox').removeAttr('disabled');
                    $(window).scrollTop($('.mainContent').offset().top);
                  };
                donationService.completeBBSPDonation(transactionID, donationSuccess, donationFail);
            }
            function getConfirmationHtml(id) {
              onSuccess = function (d) {
                $('.adfConfirmationWrapper').html(d);
              };

              onFail = function (d) {
                $('.adfValidationWrapper').html(ADF.Methods.convertErrorsToHtml(error));
                $('.adfWrapper').find('input, select, textbox').removeAttr('disabled');
                $(window).scrollTop($('.mainContent').offset().top);
              };

              donationService.getDonationConfirmationHtml(id, onSuccess, onFail);
            }
            function setInvalid (input, message) {
                input.addClass('invalid');
                if (input.closest('.adfFormRow').find('.validationMessage').length === 0) {
                    //input.closest('.adfFormRow').append('<div class="validationMessage">'+message+'</div>');
                }
            }
            function removeInvalid(input) {
                input.removeClass('invalid');
                input.closest('.adfFormRow').find('.validationMessage').remove();
            }

            function getEvents() {
            var codeTableService = new BLACKBAUD.api.CodeTableService();
            codeTableService.getEntries(ADF.Settings.eventsID, function (data) {
                $.each(data, function () {
                    var dashedName = this["Description"].replace(/ /g, '-');
                    var cardHTML = '<div class="adfCardCell">' +
                    '<a class="fancybox" href="/image/'+dashedName+'-big.png"><img alt="Look Inside" class="adfLookInsideImg" src="/image/2014-gift-cards/lookinside.png" /></a>' +
                    '<p class="adfCardTitle">'+this["Description"]+'</p>' +
                    '<a class="fancybox" href="/image/'+dashedName+'-big.png"><img title="'+this["Description"]+'" src="/image/'+dashedName+'.png" /></a>' +
                    '<div class="adfCardRadioWrapper"><input type="radio" name="giftCardDesign" value="new-year" /></div></div>';
                    $('.adfCardGridWrapper').append(cardHTML);
                });

                //init fancy boxes
                $('.fancybox').fancybox();
            });
            }
            if (transactionID) {
              $('.adfWrapper').hide();
              $('.adfConfirmationWrapper').show();
              completeBBSPPayment(transactionID);
            } else {
                getEvents();
                //get states from CRM
                ADF.Methods.bindStateDropdown($('#adfGiftState, #adfBillingState')); // #adfBillingState removed
                // removed at client request
                //ADF.Methods.bindClosingDropdown($('#adfClosing'));


                //amount buttons
                $('.adfAmountButton').on('click', function(e) {

                    e.preventDefault();
                    $('.adfAmountButton').removeClass('active');
                    $('#adfAmount').val($(this).text().replace('$',''));
                    $(this).addClass('active');
                });
                $('#adfAmount').on('focus', function() {
                    $('.adfAmountButton').removeClass('active');
                });

                //handle submit validation
                $('.adfSubmitWrapper input[type="button"]').on('click', function() {
                    $('.adfTextInput, .adfSelectInput, #adfGiftAddress').each(function() {
                        if ($(this).val() === "" || $(this).val() === "-1") {
                            setInvalid($(this), 'Required field');
                        }
                    });
                   if ($('input[name="giftCardDesign"]:checked').length === 0) {
                       setInvalid($('input[name="giftCardDesign"]'));
                   }
                    $('#adfGiftEmail').each(function() {
                        if ($(this).val().match('@') == -1) {
                            setInvalid($(this), 'Invalid email address');
                        }
                    });
                    $('.adfTextInput.invalid, #adfGiftAddress').unbind('focus').on('focus', function() {
                        removeInvalid($(this));
                    });
                    $('.adfSelectInput.invalid, input[name="giftCardDesign"]').unbind('change').on('change', function() {
                        removeInvalid($(this), 'Required field');
                    });
                    if ($('.adfFormWrapper .invalid').length ===0) {
                        ADF.Methods.submitDonation();
                    } else {
                        $('.adfValidationWrapper').html('<p>Please fill out all fields with valid data.</p>');
                        if ($('.adfCardRadioWrapper invalid').length !== 0) {
                            $('.adfValidationWrapper').append('<p>Please select a card template.</p>');
                        }
                        $(window).scrollTop($('.mainContent').offset().top);
                    }
                });
            }
        },

        submitDonation: function() {
            var partId = $('.BBDonationApiContainer').attr('data-partid');
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;
            var donationService = new BLACKBAUD.api.DonationService(partId, {url: bbisURL, crossDomain: true});
            var cartService = BLACKBAUD.netcommunity.Cart.AddDonationToCart;
            var donation = {
                "Gift" : {
                    "Designations": [{
                        "Amount"        : $('#adfAmount').val(),
                        "DesignationId" : ADF.Settings.designationID
                    }],
                    "IsAnonymous": false,
                    "Attributes": [
                        {
                            "AttributeId": ADF.Settings.customAddressID,
                            "Value": $('#adfGiftAddress').val()
                        },
                        {
                            "AttributeId": ADF.Settings.customCityID,
                            "Value": $('#adfGiftCity').val()
                        },
                        //{
                        //    "AttributeId": ADF.Settings.customClosingID,
                        //    "Value": $('#adfClosing').val()
                        //},
                        {
                            "AttributeId": ADF.Settings.customMessageID,
                            "Value": $('#adfGiftMessage').val()
                        },
                        {
                            "AttributeId": ADF.Settings.customOccasionID,
                            "Value": $('input[name="giftCardDesign"]:checked').val()
                        },
                        {
                            "AttributeId": ADF.Settings.customRecipientID,
                            "Value": $('#adfGiftName').val()
                        },
                        {
                            "AttributeId": ADF.Settings.customStateID,
                            "Value": $('#adfGiftState').val()
                        },
                        {
                            "AttributeId": ADF.Settings.customZipID,
                            "Value": $('#adfGiftZip').val()
                        }
                    ],

                }//,
                //"MerchantAccountId" : ADF.Settings.merchantID,
                //"BBSPReturnUri" : window.location.href
                //?t=8a7cb136-2c84-4027-990d-b9eaaa219fe1
            };
            donationSuccess = function (response) {
                // For Pledge, go ahead and show the confirmation.  For credit card, you will be redirected to BBSP already.
                if (response.Donation.TransactionStatus === 1) {
                  $('.adfWrapper').hide();
                  $('.adfConfirmationWrapper').show();
                  getConfirmationHtml(response.Donation.Id);
                }
              };

              donationFail = function (error) {
                $('.adfValidationWrapper').html(ADF.Methods.convertErrorsToHtml(error));
                $('.adfWrapper').find('input, select, textbox').removeAttr('disabled');
                $(window).scrollTop($('.mainContent').offset().top);
              };
            $('.adfWrapper').find('input, select, textbox').attr('disabled','disabled');
            donationService.createDonation(donation, donationSuccess, donationFail);
        },

        getEventCalendarCategories: function() {
            if (!ADF.Settings.isEditView && $('.interestCheckboxWrapper').length !== 0) {
            var interestWrapper = $('.interestCheckboxWrapper');
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;
            var codeTableId = ADF.Settings.eventCateogryID;
            var bbpage = Sys.WebForms.PageRequestManager.getInstance();
            var categories = [];
            var codeTableService = new BLACKBAUD.api.CodeTableService({
                url : bbisURL,
                crossDomain : false
            });

            codeTableService.getEntries(codeTableId, function(d) {
                var categoryWrapper = $('<div>');
                $.each(d, function() {
                    if (interestWrapper.find('input[data-category="'+ this["Description"] +'"]').length === 0) {
                        interestWrapper.append('<div class="interestItemWrapper"><input type="checkbox" data-category="'+this["Description"]+'" value="fc-eventcategory-'+ this["Description"] +'"><label>'+this["Description"]+'</label></div>');
                    }

                });
                //$('.interestCheckboxWrapper').append(categoryWrapper);
            });
        }
        },

        eventCalendarDetails: function() {
            if ($('.EventCalendarPartContainer div[id$="CalendarEvent1_pnlPrintView"]').length !== 0) {
                //has event details
                if ($('.bb_menu').length !== 0) {
                    $('.CalendarEditButtonCell input[value="Edit"]').show();
                }
                //is a publically submitted event

                var time = $.trim($('.BBFieldControlCell.DetailDateTime').text());
                var location = ($('span[id$="CalendarEvent1_lblTxtLocation"]').closest('tr').length !== 0)? $.trim($('span[id$="CalendarEvent1_lblTxtLocation"]').closest('tr').find('.DetailRight span').html().replace('(Map)','').replace('<br>',' | ')) : '';
                var newHtml = '<div class="eventDetailsTime">' + time + '</div><div clas="eventDetailsLocation">' + location + '</div>';
                var startDate, startMonthString, startDateString, startTimeString, endTimeString, fullDateString;
                var newButtonHtml = $('<div><a style="margin:0 5px;" href="'+$('a[id*="_LinkMoreInfo"]').attr('href')+'" title="Add to Calendar" class="addthisevent">Add to Calendar<span class="_start">10-05-2014 11:38:46</span><span class="_end">11-05-2014 11:38:46</span><span class="_zonecode">15</span><span class="_summary">Summary of the event</span><span class="_description">Description of the event</span><span class="_location">Location of the event</span><span class="_organizer">Organizer</span><span class="_organizer_email">Organizer e-mail</span><span class="_facebook_event">http://www.facebook.com/events/160427380695693</span><span class="_all_day_event">true</span><span class="_date_format">DD/MM/YYYY</span></a></div>');
                $('tr[id$="CalendarEvent1_TRLocation"]').hide();
                $('.EventCalendarPartContainer .BBFieldControlCell.DetailDateTime').html(newHtml);
                $('.EventCalendarPartContainer tr[id$="CalendarEvent1_TRContactInfo"], .EventCalendarPartContainer tr[id$="CalendarEvent1_TRCalendarName"]').hide();
                $('.EventCalendarPartContainer .eventDetailsTime').each(function() {
                    if ($(this).text().match('Time Zone:')) {
                        var parsedTime = $(this).text().split('Time Zone:');
                        var startTimeStr = parsedTime[0];
                        var endTime = parsedTime[1].split('Time')[1];
                        $(this).html(startTimeStr);
                    }

                });
                startTime = new Date($('.eventDetailsTime').text().split('-')[0]);
                startMonthString = ((startTime.getMonth()+1).toString().length === 1)? '0' + (startTime.getMonth()+1).toString() : (startTime.getMonth()+1).toString();
                startDateString = (startTime.getDate().toString().length === 1)? '0' + startTime.getDate().toString() : startTime.getDate().toString();
                startTimeString = startDateString + '-' + startMonthString + '-' + startTime.getFullYear().toString() + ' ' + startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + ':00';
                fullDateString = (startTime.getMonth()+1).toString() + '/' + startTime.getDate().toString() + '/' + startTime.getFullYear().toString();
                if ($('.eventDetailsTime').text().split('-').length === 1) {
                    newButtonHtml.find('._all_day_event').text('true');
                    newButtonHtml.find('._end').text(startTimeString);
                } else {
                    endTimeString = startDateString + '-' + startMonthString + '-' + startTime.getFullYear().toString() + ' ' + $('.eventDetailsTime').text().split('-')[1];
                    fullDateString = fullDateString + ' ' + $('.eventDetailsTime').text().split(startTime.getFullYear().toString())[1];
                    newButtonHtml.find('._all_day_event').text('false');
                    newButtonHtml.find('._end').text(endTimeString);
                    //startTime.setHours($('.eventDetailsTime').text().split('-')[1].split('-')[0]);
                }

                $('.eventDetailsTime').html(fullDateString);
                newButtonHtml.find('._start').text(startTimeString);

                newButtonHtml.find('._summary').text($('.DetailEventTitle').text());
                newButtonHtml.find('._description').text($('tr[id*="CalendarEvent1_TRDetails"] .DetailEventDetails').text());
                newButtonHtml.find('._location').text(location.replace('|',''));
                $('td[id$="CalendarEvent1_TdExportCell"]').html(newButtonHtml.html());
            } else if ($('div[id$="results_divResultsContainer"] .EventCalendarPartContainer').length === 1) {
                //is a CRM event
                var startTime = new Date($('.eventDetailsTime > span:first-child').text() + ' ' + $('.eventDetailsTime > span:eq(2)').text());
                var timezoneOffset = startTime.getTimezoneOffset();
                //var startTimeString = startTime.toISOString().replace(/[-:]/g, '').split('.')[0];
                var startMonthString = ((startTime.getMonth()+1).toString().length === 1)? '0' + (startTime.getMonth()+1).toString() : (startTime.getMonth()+1).toString();
                var startDateString = (startTime.getDate().toString().length === 1)? '0' + startTime.getDate().toString() : startTime.getDate().toString();
                var startTimeString = startDateString + '-' + startMonthString + '-' + startTime.getFullYear().toString() + ' ' + startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + ':00';
                //var startTimeHours = startDate
                var endTime = new Date($('.eventDetailsTime > span:eq(1)').text() + ' ' + $('.eventDetailsTime > span:eq(3)').text());

                var endMonthString = ((endTime.getMonth()+1).toString().length === 1)? '0' + (endTime.getMonth()+1).toString() : (endTime.getMonth()+1).toString();
                var endDateString = (endTime.getDate().toString().length === 1)? '0' + endTime.getDate().toString() : endTime.getDate().toString();
                var endTimeString = endDateString + '-' + endMonthString + '-' + endTime.getFullYear().toString() + ' ' + endTime.getHours().toString() + ':' + endTime.getMinutes().toString() + ':00';
                //var endTimeString = endTime.toISOString().replace(/[-:]/g, '').split('.')[0];
                var newButtonHtml = $('<div><a href="http://example.com/link-to-your-event" title="Add to Calendar" class="addthisevent">Add to Calendar<span class="_start">10-05-2014 11:38:46</span><span class="_end">11-05-2014 11:38:46</span><span class="_zonecode">15</span><span class="_summary">Summary of the event</span><span class="_description">Description of the event</span><span class="_location">Location of the event</span><span class="_organizer">Organizer</span><span class="_organizer_email">Organizer e-mail</span><span class="_facebook_event">http://www.facebook.com/events/160427380695693</span><span class="_all_day_event">true</span><span class="_date_format">MM/DD/YYYY</span></a></div>');

                //get the more infor URL and link
                var detailsURL = $.trim($('#eventDetailsURL').text());

                if (detailsURL.length === 0) {
                    $('#eventDetailsURL').closest('td').hide();
                } else {
                    $('#CalendarEvent1_LinkMoreInfo_View').attr('href', detailsURL);
                }

                newButtonHtml.find('._start').text(startTimeString);
                newButtonHtml.find('._end').text(endTimeString);
                if (startTimeString == endTimeString) {
                    newButtonHtml.find('._all_day_event').text('true');
                    $('.eventDetailsTime').html($('.eventDetailsTime > span:first-child').text());

                } else {
                    newButtonHtml.find('._all_day_event').text('false');
                }
                if ($('.eventDetailsTime > span:first-child').text() === $('.eventDetailsTime > span:eq(1)').text()) {
                    var newEventDetailsTimeHtml = $('.eventDetailsTime > span:first-child').text() + ' ' + $('.eventDetailsTime > span:eq(2)').text();
                    if ($('.eventDetailsTime > span:eq(3)').text().length !== 0) {
                        newEventDetailsTimeHtml = newEventDetailsTimeHtml + ' - ' + $('.eventDetailsTime > span:eq(3)').text();
                    }
                    $('.eventDetailsTime').html(newEventDetailsTimeHtml);
                } else {
                    $('.eventDetailsTime').html($('.eventDetailsTime > span:first-child').text() + ' - ' + $('.eventDetailsTime > span:eq(1)').text());
                }
                //hide blank locations
                if ($('.eventAddress').text().length === 9) {
                    $('.eventAddress').hide();
                }
                newButtonHtml.find('._summary').text($('.DetailEventTitle').text());
                newButtonHtml.find('._description').text($('.DetailEventDetails').text());
                newButtonHtml.find('._location').text('');
                $('.DetailEventDetails span').each(function() {
                    $(this).html($('.DetailEventDetails').text()).text();
                });
                //social buttons for add calendar
                $('.socialButtons').html(newButtonHtml.html());

            }
        },

        addPublicEvent: function() {
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;
            var codeTableId = ADF.Settings.eventCateogryID;
            var bbpage = Sys.WebForms.PageRequestManager.getInstance();
            var categories = [];
            bbpage.add_pageLoaded(function(){
            if ($('.bb_menu').length !== 0) {
                $('.EventCalendarButtonBar').show();
            }

            if ($('.EventCalendarPartContainer').length !== 0) {
                $('.ChannelNewStoryButtonWAI').hide();
                if ($('.NewsChannelListingTable').length !== 0) {
                    $('.NewsChannelItem').each(function() {
                        var newHtml = $(this).find('.NewsChannelItemDesc').html().replace('Contact:','Categories:');
                        var itemURL = $(this).find('.NewsChannelItemTitle a').attr('href');
                        $(this).find('.NewsChannelItemDesc').html(newHtml);
                        $(this).find('.ChannelStoryEditButtonWAI').attr('href', itemURL).html('View/Edit');

                    });
                }
                $('tr[id*="_trEditContactInfo"], tr[id*="CalendarEvent1_TRTimeZone"]').hide();
                if ($('.bb_menu').length === 0) {
                    $('.EventCalendarButtons').not('[id*="lbtnNewEvent"]').hide();
                }

                if ($('label[id*="lblTxtSubtitle"]').length !== 0) {
                    $('.CalendarFormCategoryContainer, input[id*="TextBoxEventSubtitle"], textarea[id*="CalendarEvent1_TextboxContactInfo"]').hide();
                    $('label[id*="lblTxtSubtitle"]').text('Categories');

                    var codeTableService = new BLACKBAUD.api.CodeTableService({
                        url : bbisURL,
                        crossDomain : false
                    });

                    codeTableService.getEntries(codeTableId, function(d) {
                        var categoryWrapper = $('<div id="newEventCategoryWrapper"></div>');
                        var currentCategories = $('textarea[id*="CalendarEvent1_TextboxContactInfo"]').val();
                        $.each(d, function() {
                            var checked = '';
                            if (currentCategories.match(this["Description"]) !== null) {

                                checked = 'checked="checked" ';
                            }
                            categoryWrapper.append('<div class="newEventCategoryInputWrapper"><input class="newEventCategory" '+checked+'type="checkbox" value="'+ this["Description"] +'"><label>'+this["Description"]+'</label></div>');
                        });

                        $('input[id*="TextBoxEventSubtitle"]').after(categoryWrapper);

                    });
                    $('.CalendarEditButtonCell input[value="Save"]').on('mousedown', function() {
                            var categoryValueString = "";
                            $('.newEventCategory:checked').each(function(){
                                var value = $(this).val();
                                if (categoryValueString === "") {
                                    categoryValueString = value;
                                } else {
                                    categoryValueString = categoryValueString + ',' + value;
                                }
                            });
                            $('textarea[id*="CalendarEvent1_TextboxContactInfo"]').val(categoryValueString);
                        });
                }

            }
            });
        },

        newsFeedItems: function() {
            var titleLinkRef = ADF.Methods.getQueryVariable('article');
            if (!!titleLinkRef) {
                $('.NewsChannelItem').each(function() {
                    var titleLink = $.trim($(this).find('.NewsChannelItemTitle').text().replace(/[^\w\s]/gi, ''));
                    titleLink = titleLink.replace(/ /g, '-');
                    if (titleLink !== titleLinkRef) {
                        $(this).hide();
                    }
                });
            }
        },

        tagCloud: function() {
            if ($('.tagcloud').not('nav .tagcloud').length !== 0) {
                $('.tagcloud').not('nav .tagcloud').find('.notATag').hide();
                $.getJSON(ADF.Settings.blogCategoryFeed, function(data){
                    var masterCount = data.value.items[0].count;
                    $('.tagcloud a').attr('data-count', '1');
                    $.each(data.value.items, function(key, item){
                        var category = item.category;
                        var count = item.count;
                        if (count > masterCount) {
                            masterCount = count;
                        }
                        $('.tagcloud a:contains("'+ category +'")').attr('data-count', Number(count)+1);
                    });
                    $.each($('.tagcloud a'), function(){
                        var currentWeight = $(this).attr('data-count');
                        var maxFontSize = 2.5;
                        var percentage = currentWeight/masterCount;
                        var fontSize = maxFontSize*percentage;
                        if (fontSize < 0.8) {
                            fontSize = 0.8;
                        }
                        $(this).css('font-size', fontSize.toString() + 'em');
                        if ($('#blogWrapper').length !== 0) {
                            $(this).attr('href', '#' + $(this).text());
                        }
                    });
                    if ($('#blogWrapper').length !== 0) {
                        $('.tagcloud a').on('click', function() {
                            var category = $(this).text().replace('#', '').replace('&', 'and').replace(/ /g, '-');
                            $('#blogWrapper').hide();

                            if ($('#'+category+'View').length === 0) {
                                var newWrapper = $('<div class="categoryView" id="'+category+'View"></div>');
                                $('#blogWrapper').after(newWrapper);
                                console.log(category);
                                newWrapper.rssfeed('feed.rss?id=2&category=' + category, {
                                    limit: 5,
                                    ssl: true,
                                    snippet: false,
                                    titletag: 'h2',
                                    header: false
                                });

                            }
                            $('.categoryView').hide();
                            $('#'+category+'View').show();
                        });
                    }
                });
            }

        },

        tagCloudXML: function() {
            if ($('.tagcloud').not('nav .tagcloud').length !== 0) {
                $('.tagcloud').not('nav .tagcloud').find('.notATag').hide();
                $.get(ADF.Settings.blogCategoryFeed, function(data){
                    var items = $(data).find('item');
                    var largestCount = 0;
                    var allCategories = items.find('category');
                    var categoryArray = [];
                    var allCategoriesCount = {};
                    $('.tagcloud a').attr('data-count', '1');
                    allCategories.each(function() {
                        var category = $(this).text();
                        if ($.inArray(category, categoryArray) === -1) {
                            categoryArray.push(category);
                            allCategoriesCount[category] = 1;
                        } else {
                            allCategoriesCount[category] = allCategoriesCount[category] + 1;
                        }
                    });
                    $.each(allCategoriesCount, function(category, count) {
                        $('.tagcloud a:contains("'+ category +'")').attr('data-count', Number(count));
                        if (count > largestCount) {
                           largestCount = count;
                        }
                    });
                    $.each($('.tagcloud a'), function(){
                        var currentWeight = $(this).attr('data-count');
                        var maxFontSize = 2.5;
                        var percentage = currentWeight/largestCount;
                        var fontSize = maxFontSize*percentage;
                        if (fontSize < 0.8) {
                            fontSize = 0.8;
                        }

                        $(this).css('font-size', fontSize.toString() + 'em');
                        if ($('#blogWrapper').length !== 0) {
                            $(this).attr('href', '#' + $(this).text());
                        } else {
                            $(this).attr('href', '/blog#' + $(this).text());
                        }
                    });
                    if ($('#blogWrapper').length !== 0) {
                        $('.tagcloud a').on('click', function() {
                            var category = $(this).attr('href').replace('#', '.').replace(/ & /g,' ').replace(/ /g, '-');
                            $('#blogWrapper .rssRow').hide();
                            $('#blogWrapper ' + category).show();

                        });
                    }
                    $(document).ready(function() {
                        if (window.location.hash !== '') {
                            var category = window.location.hash.replace('#', '.').replace(/ & /g,' ').replace(/ /g, '-');
                            $('#blogWrapper .rssRow').hide();
                            $('#blogWrapper ' + category).show();
                        }
                    });
                });
            }

        },

        upcomingEvents: function () {
            if ($('.upcomingEventWrapper').length !== 0) {
                $('.upcomingEventDate').each(function () {
                    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                    var eventDate = $(this).text().split('/');
                    var monthName = months[Number(eventDate[0])-1];

                    $(this).html('<span class="upcomingEventMonth">' + monthName + '</span><span class="upcomingEventDay">'+eventDate[1]+'</span>');
                });
                $('.upcomingEventText').each(function () {
                    var detailsHtml = $(this).find('> span').text();
                    $(this).find('> span').html(detailsHtml).text();
                    $(this).find('.upcomingEventLink').attr('href', '/community-pages/2014-calendar---event-details?id=' + $(this).closest('.upcomingEventWrapper').find('.upcomingEventId').text());
                });
                //$('.tabs .content-1').append($('.BBDesignationSearchResultContainer'));

            }
            if ($('.popularEvent').length !== 0) {
                $('.popularEvent').each(function () {
                    var detailsHtml = $(this).find('.popularEventsDesc > span').text();
                    $(this).find('.popularEventsDesc > span').html(detailsHtml).text();
                });
            }

        },

        bindStateDropdown: function(dropdown) {
            //original scope does not call for multiple countries
            //code for USA supplied
            var countryID = ADF.Settings.countryID;
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;


            var countryService = new BLACKBAUD.api.CountryService({
                url : bbisURL,
                crossDomain : false
            });
            dropdown.empty();
            countryService.getStates(countryID, function(d) {
                $.each(d, function() {
                    dropdown.append($("<option></option>").val(this["Abbreviation"]).text(this["Abbreviation"]));
                });

            });
        },

        bindClosingDropdown: function(dropdown) {
            var bbisURL = BLACKBAUD.api.pageInformation.rootPath;
            var codeTableId = ADF.Settings.customClosingTable;

            var codeTableService = new BLACKBAUD.api.CodeTableService({
                url : bbisURL,
                crossDomain : false
            });
            dropdown.empty();
            codeTableService.getEntries(codeTableId, function(d) {
                $.each(d, function() {
                    dropdown.append($("<option></option>").val(this["Description"]).text(this["Description"]));
                });

            });
        },

        convertErrorToString: function(error) {
            if (error) {
                if (error.Message)
                    return error.Message;
                switch (error.ErrorCode) {
                    case 101:
                        return error.Field + " is required.";
                    case 105:
                        return error.Field + " is not valid.";
                    case 106:
                        return "Record for " + error.Field + " was not found.";
                    case 203:
                        return "Donation not completed on BBSP.";
                    case 107:
                        return "Max length for " + error.Field + " exceeded.";
                    default:
                        return "Error code " + error.ErrorCode + ".";
                }
            }
        },

        convertErrorsToHtml: function(errors) {
            var i, message = "Unknown error.<br/>";
            if (errors) {
                message = "";
                for ( i = 0; i < errors.length; i++) {
                    message = message + ADF.Methods.convertErrorToString(errors[i]) + "<br/>";
                }
            }
            return message;
        },

        getQueryVariable: function (variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return unescape(pair[1]);
                }
            }
            return false;
        }
    }

};
if ($('.BBDonationApiContainer').length !== 0) {
    ADF.Methods.initializeADF();
}
$(document).ready(function() {


    $('div[id$="theDisplay"]').prev('br').remove();

    if ($('.popularEvent').length !== 0) {
        $('.popularEvent').each(function() {
            var linkID = $(this).find('.hiddenEventID').text();
            $(this).find('a').attr('href', '/community-pages/2014-calendar---event-details?id=' + linkID);
        });
    }
    ADF.Methods.eventCalendarDetails();
    ADF.Methods.getEventCalendarCategories();
    ADF.Methods.upcomingEvents();

});
if (!window.location.href.match("pagedesign")) {
    ADF.Methods.newsFeedItems();
    ADF.Methods.tagCloudXML();
    ADF.Methods.addPublicEvent();
}

//other feeds
//http://www.example.com/category/categoryname/feed
//http://www.example.com/tag/tagname/feed

/*
===================================================
 PLUGINS
---------------------------------------------------
 Additional plugins can be found on DropBox, under:
 Design Team > Javascript > Plugins
---------------------------------------------------
*/

// Insert plugins here...

(function($){

    $.fn.rssfeed = function(url, options, fn) {

        // Set pluign defaults
        var defaults = {
            limit: 10,
            header: true,
            titletag: 'h4',
            date: true,
            content: true,
            snippet: true,
            media: true,
            showerror: true,
            errormsg: '',
            key: null,
            ssl: false,
            linktarget: '_self'
        };
        var options = $.extend(defaults, options);

        // Functions
        return this.each(function(i, e) {
            var $e = $(e);
            var s = '';

            // Check for SSL protocol
            if (options.ssl) s = 's';

            // Add feed class to user div
            if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');

            // Check for valid url
            if(url == null) return false;

            // Create Google Feed API address
            var api = "http"+ s +"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url);
            if (options.limit != null) api += "&num=" + options.limit;
            if (options.key != null) api += "&key=" + options.key;
            api += "&output=json_xml";

            // Send request
            $.getJSON(api, function(data){

                // Check for error
                if (data.responseStatus == 200) {

                    // Process the feeds
                    _process(e, data.responseData, options);

                    // Optional user callback function
                    if ($.isFunction(fn)) fn.call(this,$e);

                } else {

                    // Handle error if required
                    if (options.showerror)
                        if (options.errormsg != '') {
                            var msg = options.errormsg;
                        } else {
                            var msg = data.responseDetails;
                        };
                        $(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
                };
            });
        });
    };

    // Function to create HTML result
    var _process = function(e, data, options) {

        // Get JSON feed data
        var feeds = data.feed;
        if (!feeds) {
            return false;
        }
        var html = '';
        var row = 'odd';
        var htmlObject;

        // Get XML data for media (parseXML not used as requires 1.5+)
        if (options.media) {
            var xml = getXMLDocument(data.xmlString);
            var xmlEntries = xml.getElementsByTagName('item');
        }

        // Add header if required
        if (options.header)
            html += '<div class="rssHeader">' +
                '<a href="'+feeds.link+'" title="'+ feeds.description +'">'+ feeds.title +'</a>' +
                '</div>';

        // Add body
        html += '<div class="rssBody">' +
            '<div>';

        // Add feeds
        for (var i=0; i<feeds.entries.length; i++) {

            // Get individual feed
            var entry = feeds.entries[i];
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            var pubDate;
            var titlelink = entry.title.replace(/[^\w\s]/gi, '');
            var categoryClasses = ' '+entry.categories.toString().replace(/ &amp; /g, ' ').replace(/ /g,'-').replace(/,/g,' ');
            // Format published date
            if (entry.publishedDate) {
                var entryDate = new Date(entry.publishedDate);
                //var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
                //var pubDate = entryDate.toLocaleDateString();
                var pubDate = months[entryDate.getMonth()] + ' ' + entryDate.getDate().toString() + ', ' + entryDate.getFullYear();
            }

            //update the links
            entry.link = entry.link.replace('4249bl.blackbaudhosting.com', window.location.host) + '?article=' + titlelink.replace(/ /g, '-');
            entry.link = entry.link.replace('theassociated.org', 'associated.org');
            // Add feed row
            html += '<div class="rssRow '+row+categoryClasses+'">';
            html += '<'+ options.titletag +'><a href="'+ entry.link +'" title="View this feed at '+ feeds.title +'">'+ entry.title +'</a></'+ options.titletag +'>';
            //console.log(html);
            if (options.date && pubDate) html += '<div class="rssPubDate">'+ pubDate +'</div>';
            if (options.content) {

                // Use feed snippet if available and optioned
                if (options.snippet && entry.contentSnippet != '') {
                    var content = entry.contentSnippet.replace(/theassociated.org/g, 'associated.org');
                } else {
                    var content = entry.content.replace(/theassociated.org/g, 'associated.org');
                }
                html += '<div class="rssContentText">'+ content +'</div>';

            }

            // Add any media
            if (options.media && xmlEntries.length > 0) {
                var xmlMedia = xmlEntries[i].getElementsByTagName('enclosure');
                if (xmlMedia.length > 0) {
                    html += '<div class="rssMedia"><div>Media files</div><div>';
                    for (var m=0; m<xmlMedia.length; m++) {
                        var xmlUrl = xmlMedia[m].getAttribute("url");
                        var xmlType = xmlMedia[m].getAttribute("type");
                        var xmlSize = xmlMedia[m].getAttribute("length");
                        html += '<ul><a href="'+ xmlUrl +'" title="Download this media">'+ xmlUrl.split('/').pop() +'</a> ('+ xmlType +', '+ formatFilesize(xmlSize) +')</ul>';
                    }
                    html += '</div></div>';
                }
                html += '<a class="readMoreLink" href="'+entry.link+'" title="Read More">Read More</a></div>';
            }

            // Alternate row classes
            if (row == 'odd') {
                row = 'even';
            } else {
                row = 'odd';
            }
        }

        html += '</div>' +
            '</div>';
        htmlObject = $(html);
        htmlObject.find('.rssRow').each(function () {
            var textWrapper = $(this).find('.rssPubDate');
            var textTitle = $(this).find('h2');

            $(this).find('> *').wrapAll('<div class="rssContentWrapper">');
            $(this).prepend('<div class="rssImagePreview">');
            $(this).find('.rssImagePreview').prepend($(this).find('img').first());
            if ($.trim($(this).find('.rssContentText p').first().text())=== '') {
                $(this).find('.rssContentText p').first().remove();
            }
            $(this).find('.rssContentText p').first().addClass('rssIntroLine').insertAfter(textTitle);
            $(this).find('.rssContentText p').first().addClass('.rssSummary');
            $(this).find('.rssContentText > *:gt(0)').wrapAll('<div class="rssFullArticle" style="display:none;" />');
            //$(this).find('img');
        });
        $(e).append(htmlObject);

        // Apply target to links
        $('a',e).attr('target',options.linktarget);
    };

    function formatFilesize(bytes) {
        var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes)/Math.log(1024));
        return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
    }

    function getXMLDocument(string) {
        var browser = navigator.appName;
        var xml;
        if (browser == 'Microsoft Internet Explorer') {
            xml = new ActiveXObject('Microsoft.XMLDOM');
            xml.async = 'false';
            xml.loadXML(string);
        } else {
            xml = (new DOMParser()).parseFromString(string, 'text/xml');
        }
        return xml;
    }

})(jQuery);

    if ($('#blogWrapper').length !== 0 && !window.location.href.match("pagedesign")) {
        $('#blogWrapper').rssfeed(BLACKBAUD.api.pageInformation.rootPath + 'feed.rss?id=2', {
            limit: 50,
            ssl: true,
            snippet: false,
            linkredirect: window.location,
            titletag: 'h2',
            header: false
        });
        //hide original blog and display only the post button.

    }
// Make it safe to use console.log always
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try{console.log();return window.console;}catch(err){return window.console={};}})());