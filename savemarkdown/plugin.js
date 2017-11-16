/**
 * By SMRSAN
 * Github Repo:
 * https://github.com/smrsan76/ckeditor-save-markdown
 */

/**
 * @fileOverview The Save-Markdown plugin.
 */

( function() {
	var saveCmd = {
		readOnly: 1,
		modes: { wysiwyg: 1,source: 1 },

		exec: function( editor ) {
			if ( editor.fire( 'save' ) ) {
				var $form = editor.element.$.form;
				var $$form = $( $form );
                var rootPath = this.path;
                var htmlData = editor.getData(1).replace(/(\r\n|\n|\r)/gm,""); // remove all linebreaks to prevent some parsing issues

				// Copy the current form and insert it after it's original
                var $sendForm = $$form.clone(); // The Copied Form
                var $sendTextArea = $sendForm.children("textarea#" + editor.name); // The Copied TextArea
                $sendTextArea.html(""); // Make It Empty
                $$form.after( $sendForm ); // Add The Copied Form and It's Content After The Original Form

                convertToMarkdown(htmlData)
					.then(function(markdownData){
						if( $sendForm ){
                            $sendTextArea.html(markdownData); // Set MarkdownData for Copied TextArea
							// Submit The Copied Form
                            try {
                                $sendForm[0].submit();
                            } catch ( e ) {
                                // If there's a button named "submit" then the form.submit
                                // function is masked and can't be called in IE/FF, so we
                                // call the click() method of that button.
                                if ( $sendForm[0].submit.click )
                                    $sendForm[0].submit.click();
                            }
						}
					})
					.finally(function(){ $sendForm.remove() });

                /*
                 *  HTML to MARKDOWN converter
                 *  @param (htmlData) It's a string
                 *	@return A promise that resolves with a passed markdownData argument
                 */
				function convertToMarkdown(htmlData){
                	return new Promise(function(resolve){
                        // Convert htmlData to Markdown.
                        if (typeof(toMarkdown) === 'undefined') {
                            CKEDITOR.scriptLoader.load(rootPath + 'js/to-markdown.js', function() {
                            	resolve(toMarkdown(htmlData));
                            });
                        } else {
                        	resolve(toMarkdown(toMarkdown(htmlData)));
                        }
					});
				}// END convertToMarkdown()

			}
		}
	};

	var pluginName = 'saveMarkdown';

	// Register a plugin named "save".
	CKEDITOR.plugins.add( pluginName, {
		// jscs:disable maximumLineLength
		lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
		// jscs:enable maximumLineLength
		icons: 'save', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		init: function( editor ) {
			// Save plugin is for replace mode only.
			if ( editor.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE )
				return;

			var command = editor.addCommand( pluginName, saveCmd );
			command.startDisabled = !( editor.element.$.form );

			editor.ui.addButton && editor.ui.addButton( 'Save Markdown', {
				label: editor.lang.saveMarkdown.toolbar,
				command: pluginName,
				toolbar: 'document,10'
			} );
		}
	} );

} )();

/**
 * Fired when the user clicks the Save button on the editor toolbar.
 * This event allows to overwrite the default Save button behavior.
 *
 * @since 4.7.3
 * @event save
 * @member CKEDITOR.editor
 * @param {CKEDITOR.editor} editor This editor instance.
 */
