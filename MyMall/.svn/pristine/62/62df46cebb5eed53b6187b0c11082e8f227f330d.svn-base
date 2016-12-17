jQuery(document).ready(function() {
	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active-question');
		jQuery('.accordion .accordion-section-content').slideUp("slow").removeClass('open');
	}

	jQuery('.accordion-section').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).find(".accordion-section-title").attr('href');

		if(jQuery(e.target).is('.active-question')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).find(".accordion-section-title").addClass('active-question');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown("slow").addClass('open'); 
		}

		e.preventDefault();
	});
});