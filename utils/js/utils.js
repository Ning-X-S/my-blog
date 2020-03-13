/*
 * @Author: PosyMo 
 * @Date: 2018-04-04 17:50:57 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-06-06 15:34:35
 * 
 * === 常用工具类 ===
 * 
 * 原则：不依赖第三方，随取随用
 */

// 事件相关类
var eventUtil = {
    /**
     * 函数去抖
     * 函数连续调用时，空闲时间必须大于或等于 delay，func 才会执行
     * 适用场景：1. window对象的resize、scroll事件
     *          2. 拖拽时的mousemove事件
     *          3. 文字输入、自动完成的keyup事件
     * @param   {function}  func    请求关联函数，实际应用需要调用的函数
     * @param   {number}    delay   空闲时间，单位毫秒
     * @returns {function}          返回客户调用函数
     */
    debounce: function(func, delay) {
        var timer;
        return function(){
            var ctx = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                func.apply(ctx, args);
            }, delay);
        }
    },
    // 添加句柄
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on'+type] = handler;
        }
    },
        
    // 删除句柄
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on'+type] = null;
        }
    },
        
    // event获取
    getEvent: function(event) {
        return event ? event : window.event;
    },
        
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
        
    // 清除对象默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 给页面添加事件
    // 除了window.onlod之外，另一种简便方法，给页面添加函数至页面完成
    addLoadEvent: function(func) {
        var oldLoad = window.onload;
        if (typeof oldLoad != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                oldLoad();
                func();
            }
        }
    }
}

// DOM操作相关
var domUtil = {
    // 获取下一个兄弟节点（越过空格或者其他文本节点）
    getNextSibling: function(n) {
        var x = n.nextSibling;
        while (x && x.nodeType != 1) {
            x = x.nextSibling;
        }
        return x;
    },

    // 获取上一个兄弟节点（越过空格或者其他文本节点）
    getPreviousSibling: function(n) {
        var i = n.previousSibling;
        while (i && i.nodeType != 1) {
            i = i.previousSibling;
        }
        return i;
    },

    // 在目标节点之后添加
    insertAfter: function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    },

    // 节点是否已有某class类名
    hasClass: function(ele, className) {
        var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return reg.test(ele.className);
    },

    // 为节点追加class类名
    addClass: function(ele, className) {
        var reg = new RegExp('(^|\\s)' + className + '(\\s|$)'),
            hasClass = reg.test(el.className);
        if (hasClass) {
            return;
        }
        var newClass = el.className.split(' ');
        newClass.push(className);
        el.className = newClass.join(' ');
    },

    // 去除字符串前后空格
    // 供 removeClass() 使用
    trim: function(string) {
        return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    },

    // 移除class类名，支持同时移除多个
    removeClass: function(el, cls) {
        if (!el || !cls) return;
        var classes = cls.split(' ');
        var curClass = ' ' + el.className + ' ';
    
        for (var i = 0, j = classes.length; i < j; i++) {
            var clsName = classes[i];
            if (!clsName) continue;
        
            if (el.classList) {
                el.classList.remove(clsName);
            } else if (this.hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
        if (!el.classList) {
            el.className = this.trim(curClass);
        }
    },

    // 用于获取样式,解决使用'offset--'系列，加入border所产生的小bug
    getStyle: function(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];  /*针对IE浏览器*/
        } else {
            return getComputedStyle(obj,false)[attr];   /*针对火狐浏览器*/
        }
    },

    /**
     * get/set 节点 data- 属性
     * @param {HTMLElement} ele     节点
     * @param {string}      name    属性名
     * @param {string}      val     选填/属性值
     */
    getData: function(ele, name, val) {
        var prefix = 'data-'
        if (val) {
            return el.setAttribute(prefix + name, val);
        } else {
            return el.getAttribute(prefix + name);
        }
    }
}

// 数据验证相关
var validateUtil = {
    // 验证字符串
    isString: function(str) {
        if (typeof str !== 'string') return false;
        if (str.trim().length < 1) return false;
        return true;
    },

    // 验证数字
    isInt: function(num) {
        if (typeof num !== 'number') return false;
        return /^[0-9]+$/.test(num);
    },

    // 验证手机号码
    isTelphone: function(num) {
        if (!this.isInt(num)) return false;
        return /^((\+?[0-9]{1,4})|(\(\+86\)))?(1[0-9])\d{9}$/.test(num);
    },

    // 验证邮箱
    isEmail: function(str) {
        if (!this.isString(str)) return false;
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str);
    },

    // 验证浮点小数
    isFloatNum: function(num) {
        if (!this.isInt(num)) return false;
        return /^(-?\d+)(\.\d+)?$/.test(num);
    },

    // 验证中文名称，中间不允许出现数字和符号
    isName: function(str) {
        if (!str) return false;
        return /^[\u4e00-\u9fa5]{0,}$/.test(str);
    },

    // 识别数据类型
    // 支持：boolean/null/object/number/string/undefined/array
    //      function/date/window
    typeOf: function(data) {
        //typeof 可准确识别数据类型：number,string,undefined,function,boolean
        var iType = typeof data;
        if ( data === null ) {
            iType = 'null';
        } else if ( data === window ) {
            iType = 'window';
        } else if ( iType === 'object' ) {
            //instanceof 可以进一步判断object,date,array
            if ( data instanceof Array ) {
                iType = 'array';
            } else if ( data instanceof Date ) {
                iType = 'date';
            } else {
                iType = 'object';
            }
        }
        return iType;
    }
}

