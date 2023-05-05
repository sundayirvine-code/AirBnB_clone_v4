$(document).ready(function() {
    const amenitiesChecked = {}; // dictionary to store checked amenities
  
    $('input[type="checkbox"]').change(function() {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
      if ($(this).is(':checked')) {
        amenitiesChecked[amenityId] = amenityName;
      } else {
        delete amenitiesChecked[amenityId];
      }
      const amenitiesList = Object.values(amenitiesChecked).join(', ');
      if (amenitiesList.length > 0) {
        $('div.amenities > h4').text(amenitiesList);
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
  });
  