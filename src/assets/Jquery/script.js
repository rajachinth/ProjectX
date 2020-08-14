$(document).ready(function() {

    $('#NewBtn').click(function(){
        if($('#NewBtn').hasClass('btn-secondary'))
        {
            $('#NewBtn').removeClass('btn-secondary');
            $('#NewBtn').addClass('btn-primary');
        }
        $('#EditBtn').addClass('btn-secondary');
        $('#EditBtn').removeClass('btn-primary');
    });

    $('#EditBtn').click(function(){
        if($('#EditBtn').hasClass('btn-secondary'))
        {
            $('#EditBtn').addClass('btn-primary');
            $('#EditBtn').removeClass('btn-secondary');
        }
        $('#NewBtn').removeClass('btn-primary');
        $('#NewBtn').addClass('btn-secondary');
    })
});