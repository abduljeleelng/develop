$(document).ready(function () {
    $(document).on('click','.read-one-product-button',function () {
        var id = $(this).attr('data-id');
        $.getJSON('http://localhost/develop/API/product/read_one.php?id='+id,function (data) {
            var read_one_html = '' +
                '<div id="read-product" class="btn btn-danger read-product-button pull-right">' +
                '<span class="glyphicon glyphicon-plus"></span> Read Product' +
                '</div>';
            read_one_html += '<table class="table table-bordered">' +
                '<tr><td> Name</td><td>' + data.name +'</td></tr>' +
                '<tr><td>Price</td><td>'+ data.price +'</td></tr>' +
                '<tr><td>Description</td><td>'+ data.description +'</td></tr>' +
                '<tr><td>Category </td><td>'+data.category_name +'</td></tr>' +
                '</table>';

            $("#page-content").html(read_one_html);
            changePageTitle("Read one Product");
        });
    })
});