// 数据处理相关
var dataProcessingUtil = {
    // 数组乱序
    // 大名鼎鼎的Fisher–Yates shuffle洗牌算法
    shuffle: function(arr) {
        var _arr = arr.slice(); // 返回数组的一个浅拷贝
        for (var i = 0; i < _arr.length; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = _arr[i];
            _arr[i] = _arr[j];
            _arr[j] = t;
        }
        return _arr;
    },

    // 升序排列
    // 基于sort函数的简便排序，会改变原数组
    arrSort: function(arr) {
        arr.sort(function(a, b) {
            return a - b;   // 比较函数视需求而定
        })
    },

    // 冒泡排序
    bubbleSort: function(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                    var temp = arr[j+1];        //元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    },

    /**
     * 对象属性扩展函数
     * @param {object} to       目标对象
     * @param {object} _from    来源
     */
    extend: function(to, _from) {
        for (let key in _from) {
            to[key] = _from[key];
        }
        return to;
    },

    // 生成任意范围的随机数
    // getRandomArbitrary(1.5, 6.5) => 2.4942810038223864
    getRandomArbitrary: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    // 生成任意范围的随机整数
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 生成任意位数的随机字符
    // random_str(6) // "NdQKOr"
    randomStr: function(length) {
        var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
        ALPHABET += '0123456789-_';
        var str = '';
        for (var i=0; i < length; ++i) {
            var rand = Math.floor(Math.random() * ALPHABET.length);
            str += ALPHABET.substring(rand, rand + 1);
        }
        return str;
    }
}

// 数据存取相关
var storageUtil = {
    /**
     * 设置cookie
     * @param {string} name         key
     * @param {string} value        值
     * @param {number} expireHours  过期时间/小时/可选
     */
    setCookie: function(name, value, expireHours) {
        var cookieString = name + "=" + escape(value) + "; path=/";
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expire=" + date.toGMTString();
        }
        document.cookie = cookieString;
    },

    // 获取cookie
    getCookie: function(name) {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == name) {
                return unescape(arr[1]);
            }
        }
        return "";
    },

    // 删除全部cookie
    delCookie: function() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    },

    // 设置localStorage
    setStor: function(name, content) {
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },

    // 获取localStorage
    getStore: function(name) {
        return window.localStorage.getItem(name);
    },

    // 删除localStorage
    removeStore: function(name) {
        window.localStorage.removeItem(name);
    }
}

// 其他方法类
var otherUtil = {
    // 获取url参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    /**
     * 解析url参数
     * @example ?id=12345&a=b
     * @return  Object {id:12345,a:b}
     */
    urlParse: function() {
        var url = window.location.search;
        var obj = {};
        var reg = /[?&][^?&]+=[^?&]+/g;
        var arr = url.match(reg); // ['?id=12345', '&a=b']
        if (arr) {
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i]
                var tempArr = item.substring(1).split('=');
                var key = decodeURIComponent(tempArr[0]);
                var val = decodeURIComponent(tempArr[1]);
                obj[key] = val;
            }
        }
        return obj;
    },

    // 获取XHR对象
    getHTTPObject: function() {
        if (typeof XMLHttpRequest == "undefind")
            XMLHttpRequest = function () {
                try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
                    catch (e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
                    catch (e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP"); }
                    catch (e) {}
                return false;
            }
        return new XMLHttpRequest();
    },

    // UUID生成随机身份
    getUuid: function() {
        let d = Date.now()
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
    }
}



















/*------ 华丽分割线 ------*/

//注：兼容ie,当标签上class名为多个时，该方法无法获取，请使用id
function getByClass(clsName,parent) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(clsName);
    }

    var oParent = parent ? document.getElementById(parent) : document,
        eles = [],
        tags = oParent.getElementsByTagName('*');
              
    for (var i = 0, len = tags.length; i < len; i++) {
        if (tags[i].className == clsName) {
            eles.push(tags[i]);
        }
    }
        
    return eles;
}
