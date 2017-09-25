var manual_moderation = manual_moderation || {};  //namespace if necessary...

(function ($) {
    "use strict";

    $(function () {
        initObservationTable();
        initExpandEventThumbnail();
    });

    function getCSRF() {
        var cookies = document.cookie.split(';');
        var i;
        for (i = 0; i < cookies.length; i++) {
            if (cookies[i].trim().startsWith('csrftoken=')) {
                return cookies[i].trim().split('=')[1];
            }
        }
    }

    function initObservationTable() {
        var $TABLE = $('#observation-table');
        var $BTN = $('#export-btn');
        var $EXPORT = $('#export');

        $('.table-add').click(function () {
          var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
          $TABLE.find('table').append($clone);
        });

        $('.table-remove').click(function () {
          $(this).parents('tr').detach();
        });

        $('.table-up').click(function () {
          var $row = $(this).parents('tr');
          if ($row.index() === 1) return; // Don't go above the header
          $row.prev().before($row.get(0));
        });

        $('.table-down').click(function () {
          var $row = $(this).parents('tr');
          $row.next().after($row.get(0));
        });

        // A few jQuery helpers for exporting only
        jQuery.fn.pop = [].pop;
        jQuery.fn.shift = [].shift;

        $BTN.click(function () {
          var $rows = $TABLE.find('tr:not(:hidden)');
          var headers = [];
          var data = [];

          // Get the headers (add special header logic here)
          $($rows.shift()).find('th:not(:empty)').each(function () {
            headers.push($(this).text().toLowerCase());
          });

          // Turn all existing rows into a loopable array
          $rows.each(function () {
            var $td = $(this).find('td');
            var h = {};

            // Use the headers from earlier to name our hash keys
            headers.forEach(function (header, i) {
              h[header] = $td.eq(i).text();
            });

            data.push(h);
          });

          // Output the result
          $EXPORT.text(JSON.stringify(data));
        });

    }

    function initExpandEventThumbnail() {
        var $modal = $('#full-image-modal');
        $('#observation-table .annotool-thumbnail').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $currentTarget = $(e.currentTarget);
            var url = $currentTarget.data('img-url');
            var $image = $currentTarget.find('.image-icon');
            var img_temp = '<img width="500" height="500" src=' + url + '>';
            $modal.find('.image-zoom').html(img_temp);
            $modal
                .find('.image-zoom')
                .attr('style', $image.attr('style'))
                .end()
                .modal('show');
        });

        $modal.find("div#closeImageModalId").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $modal.find('.image-zoom .zoom_image_extent').removeClass("close_image_modal");
            $modal.modal('hide');
        });
    }
})(jQuery);
