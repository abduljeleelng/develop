$(document).ready(function () {
    $(document).on('click','.update-product-button',function () {
        var id = $(this).attr('data-id');

        $.getJSON('http://localhost/develop/API/product/read_one.php?id='+id,function (data) {
            var product_id = data.id;
            var name = data.name;
            var price= data.price;
            var description = data.description;
            var category_id = data.category_id;
            var category_name = data.category_name;

            var update_product_html ='' +
                '<div id="read-product" class="btn btn-primary read-product-button pull-right">' +
                '<span class="glyphicon glyphicon-plus"></span> Read Product' +
                '</div>';

            $.getJSON('http://localhost/develop/API/category/read.php',function (data) {
              var  category_html = '<select class="form-control" name="category_id">';
               $.each(data.records, function(key, val){
                   if (val.id==category_id){
                       category_html+='<option selected value='+category_id+'>'+category_name+'</option>';
                   }
                   else {category_html += '<option value='+val.id+'>'+val.name+'</option>';}
               });
               category_html += '</select>';
               update_product_html +='<form id="update-product-form" action="#" method="POST" >' +
                   '<table class="table table-bordered">' +
                   '<tr><td><input type="hidden" name="id" value='+id+'></td></tr>' +
                   '<tr><td>Name</td><td><input type="text" class="form-control" name="name" value='+name+'></td></tr>' +
                   '<tr><td>Price</td><td><input type="text" class="form-control" name="price" value='+price+'></td></tr>' +
                   '<tr><td>Description</td><td><input type="text" class="form-control" name="description" value='+description+'></td></tr>' +
                   '<tr><td>Category</td><td>'+category_html+'</td></tr>' +
                   '<tr><td></td><td><input type="submit" class="btn btn-primary" value="Update"></td></tr>' +
                   '</table>' +
                   '</form>';
                $("#page-content").html(update_product_html);
                changePageTitle("Update product");
                $(document).on('submit',"#update-product-form",function () {
                    var form_data = JSON.stringify($(this).serializeObject());
                    //console.log(form_data);
                   // var data = JSON.stringify($("#update-product-form").serializeArray());
                   //console.log( data );
                    $.ajax({
                        url:"http://localhost/develop/API/product/update.php",
                        type:"POST",
                        contentType :"application/json",
                        //contentType:'text',
                        data:form_data,
                        //data:{"id":"149","name":"love","price":"7737373","description":"dhhhdh","category_id":"6"},
                        success:function (result) {
                            console.log(result);
                            if (result){
                                alert("product successful update");
                            }
                            showProduct();
                        },
                        error:function (xhr,resp,text) {
                            alert("unable to update product");
                            console.log(xhr,resp,text);
                           showProduct();
                        }
                    });
                    return false;
                });
            });
        });

    });
});