$(document).ready(function () {
    $(document).on('click', '.create-product-button', function () {

        $.getJSON("http://localhost/develop/API/category/read.php",function (data) {
            var category_html = "" +
                "<select name='category_id' class='form-control'>";
            $.each(data.records, function (key, val) {
                category_html +="<option value="+ val.id +">"+val.name +"</option>";
            });
            category_html +="</select>";

            var create_product_html = 'hello Nigeria' +
                '<div id="read-products" class="btn btn-success pull-right read-product-button">' +
                '<span class="glyphicon glyphicon-plus"></span> Read Product' +
                '</div>';

            create_product_html += '<form id="create-product-form" action="#" method="post">' +
                '<table class="table table-bordered">' +
                '<tr><td>Name </td><td><input type="text" name="name" class="form-control" required></td></tr>' +
                '<tr><td>Price</td><td><input type="text" name="price" class="form-control" required></td></tr>' +
                '<tr><td>Description</td><td><input type="text" name="description" class="form-control" required></td></tr>' +
                '<tr><td>Category</td><td>'+category_html+ '</td></tr>' +
                '<tr><td></td><td><input type="submit" value="Create" class="btn btn-success"> </td></tr>' +
                '</table>' +
                '</form>';
            $("#page-content").html(create_product_html);
            changePageTitle("Create Product");
            $(document).on('submit','#create-product-form',function () {
                var form_data = JSON.stringify($(this).serializeObject());
                console.log(form_data);
                /* var form_data = $("#create-product-form").serialize();
                 console.log(form_data);
                 var formData = $("#create-product-form").serializeObject();
                 console.log(formData);
                 var data = JSON.stringify($("#create-product-form").serializeArray());
                 console.log( data );
                 */
                $.ajax({
                    url : "http://localhost/develop/API/product/create.php",
                    type : "POST",
                    contentType :"application/json",
                    data :form_data,
                    success : function (result) {
                        if (result){
                            alert("data enter")
                        }
                        showProduct();
                    },
                    error : function (xhr,resp,text) {
                        console.log(xhr,resp,text);
                    }
                });
                return false;
            });
        });
    });
});
