var showhide = Object.create({

    showEl: function(a, b, c) {
        /**
         * Shows {c} elements at a time then run scrollto
         * {a} {String} ID of parent HTML element
         * {b} {String} Class/Tag of child HTML elements
         * {c} {Number} How many hidden elements of {b} to show at a time.
         * 
         * @param  {String} {String} {Number}
         * @return nothing
         * @method showEl
         */
        var t = this,
            el = a,
            hidden = jQuery(el).find(b + ':hidden'),
            roundup = c;

        jQuery(el).find('a.show').css('display', 'none');
        jQuery(el).find('a.hide').css('display', 'none');

        if (jQuery(hidden).length !== 0) {
            jQuery(el).find('div.spinner').css('display', 'block');
        }

        jQuery(jQuery(hidden).slice(0, roundup)).each(function() {
            jQuery(this).css('display', 'block');
            jQuery(this).addClass('visible');
        });
        t.checkEl(a, b);
        t.scrollto(a);
    },

    hideEl: function(a, b, c) {
        /**
         * Hides {c} elements at a time then run scrollto
         * {a} {String} ID of parent HTML element
         * {b} {String} Class/Tag of child HTML elements
         * {c} {Number} How many visible elements of {b} to hide at a time.
         * 
         * @param  {String} {String} {Number}
         * @return nothing
         * @method hideEl
         */
        var t = this,
            el = a,
            visible = jQuery(el).find(b + ':visible'),
            roundup = -c;

        jQuery(el).find('a.show').css('display', 'none');
        jQuery(el).find('a.hide').css('display', 'none');

        jQuery(jQuery(visible).slice(roundup)).each(function() {
            jQuery(this).css('display', 'none');
            jQuery(this).removeClass('visible');
        });
        t.checkEl(a, b);
        t.scrollto(a);
    },

    checkEl: function(a, b) {
        /**
         * Check elements and handle the visibility of show/hide buttons
         * {a} {String} ID of parent HTML element
         * {b} {String} Class of child HTML elements
         * 
         * @param  {String} {String}
         * @return nothing
         * @method checkEl
         */
        var el = a;
        if (jQuery(el).find(b + ':hidden').length === 0) {
            jQuery(el).find('.show').css('display', 'none');
            jQuery(el).find('.hide').css('display', 'inline-block');
        }
        if (jQuery(el).find(b + ':hidden').length !== 0) {
            jQuery(el).find('.show').css('display', 'inline-block');
        }
        if (jQuery(el).find(b + ':visible').length <= 1) {
            jQuery(el).find('.hide').css('display', 'none');
        }
        if (jQuery(el).find(b + ':visible').length > 0) {
            jQuery(el).find('.hide').css('display', 'inline-block');
        }
    },

    initEl: function(a, b, c) {
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
        jQuery(a).find(b).css('display', 'none');
        jQuery(a).find(b + ':hidden').slice(0, c).each(function() {
            jQuery(this).css('display', 'block');
            jQuery(this).addClass('visible');
        });
        this.checkEl(a, b);
    },

    scrollto: function(a) {
        /**
         * Scrolls window to position the show/hide buttons at the bottom of the window
         * {a} {String} ID of parent HTML element containing the show/hide buttons
         * 
         * @param  {String}
         * @return nothing
         * @method scrollto
         */
        var e = jQuery(window).height(),
            w = jQuery(a).find('.buttons').height() + 20,
            f = jQuery(a).find('.buttons').offset().top;
        jQuery('html, body').animate({
            scrollTop: f - e + w
        }, 200);
    }
});
