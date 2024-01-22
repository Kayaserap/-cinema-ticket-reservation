const container=document.querySelector('.container');
const count=document.getElementById('count')
const amount=document.getElementById('amount')
const select=document.getElementById('movie')
const seats=document.querySelectorAll('.seat:not(.reserved)')




getFromLocalStorage(); //sayfa  yenilendiğinde bilgiler kalsın diye
calculatetotal(); //sayfa ilk acıldıgında calışmaya baslasın dıye

container.addEventListener('click',function(e){
if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){

e.target.classList.toggle('selected'); // koltuk secmek ıçın
calculatetotal()
}

})

select.addEventListener('change',function(e){
    calculatetotal()

})
function calculatetotal(){

    const selectedSeats=container.querySelectorAll('.seat.selected');

const selectedSeatsArr=[];
const seatsArr=[];
selectedSeats.forEach(function(seat) {
     selectedSeatsArr.push(seat)    
});
seats.forEach(function(seat){
    seatsArr.push(seat)
})

//localStorage için indexleri buluyoruz
let selectedSeatIndexs=selectedSeatsArr.map(function(seat){

    return seatsArr.indexOf(seat);
})
console.log(selectedSeatIndexs)

    let selectedSeatCount=selectedSeats.length;

    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*select.value;
saveToLocalStorage(selectedSeatIndexs)
}


function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    
    if(selectedSeats!=null && selectedSeats.length>0){
 seats.forEach(function(seat,index){
    if(selectedSeats.indexOf(index)>-1){
        seat.classList.add('selected');
    }
 })
        
    }
const selectedMovieIndex=localStorage.getItem('selectedMovieIndex')

if(selectedMovieIndex!=null){
    select.selectedIndex=selectedMovieIndex;
}


}
//localStorage içinde index içinde saklayacagımız kısım
function saveToLocalStorage(indexs){

    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}