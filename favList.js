const viewpoint = document.querySelector('#viewpoint');
let fakePic = 'https://via.placeholder.com/400x200';

showSpotList();
function showSpotList(){
    viewpoint.innerHTML = '';
    const favSpotListStr = sessionStorage.getItem('favSpotList');
    const favSpotList = JSON.parse(favSpotListStr) ?? [];
        for (let spot of favSpotList) {
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

                    <div class="btnBlock">
                        <button class="edit" id="btn${spot.id}" onClick="onEditClick(event)">編輯</button>
                    </div>
                </figcaption>
            </figure>
        </section>
            `);
        }
}
    
//編輯
function onEditClick(e){
    const button = e.target;
    const intro = button.parentElement.parentElement.querySelector('.intro');
    switch(button.textContent){
        case '編輯':
            intro.setAttribute('contenteditable', true);
            intro.focus();
            button.textContent = '儲存';
            break;
        case '儲存':
            if(intro.textContext === ''){
                return;
            }
            intro.setAttribute('contenteditable', false);
            button.textContent = '編輯';
            const id = +button.id.substr(3);
            save(id, intro.textContent);
            break;
    }
}

function save(id, text){
    const favSpotListStr = sessionStorage.getItem('favSpotList');
    const favSpotList = JSON.parse(favSpotListStr);
    const index = favSpotList.findIndex(spot => spot.id === id);
    favSpotList[index].introduction = text;
    sessionStorage.setItem('favSpotList', JSON.stringify(favSpotList));
}

//移除
document.querySelector('#btnRemove').addEventListener('click', () => {
    const spotCheckboxes = document.querySelectorAll('input:checked');
    const favSpotListStr = sessionStorage.getItem("favSpotList");
    const favSpotList = JSON.parse(favSpotListStr);
    for (let spotCheckbox of spotCheckboxes){
        const spotId = +spotCheckbox.id.substr(2);
        const index = favSpotList.findIndex(spot => spot.id ===spotId); 
        favSpotList.splice(index, 1);
    }
    sessionStorage.setItem('favSpotList', JSON.stringify(favSpotList));
    showSpotList();
})