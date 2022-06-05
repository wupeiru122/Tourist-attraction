
let spotList;

//分頁
let page = 1;
document.querySelector('#btnPre').addEventListener('click', ()=> {
    page--;
    if(page === 0){
        page = 1;
        return;
    }
    getSpotList();
});
document.querySelector('#btnNext').addEventListener('click', ()=> {
    page++;
    getSpotList();
});


//加入最愛
document.querySelector('#btnFavorite').addEventListener('click', () => {
    const spotCheckboxes = document.querySelectorAll('input:checked');
    const favSpotListStr = sessionStorage.getItem('favSpotList');
    const favSpotList = JSON.parse(favSpotListStr) ?? [];
    for (let spotCheckbox of spotCheckboxes){
        const spotId = +spotCheckbox.id.substr(2);
        const index = favSpotList.findIndex(spot => spot.id === spotId);
        if(index !== -1){
            continue;
        }
        //const spot = spotList.filter(spot => spot.id === spotId)[0];
        favSpotList.push(spotList.find(spot => spot.id === spotId));
    }
    sessionStorage.setItem('favSpotList', JSON.stringify(favSpotList));
});

//查詢
document.querySelector('#searchText').addEventListener('input' , e =>{
    const spots = spotList.filter(spot => spot.name.includes(e.target.value));
    showSpotList(spots);
});

const viewpoint = document.querySelector('#viewpoint');
let fakePic = 'https://via.placeholder.com/400x200';

getSpotList();
function getSpotList(){
    const url = `https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=${page}`;
    fetch(url, {
        headers: {
            Accept: 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(body => {
        spotList = body.data;
        showSpotList(spotList);
    });
}

function showSpotList(spots){
    viewpoint.innerHTML = '';

    for (let spot of spots) {
        viewpoint.insertAdjacentHTML('beforeend', `
        <section class="col"">
            <figure class="viewpointCard">
                <img src="${spot.images[0]?.src ?? fakePic}" class="picCard" alt="...">
                <figcaption class="card-body">
                    <input type="checkbox" id='cb${spot.id}'>
                    <h4 class="card-title">${spot.name}</h4>
                    <h4 class="card-distric"><i class="fa-solid fa-location-dot"></i>${spot.distric}</h4>
                    <h5 class="card-address">地址: ${spot.address}</h5>
                    <h5 class="card-tel">電話: ${spot.tel}</h5>
                    <p class="intro">${spot.introduction}</p>
                </figcaption>
            </figure>
        </section>
        `);
    };
}