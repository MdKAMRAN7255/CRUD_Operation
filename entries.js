const table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('#TproductId, #TproductName, #TproductPrice');

table_headings.forEach((head, i) => {
    let sort_arc = true;
    head.onclick = () =>{
        head.classList.toggle('asc', sort_arc);
        sort_arc = head.classList.contains('asc') ? false :true;
        sortTable(i, sort_arc);
    }
})
function sortTable(column, sort_arc){
    [...table_rows].sort((a,b) =>{
        let first_row = a.querySelectorAll('td')[column].textContent,
         second_row = b.querySelectorAll('td')[column].textContent;
         if(second_row.match(/[0-9]$/)){
            //this  if loop is for soring a number
            return sort_arc ? (Number(first_row) < Number(second_row) ? 1: -1) : (Number(first_row) < Number(second_row) ? -1 : 1);
         }
         else{
            //this loop is for alphabet
            return sort_arc ? (first_row < second_row ? 1: -1) : (first_row < second_row ? -1 : 1);
         }
    }).map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

const searchInput = document.getElementById("searchbar");
const rows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("keyup", function(event){
    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        row.querySelector("td").textContent.startsWith(q)
        ? (row.style.display = "")
        : (row.style.display = "none");
    });
});
var modal = document.getElementById("popup_boxs");
function updateData(index){
    modal.style.display = "block";
    let dataList;

    if(localStorage.getItem("dataList") == null){
        dataList = [];
    }
    else{
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }
    document.getElementById('productid').innerHTML = dataList[index].productId;
    document.getElementById('updateproductName').value = dataList[index].pname;
    document.getElementById('updateprice').value = dataList[index].price;
    document.getElementById('updatedescription').innerHTML = dataList[index].pdescription;

    document.querySelector("#updated").onclick = function(){
        let image1 =  document.getElementById('updatefile');
        if (typeof(image1.files[0]) !== "undefined"){
            const fr = new FileReader();
            fr.readAsDataURL(image1.files[0]);
            fr.addEventListener('load', () => {
            let url = fr.result;
            console.log(url)
            dataList[index].pname = capitalizeFirstLetter(document.getElementById('updateproductName').value); 
            dataList[index].price = document.getElementById('updateprice').value;
            dataList[index].pdescription = capitalizeFirstLetter(document.getElementById('updatedescription').value);
            dataList[index].image = url;
                localStorage.setItem("dataList", JSON.stringify(dataList));
                showData();
            });
        }
        else{
            dataList[index].pname = capitalizeFirstLetter(document.getElementById('updateproductName').value); 
            dataList[index].price = document.getElementById('updateprice').value;
            dataList[index].pdescription = capitalizeFirstLetter(document.getElementById('updatedescription').value);
            localStorage.setItem("dataList", JSON.stringify(dataList));
            showData();
        }
    
    }
}

document.querySelector("#closed").onclick= function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
