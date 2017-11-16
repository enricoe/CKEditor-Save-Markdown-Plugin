# CKEditor-Save-Markdown-Plugin
A ckeditor plugin that allows you to save
the content of your editor in markdown syntax.

## Get Started
It needs [ckeditor standard version](http://download.cksource.com/CKEditor/CKEditor/CKEditor%204.4.7/ckeditor_4.4.7_standard.zip)

## Usage
1. Download the source, and decompress `savemarkdown` folder into `ckeditor/plugins` path; 
2. Edit `config.js` (such as `ckeditor/config.js`):
```javascript
	config.extraPlugins = 'savemarkdown'; // add this plugin
```

### `config.js` example:
```javascript
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar arrangement, optimized for determining the order of toolbar buttons.
	config.toolbar = [
	        //Some Toolbar Objects ...
	        '/',
                {
                  name: 'document',
                  items: [
                    'Source',
                    '-',
                    'Save',
                    '-',
                    'SaveMarkdown', //The Button Position of SaveMarkdown Plugin
                    '-',
                    'Print'
                  ]
                },
                '/',
	        //Some Toolbar Objects ...
        ];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	config.extraPlugins = 'savemarkdown';  // this is the point!

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
```


### Enjoy it!
```
||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||/                                          \|||||
|||||    ||||||||||||||||||||||||||||||||||||    |||||
|||||    |||||              ||         \|||||    |||||
|||||    |||||              ||   ||||\   ||||    |||||
|||||    |||||    |\  /|    ||   |||||   ||||    |||||
|||||    |||||    ||||||    ||   ||||/   ||||    |||||
|||||    |||||    ||||||    ||         /|||||    |||||
|||||    ||||||||||||||||||||||||||||||||||||    |||||
|||||                                            |||||
|||||                                            |||||
|||||      |||||||||||||||||||||||||||||||       |||||
|||||      |||||        ||||||||||||||||||       |||||
|||||      |||||        ||||||||||||||||||       |||||
|||||      |||||        ||||||||||||||||||       |||||
|||||\     |||||        ||||||||||||||||||       |||||
|||||||\   |||||        ||||||||||||||||||      /|||||
|||||||||\                                     /||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||
```