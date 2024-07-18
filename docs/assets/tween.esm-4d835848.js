var v=Object.freeze({Linear:Object.freeze({None:function(t){return t},In:function(t){return this.None(t)},Out:function(t){return this.None(t)},InOut:function(t){return this.None(t)}}),Quadratic:Object.freeze({In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}}),Cubic:Object.freeze({In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}}),Quartic:Object.freeze({In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}}),Quintic:Object.freeze({In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}}),Sinusoidal:Object.freeze({In:function(t){return 1-Math.sin((1-t)*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}}),Exponential:Object.freeze({In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}}),Circular:Object.freeze({In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}}),Elastic:Object.freeze({In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(t){var e=1.70158;return t===1?1:t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return t===0?0:--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2)}}),Bounce:Object.freeze({In:function(t){return 1-v.Bounce.Out(1-t)},Out:function(t){return t<.36363636363636365?7.5625*t*t:t<.7272727272727273?7.5625*(t-=.5454545454545454)*t+.75:t<.9090909090909091?7.5625*(t-=.8181818181818182)*t+.9375:7.5625*(t-=.9545454545454546)*t+.984375},InOut:function(t){return t<.5?v.Bounce.In(t*2)*.5:v.Bounce.Out(t*2-1)*.5+.5}}),generatePow:function(t){return t===void 0&&(t=4),t=t<Number.EPSILON?Number.EPSILON:t,t=t>1e4?1e4:t,{In:function(e){return Math.pow(e,t)},Out:function(e){return 1-Math.pow(1-e,t)},InOut:function(e){return e<.5?Math.pow(e*2,t)/2:(1-Math.pow(2-e*2,t))/2+.5}}}}),p=function(){return performance.now()},P=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(i){return e._tweens[i]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},t.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},t.prototype.update=function(e,i){e===void 0&&(e=p()),i===void 0&&(i=!1);var r=Object.keys(this._tweens);if(r.length===0)return!1;for(;r.length>0;){this._tweensAddedDuringUpdate={};for(var n=0;n<r.length;n++){var h=this._tweens[r[n]],s=!i;h&&h.update(e,s)===!1&&!i&&delete this._tweens[r[n]]}r=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),c={Linear:function(t,e){var i=t.length-1,r=i*e,n=Math.floor(r),h=c.Utils.Linear;return e<0?h(t[0],t[1],r):e>1?h(t[i],t[i-1],i-r):h(t[n],t[n+1>i?i:n+1],r-n)},Bezier:function(t,e){for(var i=0,r=t.length-1,n=Math.pow,h=c.Utils.Bernstein,s=0;s<=r;s++)i+=n(1-e,r-s)*n(e,s)*t[s]*h(r,s);return i},CatmullRom:function(t,e){var i=t.length-1,r=i*e,n=Math.floor(r),h=c.Utils.CatmullRom;return t[0]===t[i]?(e<0&&(n=Math.floor(r=i*(1+e))),h(t[(n-1+i)%i],t[n],t[(n+1)%i],t[(n+2)%i],r-n)):e<0?t[0]-(h(t[0],t[0],t[1],t[1],-r)-t[0]):e>1?t[i]-(h(t[i],t[i],t[i-1],t[i-1],r-i)-t[i]):h(t[n?n-1:0],t[n],t[i<n+1?i:n+1],t[i<n+2?i:n+2],r-n)},Utils:{Linear:function(t,e,i){return(e-t)*i+t},Bernstein:function(t,e){var i=c.Utils.Factorial;return i(t)/i(e)/i(t-e)},Factorial:function(){var t=[1];return function(e){var i=1;if(t[e])return t[e];for(var r=e;r>1;r--)i*=r;return t[e]=i,i}}(),CatmullRom:function(t,e,i,r,n){var h=(i-t)*.5,s=(r-e)*.5,a=n*n,f=n*a;return(2*e-2*i+h+s)*f+(-3*e+3*i-2*h-s)*a+h*n+e}}},I=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),g=new P,T=function(){function t(e,i){i===void 0&&(i=g),this._object=e,this._group=i,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=v.Linear.None,this._interpolationFunction=c.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=I.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.to=function(e,i){if(i===void 0&&(i=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=i,this},t.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e,this},t.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},t.prototype.start=function(e,i){if(e===void 0&&(e=p()),i===void 0&&(i=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var r in this._valuesStartRepeat)this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||i){if(this._propertiesAreSetUp=!0,!this._isDynamic){var n={};for(var h in this._valuesEnd)n[h]=this._valuesEnd[h];this._valuesEnd=n}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,i)}return this},t.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},t.prototype._setupProperties=function(e,i,r,n,h){for(var s in r){var a=e[s],f=Array.isArray(a),_=f?"array":typeof a,l=!f&&Array.isArray(r[s]);if(!(_==="undefined"||_==="function")){if(l){var o=r[s];if(o.length===0)continue;for(var C=[a],y=0,w=o.length;y<w;y+=1){var S=this._handleRelativeValue(a,o[y]);if(isNaN(S)){l=!1,console.warn("Found invalid interpolation list. Skipping.");break}C.push(S)}l&&(r[s]=C)}if((_==="object"||f)&&a&&!l){i[s]=f?[]:{};var b=a;for(var d in b)i[s][d]=b[d];n[s]=f?[]:{};var o=r[s];if(!this._isDynamic){var O={};for(var d in o)O[d]=o[d];r[s]=o=O}this._setupProperties(b,i[s],o,n[s],h)}else(typeof i[s]>"u"||h)&&(i[s]=a),f||(i[s]*=1),l?n[s]=r[s].slice().reverse():n[s]=i[s]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(e){return e===void 0&&(e=p()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},t.prototype.resume=function(e){return e===void 0&&(e=p()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},t.prototype.stopChainedTweens=function(){for(var e=0,i=this._chainedTweens.length;e<i;e++)this._chainedTweens[e].stop();return this},t.prototype.group=function(e){return e===void 0&&(e=g),this._group=e,this},t.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},t.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},t.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},t.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},t.prototype.easing=function(e){return e===void 0&&(e=v.Linear.None),this._easingFunction=e,this},t.prototype.interpolation=function(e){return e===void 0&&(e=c.Linear),this._interpolationFunction=e,this},t.prototype.chain=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return this._chainedTweens=e,this},t.prototype.onStart=function(e){return this._onStartCallback=e,this},t.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},t.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},t.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},t.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},t.prototype.onStop=function(e){return this._onStopCallback=e,this},t.prototype.update=function(e,i){if(e===void 0&&(e=p()),i===void 0&&(i=!0),this._isPaused)return!0;var r,n,h=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>h)return!1;i&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0),n=(e-this._startTime)/this._duration,n=this._duration===0||n>1?1:n;var s=this._easingFunction(n);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,s),this._onUpdateCallback&&this._onUpdateCallback(this._object,n),n===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(r in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[r]=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(this._valuesEnd[r])),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var a=0,f=this._chainedTweens.length;a<f;a++)this._chainedTweens[a].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(e,i,r,n){for(var h in r)if(i[h]!==void 0){var s=i[h]||0,a=r[h],f=Array.isArray(e[h]),_=Array.isArray(a),l=!f&&_;l?e[h]=this._interpolationFunction(a,n):typeof a=="object"&&a?this._updateProperties(e[h],s,a,n):(a=this._handleRelativeValue(s,a),typeof a=="number"&&(e[h]=s+(a-s)*n))}},t.prototype._handleRelativeValue=function(e,i){return typeof i!="string"?i:i.charAt(0)==="+"||i.charAt(0)==="-"?e+parseFloat(i):parseFloat(i)},t.prototype._swapEndStartRepeatValues=function(e){var i=this._valuesStartRepeat[e],r=this._valuesEnd[e];typeof r=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(r):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=i},t}(),u=g;u.getAll.bind(u);u.removeAll.bind(u);u.add.bind(u);u.remove.bind(u);var M=u.update.bind(u);export{v as E,T,M as u};
