# CRUD_Operation
I have completed Crud operation practical using local storage.
I used two pages one for Form and other for Showing the entered data.

Screenshot of First Page:-
![Screenshot from 2023-02-20 19-58-36](https://user-images.githubusercontent.com/122250114/220133938-9a8198ff-5935-41ab-b4a6-934ca5986009.png)


Screenshot of Second Page:-
![Screenshot from 2023-02-20 20-09-37](https://user-images.githubusercontent.com/122250114/220136144-56e87ac6-67fd-4998-b2c9-26cb28b362de.png)


If click on the Update button it will be open up like this
![Screenshot from 2023-02-20 20-11-12](https://user-images.githubusercontent.com/122250114/220136484-82013f0b-5ed4-4585-a4ac-3768e6c9ab27.png)
**It shows us Product Id on heading at center for which we choose to update.**
Since We have to make the product id unique I used **Date.now();** method which generate unique number every second.
And when we perform update Product ID will not be changed as every product has only one unique id and it shuold always remain same.

We can't add duplicate Product i.e., we can not add same product if it is already in dataList(local storage) as I use product name for this validation.

As we don't have perfect range for Price. So I choose a price length of nine digit. And price should not start with zero.

And for every validation of input field I used Ajax.
Even in image I do validation like image must be in format of png/jpg/jpeg/svg and file size must be less than 1mb.
![Screenshot from 2023-02-20 20-30-12](https://user-images.githubusercontent.com/122250114/220140678-bb495f1a-80f0-47a8-96a3-8795a815510f.png)
![Screenshot from 2023-02-20 20-31-02](https://user-images.githubusercontent.com/122250114/220140906-8c79185d-db6c-4c37-b9c2-8f3532334481.png)

And it is mentioned that seacrching/filter will only be done using Product Id. so if we search using other than Product id then no data will be showing.
Compare with second image from top, there is five entries and after searching with Product id
![Screenshot from 2023-02-20 20-34-36](https://user-images.githubusercontent.com/122250114/220141933-c4f93dbc-575f-442d-ac27-eacbcc373acb.png)

And it is also mentioned that sorting will be done by only Product Id, Product Name, Price. So we can do sorting using these first three column.

All the code file is in branch: Crud_Operation
And hosted link of the website is:- https://gregarious-dusk-ba20ab.netlify.app/index.html
