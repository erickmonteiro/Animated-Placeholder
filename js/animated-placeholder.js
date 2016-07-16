/*
 * Animated placeholder 1.0
 *
 * Licensed under the Apache License 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * https://github.com/erickmonteiro/Animated-Placeholder
 *
 * Author: Erick Monteiro [http://www.erickmonteiro.com.br]
 */

// check 3d transform support, thanks https://gist.github.com/lorenzopolidori/3794226
function has3dTransform()
{
	var el         = document.createElement('p'),
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
			has3d       = window.getComputedStyle(el).getPropertyValue(transforms[t]);
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
			'label_top'        : '12px',
			'label_left'       : '14px',
			'label_focus_top'  : '0px',
			'label_focus_left' : '14px',
			'label_focus_size' : 0.7
		};

		if( settings )
		{
			$.extend(config, settings);
		}

		// animate label position css3 or top/left
		var animated = function(label, action, top, left, size)
		{
			// if support css3
			if( animatePlaceholderCssAnim )
			{
				label[0].style.cssText += '-webkit-transition:all 0.2s ease-in-out; transition:all 0.2s ease-in-out; -webkit-transform-origin:left top; -ms-transform-origin:left top; transform-origin:left top; -webkit-transform:translate3d(' + left + ',' + top + ',0) scale(' + size + '); -ms-transform:translateX(' + left + ') translateY(' + top + ') scale(' + size + '); transform:translate3d(' + left + ',' + top + ',0) scale(' + size + ');'
			}
			else
			{
				// if initial position
				if( action == 'initial' || action == 'initial.active' )
				{
					label.css({fontSize: size, top: top, left: left});
				}
				else
				{
					label.animate({fontSize: size, top: top, left: left}, 200);
				}
			}
		};

		return this.each(function()
		{
			// get obj
			var obj = $(this);

			// Check if disabled
			var disabled = obj.attr('data-placeholder-disabled');

			if( typeof disabled !== typeof undefined && disabled !== false )
			{
				return;
			}

			// get obj placeholder
			var placeholderText = obj.attr(config.placeholder_attr);

			// get parent obj
			var parent = obj.parent();

			// check if parent is label tag
			var parent_is_label = parent.prop('tagName') == 'LABEL';

			// remove placeholder input
			obj.removeAttr(config.placeholder_attr);

			// father's position can not be static or empty
			if( parent.css('position') == '' || parent.css('position') == 'static' )
			{
				parent.css('position', 'relative');
			}

			// defini label position
			var label_top        = ( obj.attr('data-placeholder-top') !== undefined ) ? obj.attr('data-placeholder-top') : config.label_top;
			var label_left       = ( obj.attr('data-placeholder-left') !== undefined ) ? obj.attr('data-placeholder-left') : config.label_left;
			var label_focus_top  = ( obj.attr('data-placeholder-focus-top') !== undefined ) ? obj.attr('data-placeholder-focus-top') : config.label_focus_top;
			var label_focus_left = ( obj.attr('data-placeholder-focus-left') !== undefined ) ? obj.attr('data-placeholder-focus-left') : config.label_focus_left;
			var label_focus_size = ( obj.attr('data-placeholder-focus-size') !== undefined ) ? obj.attr('data-placeholder-focus-size') : config.label_focus_size;
			var label_size       = 1;

			// create the label
			var label = $('<' + (parent_is_label ? 'div' : 'label') + ' class="' + config.label_class + '" style="position:absolute;top:0;left:0;pointer-events:none;-ms-touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">' + placeholderText + '</' + (parent_is_label ? 'div' : 'label') + '>');

			// insert the label before the field
			obj.before(label);

			// if don't support css3
			if( !animatePlaceholderCssAnim )
			{
				label_size       = parseInt(label.css('font-size'));
				label_focus_size = parseInt(label_size * label_focus_size);
			}

			// if value exist
			if( obj.val() )
			{
				// label add class focus
				label.addClass(config.label_class_focus);

				// label position
				animated(label, 'initial.active', label_focus_top, label_focus_left, label_focus_size);
			}
			else
			{
				// label position
				animated(label, 'initial', label_top, label_left, label_size);
			}

			// if parent not is label
			if( !parent_is_label )
			{
				// onclick label, only IE 10-
				label.click(function(e)
				{
					obj.focus();
				});
			}

			// input focus and blur
			obj.on("focus blur change", function(e)
			{
				// Executes with delay, so if you have any masking plug the obj.val () will return "" if it is not filled in the same mask
				setTimeout(function()
				{
					if( e.type == 'focus' || obj.val() )
					{
						// label add class focus
						label.addClass(config.label_class_focus);

						// label position
						animated(label, 'focus', label_focus_top, label_focus_left, label_focus_size);
					}
					else
					{
						// label remove class focus
						label.removeClass(config.label_class_focus);

						// label position
						animated(label, 'blur', label_top, label_left, label_size);
					}
				}, 10);
			});

		});
	};

})(jQuery);