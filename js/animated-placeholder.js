/*
 * Animated placeholder 1.0
 *
 * Licensed under the Apache License 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author: Erick Monteiro [http://www.erickmonteiro.com.br]
 */

// check 3d transform support, thanks https://gist.github.com/lorenzopolidori/3794226
function has3dTransform()
{
	var el = document.createElement('p'),
		has3d,
		transforms = {
			'webkitTransform': '-webkit-transform',
			'msTransform'    : '-ms-transform',
			'MozTransform'   : '-moz-transform',
			'transform'      : 'transform'
		};

	// Add it to the body to get the computed style
	document.body.insertBefore(el, null);

	for( var t in transforms )
	{
		if( el.style[t] !== undefined )
		{
			el.style[t] = 'translate3d(1px,1px,1px)';
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}

	document.body.removeChild(el);

	return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

var animatePlaceholderCssAnim = has3dTransform();

(function($)
{

	$.fn.animatedplaceholder = function(settings)
	{
		// default config
		var config = {
			'placeholder_attr' : 'placeholder',
			'label_class'      : 'animatedplaceholder',
			'label_class_focus': 'placeholder-focus',
			'label_top'        : '8px',
			'label_left'       : '9px',
			'label_focus_top'  : '1px',
			'label_focus_left' : '9px'
		};

		if( settings )
		{
			$.extend(config, settings);
		}

		// animate label position css3 or top/left
		var animated = function(label, action, top, left)
		{
			// if support css3
			if( animatePlaceholderCssAnim )
			{
				label[0].style.cssText += '-webkit-transition:all 0.2s ease-in-out; -ms-transition:all 0.2s ease-in-out; transition:all 0.2s ease-in-out; -webkit-transform:translate3d(' + left + ',' + top + ',0); -ms-transform:translate3d(' + left + ',' + top + ',0); transform:translate3d(' + left + ',' + top + ',0);'
			}
			else
			{
				// if initial position
				if( action == 'initial' )
				{
					label.css({top: top, left: left});
				}
				else
				{
					label.animate({top: top, left: left}, 200);
				}
			}
		};

		return this.each(function()
		{
			// get obj
			var obj = $(this);

			// get obj placeholder
			var placeholderText = obj.attr(config.placeholder_attr);

			// get parent obj
			var parent = obj.parent();

			// remove placeholder input
			obj.removeAttr(config.placeholder_attr);

			// father's position can not be static or empty
			if( parent.css('position') == '' || parent.css('position') == 'static' )
			{
				parent.css('position', 'relative');
			}

			// defini label position
			var label_top = ( obj.attr('data-placeholder-top') !== undefined ) ? obj.attr('data-placeholder-top') : config.label_top;
			var label_left = ( obj.attr('data-placeholder-left') !== undefined ) ? obj.attr('data-placeholder-left') : config.label_left;
			var label_focus_top = ( obj.attr('data-placeholder-focus-top') !== undefined ) ? obj.attr('data-placeholder-focus-top') : config.label_focus_top;
			var label_focus_left = ( obj.attr('data-placeholder-focus-left') !== undefined ) ? obj.attr('data-placeholder-focus-left') : config.label_focus_left;

			// create the label
			var label = $('<label class="' + config.label_class + '" style="position:absolute;-ms-touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">' + placeholderText + '</label>');

			// insert the label after the field
			obj.before(label);

			// if value exist
			if( obj.val() )
			{
				// label add class focus
				label.addClass(config.label_class_focus);

				// label position
				animated(label, 'initial', label_focus_top, label_focus_left);
			}
			else
			{
				// label position
				animated(label, 'initial', label_top, label_left);
			}

			label.click(function(e)
			{
				obj.focus();
			});

			// input focus and blur
			obj.on("focus blur change", function(e)
			{
				if( e.type == 'focus' || obj.val() )
				{
					// label add class focus
					label.addClass(config.label_class_focus);

					// label position
					animated(label, 'focus', label_focus_top, label_focus_left);
				}
				else
				{
					// label remove class focus
					label.removeClass(config.label_class_focus);

					// label position
					animated(label, 'blur', label_top, label_left);
				}
			});

		});
	};

})(jQuery);