"use strict";


baza.splice(100);


//------------ tartiblanmagan bazani tartiblash---------------//
const sortBaza = baza.map((baza) => {
   return {
      title: baza.title,
      year: baza.year,
      lang: baza.language,
      category: baza.categories,
      id: baza.imdbId,
      time: ` ${Math.floor(baza.runtime/60)}h ${baza.runtime%60}m`,
      summary: baza.summary,
      link: `https://www.youtube.com/embed/${baza.youtubeId}`,
      maxImg: baza.bigThumbnail,
      minIMG: baza.smallThumbnail,
      rating: baza.imdbRating,

   }
})
// console.log(sortBaza)

function rendorBaza() {
   sortBaza.forEach((el) => {

      const card = crElement('div', 'card shadow-lg ', `
        <img src="${el.minIMG}" style="width: 100%; height: 300px;" alt="img" class="card-img">
        <div class="card-body">
           <h4 class="card-title">
              ${el.title}   
           </h4>
           <ul class="list-unstyled">
           <li> <strong>ISH.CH.S:  ${el.year}   </strong>
           </li>
           
           <li> <strong>Narxi:   ${el.rating} $</strong></li>
           <li> <strong>Turi:  ${el.category}  </strong></li>
           
        </ul>
    
        <div class="social d-flex">
        <a href="${el.link}" target="_blank" class="btn btn-danger m-2" >
           Trailers
        </a>
        <button class="btn btn-primary m-2" data-read="${el.id}">
           Read more . . .
        </button>

        <button class="btn btn-warning m-2" data-add="${el.id}">
           Add bookmark
        </button>
     </div>

  </div>`);

      $('.salom').appendChild(card)


   })
}
rendorBaza();



const sortCotegory = () => {
   const arrayCategory = [];

   sortBaza.forEach((e) => {
      e.category.forEach((el) => {
         if (!arrayCategory.includes(el)) {
            arrayCategory.push(el);
         }

      })
   })

   arrayCategory.sort();

   arrayCategory.unshift("All");

   arrayCategory.forEach((el) => {
      const option = crElement('option', 'option-item', el);
      $('#idCategory').appendChild(option);
   })
   // console.log(arrayCategory);
}
sortCotegory();





const findFilm = (regerx, reyting = 0, category) => {
   if (category == 'All') {
      return sortBaza.filter((films) => {
         return films.title.match(regerx) && films.rating >= reyting
      })

   }
   return sortBaza.filter((films) => {
      return films.title.match(regerx) && films.rating >= reyting && films.category.includes(category);
   })
}

$('.formSubmit').addEventListener('submit', (el) => {
   el.preventDefault();
   const filmName = $('#idName').value;
   const filmReyting = $('#idReyting').value;
   const filmCategory = $('#idCategory').value;

   const regerx = new RegExp(filmName, "gi");

   const searchFilm = findFilm(regerx, filmReyting, filmCategory);

   // console.log(searchFilm);
   setTimeout(() => {
      if (searchFilm.length > 0) {
         searchResultsRender(searchFilm);
         $('.info__number').innerHTML = `<strong >${searchFilm.length}</strong> ta ma'lumot topildi`


      } else {
         $('.info__number').classList.add('d-none');

         $('.salom').innerHTML = `<h1>MA'LUMOT TOPILMADI</h1>`;

         // $('.info__number').innerHTML=`<strong >${searchFilm.length}</strong> ta ma'lumot topildi`
      }
   }, 200)


});




function searchResultsRender(data = []) {
   // console.log(data.length);`
   $('.salom').innerHTML = "";
   data.forEach((el) => {
      const card = crElement('div', 'card shadow-lg',
         `<img src="${el.minIMG}" alt="img" style="width: 100%; height: 300px;" class="card-img">
       <div class="card-body">
          <h4 class="card-title">
             ${el.title}   
          </h4>
          <ul class="list-unstyled">
             <li> <strong>ISH.CH.S::  ${el.year}   </strong>
             </li>
            
             <li> <strong>Narxi:   ${el.rating}  $</strong></li>
             <li> <strong>Turi:  ${el.category}  </strong></li>
             
          </ul>
   
          <div class="social d-flex">
          <a href="${el.link}" target="_blank" class="btn btn-danger m-2" >
             Trailers
          </a>
          <button class="btn btn-primary m-2" data-read="${el.id}">
             Read more . . .
          </button>

          <button class="btn btn-warning m-2" data-add="${el.id}">
             Add bookmark
          </button>
       </div>

    </div>`);

      $('.salom').appendChild(card);

   })
}







