//alert('Loaded...');

function debugUpdateRow($row, data) {
    var format = {}

    var cells = $row.children();
    var property = Object.keys(data)[0];
    var value = Object.values(data)[0];

    switch(property) {
        case 'archived': cells[5].innerHTML = value; break;
        case 'removed': cells[6].innerHTML = value; break;
    }
}

var quillOptions = {
    formats: ['bold', 'italic', 'strike', 'underline'],
    modules: {
        toolbar: '#toolbar'
    },
    scrollingContainer: 'true', 
    placeholder: 'Compose your journal...',
    theme: 'bubble'
};

$(document).ready(() => {
    /* Quill Editor */
    var quill = new Quill('#editor', quillOptions);

    /* Animate Journal Container */
    $('.journal-container').animate({opacity: 1});

    /* Stagger animate journal entries */
    $('.entry-row--wrapper').each(function (i) {
        var $row = $(this);

        setTimeout(function() {
            $row.animate({opacity: 1});
        }, 40 * i);
    });

    /* Debug Panel - AJAX */
    $('.debug-panel').each(function() {
        var row = $(this).closest('tr');
        var id = $(this).data('id');

        $("[class^='debug-button']", this).click(function(e) {
            var action = $(this).data('action');

            $.ajax({
                url: window.location.pathname,
                type: 'post',
                data: { id: id, action: action },
                success: function() {
                    console.log(
                    `
                    |- AJAX Request -|
                    |  method: ${this.type.toUpperCase()}
                    |  url:    ${this.url}
                    |  data:   ${this.data}
                    `.replace(/^ +/gm, "")
                    );
                }
            }).done(function(data) {
                console.log(
                `
                |- AJAX Response -|
                |  data: ${JSON.stringify(data)}
                `.replace(/^ +/gm, "")
                );

                debugUpdateRow(row, data);
            });
        });
    });

    /*
    $('.debug-panel').click(function(e){
        $.ajax({
            url: '/journal/',
            type: 'post',
            data: { id: 1, action: 'remove' },
            success: function() {
                alert('Success!');
            }
        });
    });
    */
});