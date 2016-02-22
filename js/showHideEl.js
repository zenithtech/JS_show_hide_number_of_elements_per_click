var showhide = Object.create(null);

showhide.showEl = function(a, b, c) {
    /**
     * Shows {c} elements at a time then run scrolltobuttons
     * {a} {String} ID of parent HTML element
     * {b} {String} Class/Tag of child HTML elements
     * {c} {Number} How many hidden elements of {b} to show at a time.
     * 
     * @param  {String} {String} {Number}
     * @return nothing
     * @method showEl
     */
    var t = this,
        el = '#' + a,
        hidden = el + ' ' + b + ':hidden',
        roundup = c;

    jQuery(el).find('a.more').css('display', 'none');

    if (jQuery(hidden).length !== 0) {
        jQuery(el).find('div.spinner').css('display', 'block');
    }

    jQuery(jQuery(hidden).slice(0, roundup)).each(function() {
        jQuery(this).css('display', 'block');
        jQuery(this).addClass('visible');
    });
    t.checkEl(a, b);
    t.scrolltobuttons(a);
};

showhide.hideEl = function(a, b, c) {
    /**
     * Hides {c} elements at a time then run scrolltobuttons
     * {a} {String} ID of parent HTML element
     * {b} {String} Class/Tag of child HTML elements
     * {c} {Number} How many visible elements of {b} to hide at a time.
     * 
     * @param  {String} {String} {Number}
     * @return nothing
     * @method hideEl
     */
    var t = this,
        el = '#' + a,
        visible = el + ' ' + b + ':visible',
        roundup = -c;

    jQuery(el).find('a.more').css('display', 'none');

    jQuery(jQuery(visible).slice(roundup)).each(function() {
        jQuery(this).css('display', 'none');
        jQuery(this).removeClass('visible');
    });
    t.checkEl(a, b);
    t.scrolltobuttons(a);
};

showhide.checkEl = function(a, b) {
    /**
     * Check elements and handle the visibility of show/hide buttons
     * {a} {String} ID of parent HTML element
     * {b} {String} Class of child HTML elements
     * 
     * @param  {String} {String}
     * @return nothing
     * @method checkEl
     */
    var el = '#' + a;
    if (jQuery(el + ' ' + b + ':hidden').length === 0) {
        jQuery(el + ' .show').css('display', 'none');
        jQuery(el + ' .hide').css('display', 'table-cell');
    }
    if (jQuery(el + ' ' + b + ':hidden').length !== 0) {
        jQuery(el + ' .show').css('display', 'table-cell');
    }
    if (jQuery(el + ' ' + b + ':visible').length <= 1) {
        jQuery(el + ' .hide').css('display', 'none');
    }
    if (jQuery(el + ' ' + b + ':visible').length > 0) {
        jQuery(el + ' .hide').css('display', 'table-cell');
    }
};

showhide.initEl = function(a, b, c) {
    /**
     * Initiates how many visible elements to start with then runs checkEl
     * {a} {String} ID of parent HTML element
     * {b} {String} Class of child HTML elements
     * {c} {Number} How many elements of {b} to show on load.
     * 
     * @param  {String} {String}
     * @return nothing
     * @method initEl
     */
    jQuery('#' + a + ' ' + b).css('display', 'none');
    jQuery('#' + a + ' ' + b + ':hidden').slice(0, c).each(function() {
        jQuery(this).css('display', 'block');
        jQuery(this).addClass('visible');
    });
    this.checkEl(a, b);
};

showhide.scrolltobuttons = function(a) {
    /**
     * Scrolls window to position the show/hide buttons at the bottom of the window
     * {a} {String} ID of parent HTML element containing the show/hide buttons
     * 
     * @param  {String}
     * @return nothing
     * @method scrolltobuttons
     */
    var e = jQuery(window).height(),
        w = jQuery('#' + a + ' .buttons').height(),
        f = jQuery('#' + a + ' .buttons').offset().top;
    jQuery('html, body').animate({
        scrollTop: f - e + w
    }, 200);
};
