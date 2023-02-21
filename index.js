var name_count = 0;
var price_count = 0;
var image_count = 0;
var description_count = 0;
function nameValidation() {
    let pname = document.getElementById('productName').value;
    let rules = /^[A-Za-z\s]*$/;
    if (pname.length > 0) {
        if (pname.length > 10) {
            document.getElementById('productNameWarning').innerHTML = "Product name should be in between 0-10";
            document.getElementById('submit').disabled = true;
            name_count = 0;
        }
        else if (!pname.match(rules)) {
            document.getElementById('productNameWarning').innerHTML = "Product name should only be alphabet";
            document.getElementById('submit').disabled = true;
            name_count = 0;
        }
        else {
            document.getElementById('productNameWarning').innerHTML = "";
            document.getElementById('submit').disabled = false;
            name_count = 1;
        }
    }
    else {
        document.getElementById('productNameWarning').innerHTML = "Prdouct name should not be empty";
        document.getElementById('submit').disabled = true;
        name_count = 0;

    }
}
function priceValidation() {
    let pricetag = document.getElementById('price').value;
    let rules = /^[0-9].*$/;
    if (pricetag.length > 0) {
        if (pricetag.charAt(0) == 0) {
            document.getElementById('priceWarning').innerHTML = "Price doesn't start with zero";
            document.getElementById('submit').disabled = true;
            price_count = 0;
        }
        else if (!pricetag.match(rules) || isNaN(pricetag)) {
            document.getElementById('priceWarning').innerHTML = "Price should only be a valid number";
            document.getElementById('submit').disabled = true;
            price_count = 0;
        }
        else if (pricetag.length > 9) {
            document.getElementById('priceWarning').innerHTML = "Enter a valid amount less than 10 digit";
            document.getElementById('submit').disabled = true;
            price_count = 0;
        }
        else {
            document.getElementById('priceWarning').innerHTML = "";
            document.getElementById('submit').disabled = false;
            price_count = 1;
        }
    }
    else {
        document.getElementById('priceWarning').innerHTML = "Price should not be empty";
        document.getElementById('submit').disabled = true;
        price_count = 0;
    }
}
function imageValidation() {
    let image = document.getElementById('file');
    let rules = /[^\s]+(.*?).(jpg|jpeg|png|svg)$/i;
    if (image.value.length == 0) {
        document.getElementById('imageWarning').style.color = "#ff0000";
        document.getElementById('imageWarning').innerHTML = "Image should not be empty";
        document.getElementById('submit').disabled = true;
        image_count = 0;
    }
    else if (!image.value.match(rules)) {
        document.getElementById('imageWarning').style.color = "#ff0000";
        document.getElementById('imageWarning').innerHTML = "Image must be in the format of jpeg/jpg/png/svg";
        document.getElementById('submit').disabled = true;
        image_count = 0;
    }
    else {
        if (image.files[0].size > 1024 * 1024) {
            document.getElementById('imageWarning').style.color = "#ff0000";
            document.getElementById('imageWarning').innerHTML = "Image size must me less than 1 mb";
            document.getElementById('submit').disabled = true;
            image_count = 0;
        }
        else {
            document.getElementById('imageWarning').style.color = "green";
            document.getElementById('imageWarning').innerHTML = "File Accepted";
            document.getElementById('submit').disabled = false;
            image_count = 1;
        }
    }
}
function descriptionValidation() {
    let pdescription = document.getElementById('description').value;
    let rules = /^[a-zA-Z][a-zA-Z0-9\s\!*.()'#/]*$/;
    if (pdescription.length > 0) {
        if (pdescription.length > 100) {
            document.getElementById('descriptionWarning').innerHTML = "Descriptin should not more than 100 letter";
            document.getElementById('submit').disabled = true;
            description_count = 0;
        }
        else if (!pdescription.match(rules)) {
            document.getElementById('descriptionWarning').innerHTML = "Description should only contain Alphabet, number & character(! . () * ' # /)";
            document.getElementById('submit').disabled = true;
            description_count = 0;
        }
        else {
            document.getElementById('descriptionWarning').innerHTML = "";
            document.getElementById('submit').disabled = false;
            description_count = 1;
        }
    }
    else {
        document.getElementById('descriptionWarning').innerHTML = "Description should not be empty";
        document.getElementById('submit').disabled = true;
        description_count = 0;
    }
}

// Crud operation start from here
function showData() {
    const viewTable = document.getElementById("viewTable");
    if (viewTable == null) return;
    let dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"))
    }
    let result = "";
    dataList.forEach(function (element, index) {
        result += "<tr>";
        result += '<td>' + element.productId + "</td>";
        result += "<td>" + element.pname + "</td>";
        result += "<td>" + element.price + "</td>";
        // const img = new Image();
        // img.src = element.image;
        
        result += `<td><img src ="${element.image}" width="40px" height="40px"></td>`;
        result += "<td>" + element.pdescription + "</td>";
        result += '<td><button onclick="updateData(' + index + ')" class="btn btn-primary">Update</button><button onclick="deleteData(' + index + ')" class="btn btn-danger mt-2 mt-xl-0 mx-xl-2">Delete</button></td>';
        result += "</tr>";
    });
    viewTable.innerHTML = result;

}

document.onload = showData();
const form = document.getElementById("myform");form.addEventListener("submit", e => {  e.preventDefault();  form.reset();});

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str) {

    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}
