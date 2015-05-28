# Animated-Placeholder
HTML5 Animated placeholder

##Requirements
jQuery 1.7 or higher

##Usage:

###Html:
```html
<div>
  <input type="text" name="name" placeholder="Your name">
</div>
<div>
  <input type="password" name="password" placeholder="Password">
</div>
<div>
  <select name="country" placeholder="Country" style="width:300px;">
    <option value=""></option>
    <option value="BR">Brazil</option>
    <option value="US">United States</option>
  </select>
</div>
<div>
  <textarea rows="5" cols="50" name="message" placeholder="Your message"></textarea>
</div>
```

###Css:
```css
/* normal state placeholder */
label.animatedplaceholder {
  font:700 16px/18px Helvetica, arial, tahoma, sans-serif;
  color:#666666;
  text-transform:uppercase;
  cursor:text;
}
/* focus state placeholder */
label.animatedplaceholder.placeholder-focus {
  font-size:14px;
  color:#333;
}
```

###Javascript:
```html
<!-- jQuery 1.7 or higher -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>

<!-- Animated Placeholder -->
<script src="js/animated-placeholder.min.js"></script>
```
```javascript
<script>
  $(document).ready(function()
  {
    // Starts placeholder
    $('[placeholder]').animatedplaceholder();
  });
</script>
```

##General Config:

```javascript
<script>
  $(document).ready(function()
  {
    // Starts placeholder
    $('[placeholder]').animatedplaceholder({
      // Plugin default config
			'placeholder_attr' : 'placeholder', // attribute with the name for the label
			'label_class'      : 'animatedplaceholder', // label class
			'label_class_focus': 'placeholder-focus', // label class on focus
			'label_top'        : '16px', // TOP starting position of the label
			'label_left'       : '17px', // LEFT starting position of the label
			'label_focus_top'  : '3px', // TOP focus position of the label
			'label_focus_left' : '17px' // LEFT focus position of the label
    });
  });
</script>
```

##Individual Config:

```html
<div>
  <input type="text" name="name" placeholder="Your name" data-placeholder-top="16px" data-placeholder-left="17px" data-placeholder-focus-top="3px" data-placeholder-focus-left="17px">
</div>
```

## Browser Support
IE 8+, Chrome 4.0+, Firefox 16.0+, Opera 15.0+, Safari 4.0+, Ios 6+, Android 2.3+, Windows Phone 7+


