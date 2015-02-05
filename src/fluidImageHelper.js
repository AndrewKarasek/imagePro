// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "fluidImageHelper",
				defaults = {
				turbo: false,
		};

		function Plugin ( element, options ) {
				this.element = element;

				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {

						var loadingClass = pluginName+"-loading";
						var pluginElmClass = pluginName;
						var loadedClass = pluginName+"-loaded";
						var width = $(this.element).data("width");
						var height = $(this.element).data("height");
						var elm = this.element;

						if(width && height){

							var ratio = height / width;
							var nHeight = $(elm).width() * ratio;

							console.log("DIS:" + width + " " +height);

							$(elm)
								.addClass(loadingClass)
								.addClass(pluginElmClass);

							$(elm).css("height", nHeight);
							


							var func = function(){
								nHeight = $(elm).width() * ratio;
								$(elm).css("height", "");
							}

							if(this.settings.turbo){
								$(window).resize(func);
							}


							//elm loaded
							$(elm).load(function(){
								$(elm).removeClass(loadingClass);
								$(window).off("resize", func);
								$(elm).css("height", "");		
								$(elm).addClass(loadedClass);						
							});


						}
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