function addData() {
    let productId = Date.now();
    let pname = document.getElementById('productName').value;
    pname = capitalizeFirstLetter(pname);
    let pricetag = document.getElementById('price').value;
    let image1 = document.getElementById('file');
    let pdescription = document.getElementById('description').value;
    pdescription = capitalizeFirstLetter(pdescription);
    document.getElementById('imageWarning').innerHTML = "";

    const fr = new FileReader();
    fr.readAsDataURL(image1.files[0]);
    fr.addEventListener('load', () => {
        let url = fr.result;
        let dataList = [];
        if (localStorage.getItem("dataList") == null) {
            dataList = [];
        } else {
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }
        if(dataList.some((v) =>{return v.pname == pname})){
                const toastLiveExample = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastLiveExample);
                document.getElementById('Success_notice').style.color="red";
                document.getElementById('Success_notice').innerHTML="Warning Message";
                document.getElementById('Success_message').innerHTML="Same Product is already in Entries";
                toast.show();
        }
        else{
            dataList.push({
                productId: productId,
                pname: pname,
                price: pricetag,
                image: url,
                pdescription: pdescription,
            });
            localStorage.setItem("dataList", JSON.stringify(dataList));
                const toastLiveExample = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastLiveExample);
                document.getElementById('Success_notice').style.color="Green";
                document.getElementById('Success_notice').innerHTML="Successfull Message";
                document.getElementById('Success_message').innerHTML="Your Data is added successfully";
                toast.show();
        }
        showData();
    });
            
}
function deleteData(index) {
    let dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    dataList.splice(index, 1);
    localStorage.setItem("dataList", JSON.stringify(dataList));
    showData();
}
function updatenameValidation() {
    let updatepname = document.getElementById('updateproductName').value;
    let rules = /^[A-Za-z\s]*$/;
    if (updatepname.length > 0) {
        if (updatepname.length > 10) {
            document.getElementById('updateproductNameWarning').innerHTML = "Product name should be in between 0-10";
            document.getElementById('updated').disabled = true;
        }
        else if (!updatepname.match(rules)) {
            document.getElementById('updateproductNameWarning').innerHTML = "Product name should only be alphabet";
            document.getElementById('updated').disabled = true;
        }
        else {
            document.getElementById('updateproductNameWarning').innerHTML = "";
            document.getElementById('updated').disabled = false;
        }
    }
    else {
        document.getElementById('updateproductNameWarning').innerHTML = "Prdouct name should not be empty";
        document.getElementById('updated').disabled = true;
    }
}
function updatepriceValidation() {
    let updatepricetag = document.getElementById('updateprice').value;
    let rules = /^[0-9].*$/;
    if (updatepricetag.length > 0) {
        if (updatepricetag.charAt(0) == 0) {
            document.getElementById('updatepriceWarning').innerHTML = "Price doesn't start with zero";
            document.getElementById('updated').disabled = true;
        }
        else if (!updatepricetag.match(rules) || isNaN(updatepricetag)) {
            document.getElementById('updatepriceWarning').innerHTML = "Price should only be a valid number";
            document.getElementById('updated').disabled = true;
        }
        else if (updatepricetag.length > 9) {
            document.getElementById('updatepriceWarning').innerHTML = "Enter a valid amount less than 10 digit";
            document.getElementById('updated').disabled = true;
        }
        else {
            document.getElementById('updatepriceWarning').innerHTML = "";
            document.getElementById('updated').disabled = false;
        }
    }
    else {
        document.getElementById('updatepriceWarning').innerHTML = "Price should not be empty";
        document.getElementById('updated').disabled = true;
    }
}
function updateimageValidation() {
    let updateimage = document.getElementById('updatefile');
    let rules = /[^\s]+(.*?).(jpg|jpeg|png|svg)$/i;
    if (updateimage.value.length == 0) {
        document.getElementById('updateimageWarning').style.color = "#ff0000";
        document.getElementById('updateimageWarning').innerHTML = "Image should not be empty";
        document.getElementById('updated').disabled = true;
    }
    else if (!updateimage.value.match(rules)) {
        document.getElementById('updateimageWarning').style.color = "#ff0000";
        document.getElementById('updateimageWarning').innerHTML = "Image must be in the format of jpeg/jpg/png/svg";
        document.getElementById('updated').disabled = true;
    }
    else {
        if (updateimage.files[0].size > 1024 * 1024) {
            document.getElementById('updateimageWarning').style.color = "#ff0000";
            document.getElementById('updateimageWarning').innerHTML = "Image size must me less than 1 mb";
            document.getElementById('submit').disabled = true;
            document.getElementById('update').disabled = true;
        }
        else {
            document.getElementById('updateimageWarning').style.color = "green";
            document.getElementById('updateimageWarning').innerHTML = "File Accepted";
            document.getElementById('updated').disabled = false;
        }
    }
}
function updatedescriptionValidation() {
    let updatepdescription = document.getElementById('updatedescription').value;
    let rules = /^[a-zA-Z][a-zA-Z0-9\s\!*.()'#/]*$/;
    if (updatepdescription.length > 0) {
        if (updatepdescription.length > 100) {
            document.getElementById('updatedescriptionWarning').innerHTML = "Descriptin should not more than 100 letter";
            document.getElementById('updated').disabled = true;
        }
        else if (!updatepdescription.match(rules)) {
            document.getElementById('updatedescriptionWarning').innerHTML = "Description should only contain Alphabet, number & character(! . () * ' # /)";
            document.getElementById('updated').disabled = true;
        }
        else {
            document.getElementById('updatedescriptionWarning').innerHTML = "";
            document.getElementById('updated').disabled = false;
        }
    }
    else {
        document.getElementById('updatedescriptionWarning').innerHTML = "Description should not be empty";
        document.getElementById('updated').disabled = true;
    }
}   
function submit_validation(){
    if(name_count == 1 && price_count == 1 && description_count == 1 && image_count == 1){
        document.getElementById('submit').disabled = false;
    }
    else{
        document.getElementById('submit').disabled = true;
    }
}