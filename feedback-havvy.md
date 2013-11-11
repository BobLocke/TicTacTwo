## Preamble

These were the most immediately obvious things that I saw. I've not yet
taken a hard look at app.js, but I'll probably have more to say about
express and everything once I've done so.

But first, I want a response to the feedback.

## Global Scripts Leak Global Names

In client side JavaScript, having a script not wrapped in a function leads to
having every variable (var statement) added to the window object, and should
another script do the same thing, and those two scripts share a variable name,
then one or both of your scripts will break in interesting and hard to track
ways.

As such, you should always wrap your script up in a function, either a
self-invoking function, or since you are using jQuery, passed to the jQuery
function.

### Immediately Invoked Function Expression

A self-invoking function is a function expression followed by a function call.

For example, the following statement makes the variable `five` equal to 5:

```javascript
var five = function () { return 5; }();
```

Due to the fact that if a statement begins with the token `function`, the
statement is a function declaration, you have to coerce the statement to
treat your function as an expression. This is most easily done by wrapping
your function in parenthesis. Thus, a common form is as follows:

```javascript
(function () { /* your code here */ })())
```

### jQuery Function

The jQuery function is polymorphic. Should it be passed a function, it will
call that function after the document has fired its loaded event, or
immediately if the loaded event has fired. Thus, you can also wrap your code
like this:

```javascript
$(function () { /* your code here */ });

### Considerations

Since your code is about manipulating the DOM, I highly recommend the jQuery
approach.

When you do want to put a value into the global scope, attach it to a property
on the window object. There was at least one place where this was necessary
after applying this transformation.

## Event Callbacks Registered via JavaScript, not HTML

The DOM (Document Object Model) has means for adding events to DOM elements.

It looks like this:

```javascript
document.getElementById("some-id").addEventListener('event-name', callback);

// Or with jQuery
$('#some-id').on('event-name', callback);
```

Instead of placing your listeners in HTML, you should do so with JavaScript.

### Considerations

This will remove the need for any globals added to your scope, or at least,
I presume so after a cursory look through your code.

Having JavaScript in your HTML files is a bad idea, and unnecessary.

## The package.json File

(Read this)[https://npmjs.org/doc/json.html]

I added myself to the contributors object. Each person in your project should
add hisself or herself to the maintainers list.

I also added your dependencies there. Now, when you clone the project, you
can get your dependent modules by just using `npm install`.

The package.json file is generally the first file I create/copy, other than
the readme and the license files.

## Minor Points

Consider these, but should you find it not worth you time, do not make these
changes.

### PNGs and JPGs

JPGs should be used for real life images, and real life images only.

Change x.jpg and o.jpg to PNGs.

### Templates

Your site is small enough that you don't need templates, but at the same time,
it's good to learn a templating language. I added some Jade files to match
your HTML files, both of which are in the templates directory.

I use template inheritance, which took a few minutes to find the documentation
for it, since they seem to be rewriting their documentation. As such, here's
the documentation for it:

https://github.com/visionmedia/jade/blob/master/jade-language.md

I've not written any code for connecting express's render with jade.

### HTML5

The Jade templates use the HTML5 doctype. The HTML version of it is:

```html
<!doctype html>
```

Any new HTML documents you create should use this doctype.

Furthermore, the character set meta tag has to be in the first 512 bytes, and
should always look like this:

```html
<meta charset="UTF-8">
```

The longer version still works, but browsers had to support the shorter version
because people were using the longer version incorrectly making there be the
charset property. This was then blessed into standard support with HTML5.

### License

I created a license file, but didn't put any content into it. Find a license,
and put it in that file.

## Name Changes

Images are now in /img/.

Scripts are now in /script/.

Stylesheets are now in /css/. `style.css` was renamed to `main.css`.

I've not yet gone through the HTML to make sure all references are correct.