$('.salom').addEventListener('click', (el) => {
   el.preventDefault();
   if (el.target.classList.contains('btn-primary')) {
      const idMovie = el.target.getAttribute('data-read');
      
      showModal(idMovie);
      $('.modal-window').classList.remove('modal-hide');
   }
})
 

function showModal(ID){
const filmMovie=sortBaza.filter((el)=>{
     return el.id==ID;
});
// console.log(filmMovie); 

filmMovie.forEach((e) => {
      const row = crElement('div', 'row ',` <div class="col-md-4 h-100 ">
             <img src="${e.minIMG}" alt="cover" style="width: 100%; height: 300px;" class="img-fluid">
             </div>"
             <div class="col-md-6">
                <h4 class="text-primary">${e.title}</h4>
                <ul class="list-group">
                   <li class="list-group-item">Narxi : ${e.rating}  $</li>
                   <li class="list-group-item">ISH.CH.S:: ${e.year}</li>
                  
                   <li class="list-group-item">Turi:${e.category}  </li>
                </ul>
             </div>
             <div class="col-md-12 mt-4">
                <h4 class="text-danger">
                  ${e.title}
                </h4>
                <p>
                ${e.summary}
                </p>
              
 </div>

`);

   $('.modal-content').appendChild(row);



})



}


$('#close').addEventListener('click',()=>{
   $('.modal-window').classList.add('modal-hide');
   $('.modal-content').innerHTML="";

})

window.addEventListener('click', (e) => {

   if (e.target.classList.contains('modal-window')) {
      $('#close').classList.toggle('animate')
      console.log("ok");
   }

})



//                         boookmarkList

$(".bookmarkList").innerHTML=null

const bookmarkArray=[];
// const book=JSON.parse(localStorage.getItem("bookmark"))
// addBookmarks(book);

$('.salom').addEventListener('click', (el) => {
 
    if(el.target.classList.contains('btn-warning')){
      const idWarning=el.target.getAttribute('data-add');
      
      addBookmark(idWarning);
      addBookmarks(bookmarkArray);
   }
})


// bookmarkArray = JSON.parse(localStorage.getItem("bookmark"))

function  addBookmark(ID){
   const filmFilter=sortBaza.filter((e)=>{
      return e.id==ID;
   });
  
 

   
      bookmarkArray.push(filmFilter[0]);
  
   // console.log(bookmarkArray);
   localStorage.setItem("bookmark",JSON.stringify(bookmarkArray));


}







function addBookmarks(bookmarkArrays){
   $(".bookmarkList").innerHTML=null
   bookmarkArrays.forEach((el)=>{
   const div=crElement('div',' shadow d-flex align-content-center justify-content-center',`<div class="col-4 me-4">
   <img src="${el.minIMG}" style="width: 75px; height:100px;" alt="">
  </div> 
  <div class="col-8 ms-2">
       <h6 style="width: 60px; overflow: hidden;">${el.title}</h6>
       <button style="width: 80%;" data-delete="${el.id}">Delete</button>
  </div>`);
  $(".bookmarkList").appendChild(div);
})

}


$(".bookmarkList").addEventListener("click", e => {
   e.preventDefault();
   const idDelete=e.target.getAttribute("data-delete");
   let bookmarksd = JSON.parse(localStorage.getItem("bookmark"));
   
   bookmarksd = bookmarksd.filter(el => el.id !=idDelete)
   
   addBookmarks(bookmarksd)
   localStorage.setItem('bookmark', JSON.stringify(bookmarksd))
   
 }) 

let bookmarkssk = JSON.parse(localStorage.getItem("bookmark"))
addBookmarks(bookmarkssk)

// console.log(bookmarks);

















