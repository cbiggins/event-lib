    /**
     * Copyright 2009 Michael Little, Christian Biggins
     *
     * This program is free software: you can redistribute it and/or modify
     * it under the terms of the GNU General Public License as published by
     * the Free Software Foundation, either version 3 of the License, or
     * (at your option) any later version.
     *
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
     * GNU General Public License for more details.
     *
     * You should have received a copy of the GNU General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     */

    /**
     * FLQ.event - Fliquid event handling library
     *
     * Version: 1.1.0 BETA
     * Last Modified: 24/05/2009
     */

    if (typeof FLQ == 'undefined') var FLQ = new Object()

    FLQ.event = new Object()

    FLQ.event.f = {}

    /**
     * addListener() will add a listener to an element for a given event
     */
    FLQ.event.addListener = function(ele, event, fRef, cap) {
        if (typeof ele == 'string') {
            ele = document.getElementById(ele)
        }
        if (typeof ele.addEventListener != 'undefined') {
            ele.addEventListener(event, fRef, cap)
        } else if (typeof ele.attachEvent != 'undefined') {
            ele.attachEvent('on' + event, FLQ.event.getFunc(ele, event, fRef))
        }
    }

    FLQ.event.add = FLQ.event.addListener

    /**
     * getXY() will return an array of the X and Y coord's of the event
     */
    FLQ.event.getXY = function(e) {
        if (typeof e == 'undefined') {
            e = window.event
        }
        var xy = [e.screenX, e.screenY]
        return xy
    }

    /**
     * removeListener() will remove a listener from an element for a given event
     */
    FLQ.event.removeListener = function(ele, event, fRef, capture) {
        if (typeof ele == 'string') {
            ele = document.getElementById(ele)
        }
        if (typeof ele.removeEventListener != 'undefined') {
            ele.removeEventListener(event, fRef, capture)
        } else if (typeof ele.detachEvent != 'undefinded') {
            var f = FLQ.event.getFunc(ele, event, fRef)
            ele.detachEvent('on' + event, f)
            delete f
        }
    }

    FLQ.event.getFunc = function (ele, event, fRef) {
        if (typeof FLQ.event.f[event] == 'undefined') FLQ.event.f[event] = {}
        if (typeof FLQ.event.f[event][ele] == 'undefined') FLQ.event.f[event][ele] = {}
        if (typeof FLQ.event.f[event][ele][fRef] == 'undefined') FLQ.event.f[event][ele][fRef] = {}
        FLQ.event.f[event][ele][fRef] = function (e) { if (!e) e = window.event; fRef.apply(ele, [e]) }
        return FLQ.event.f[event][ele][fRef];
    }

    /**
     * getTarget returns the target element of the event.
     */
    FLQ.event.getTarget = function(e) {
        if (typeof e.target != 'undefined') {
            return e.target
        } else if (typeof e.srcElement != 'undefined') {
            return e.srcElement
        }
    }

    /**
     * stopProp will stop the event from propagating or bubbling.
     */
    FLQ.event.stopProp = function(e) {
        if (typeof e.stopPropagation != 'undefined') {
            e.stopPropagation()
        } else if (typeof e.cancelBubble != 'undefined') {
            e.cancelBubble = true
        }
    }

    /**
     * prevDef will prevent the default event action from occuring (preventDefault)
     */
    FLQ.event.prevDef = function(e) {
        if (typeof e.preventDefault != 'undefined') {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
    }

    /**
     * stopEvent is a wrapper for stopProp and prevDef methods
     */
    FLQ.event.stopEvent = function (e) {
        FLQ.event.stopProp(e)
        FLQ.event.prevDef(e)
    }
