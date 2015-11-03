# Animated-Placeholder
Animated HTML5 placeholder uses CSS3 animation in supported browsers and supports the jquery animation for older browsers.

Here's an example of how the plugin works in:
[https://youtu.be/jVD7vFT16IY](https://youtu.be/jVD7vFT16IY) 

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
.animatedplaceholder {
  font:700 16px/18px Helvetica, arial, tahoma, sans-serif;
  color:#666666;
  text-transform:uppercase;
  cursor:text;
}
/* focus state placeholder */
.animatedplaceholder.placeholder-focus {
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
			'placeholder_attr' : 'placeholder',
			'label_class'      : 'animatedplaceholder',
			'label_class_focus': 'placeholder-focus',
			'label_top'        : '12px',
			'label_left'       : '14px',
			'label_focus_top'  : '0px',
			'label_focus_left' : '14px',
			'label_focus_size' : 0.7
    });
  });
</script>
```

##Individual Config:

```html
<div>
  <input type="text" name="name" placeholder="Your name" data-placeholder-top="16px" data-placeholder-left="17px" data-placeholder-focus-top="3px" data-placeholder-focus-left="17px" data-placeholder-focus-size="0.7">
</div>
```

## Browser Support
IE 8+, Chrome 4.0+, Firefox 16.0+, Opera 15.0+, Safari 4.0+, Ios 6+, Android 2.3+, Windows Phone 7+


