'use strict';

const switcher = document.getElementById('cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
let player;
const videosWrapper = document.querySelector('.videos__wrapper');

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);

    button.element.addEventListener('click', () => {
        if ( button.active === false ) {
            button.active = true;
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass)
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass)
        }
    });
}

function switchMode() {
    if ( night === false ) {
        document.body.classList.add('night');
        changeItemsStroke('.hamburger > line', "#fff");
        changeItemsColor('.videos__item-descr', "#fff");
        changeItemsColor('.videos__item-views', "#fff");
        document.querySelector('.header__item-descr').style.color = "#fff";
        document.querySelector('.logo > img').src = "logo/youtube_night.svg";
        night = true;
    } else {
        document.body.classList.remove('night');
        changeItemsStroke('.hamburger > line', "#000");
        changeItemsColor('.videos__item-descr', "#000");
        changeItemsColor('.videos__item-views', "#000");
        document.querySelector('.header__item-descr').style.color = "#000";
        document.querySelector('.logo > img').src = "logo/youtube.svg";
        night = false;
    }
}

function changeItemsStroke(selector, color) {
    document.querySelectorAll(selector).forEach( item => {
        item.style.stroke = color;
    });
}

function changeItemsColor(selector, color) {
    document.querySelectorAll(selector).forEach( item => {
        item.style.color = color;
    });
}

let night = false;
switcher.addEventListener('change', () => {
    switchMode()
});
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

/*const data = [ 
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'], 
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', 
        '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'], 
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'], 
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM'] 
];

more.addEventListener('click', () => {
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for ( let i = 0; i < data[0].length; i++ ) {
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);
        card.innerHTML = `
            <img src="${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                ${data[1][i]}
            </div>
            <div class="videos__item-views">
                ${data[2][i]}
            </div>
        `;
        videosWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10); 
        if ( night === true ) {
            card.style.color = '#fff';
            card.style.color = '#fff';
        }
        bindNewModal(card);  
    }
    sliceTitle('.videos__item-descr', 70);
});
*/

function createCard(item) {
    let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', item.contentDetails.videoId);
        card.innerHTML = `
            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
            <div class="videos__item-descr">
                ${item.snippet.title}
            </div>
            <div class="videos__item-views">
                3.2 тыс просмотров
            </div>
        `;
        videosWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10); 
        if ( night === true ) {
            card.style.color = '#fff';
            card.style.color = '#fff';
        }
        bindNewModal(card);  
}

function createCardSearch(item) {
    let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', item.id.videoId);
        card.innerHTML = `
            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
            <div class="videos__item-descr">
                ${item.snippet.title}
            </div>
            <div class="videos__item-views">
                3.2 тыс просмотров
            </div>
        `;
        videosWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10); 
        if ( night === true ) {
            card.style.color = '#fff';
            card.style.color = '#fff';
        }
        bindNewModal(card);  
}

function loadYoutubeData() {
    gapi.client.init({
        'apiKey': 'AIzaSyBcIy-FVMVCEuVfhcNlDC6gOMr6VWmW-sc',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then( () => {
        return gapi.client.youtube.playlistItems.list({
            'part': 'snippet,contentDetails',
            'maxResults': '6',
            'playlistId': 'PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv'
        });
    }).then( resp => {
        resp.result.items.forEach( item => {
            createCard(item);
        });
        sliceTitle('.videos__item-descr', 70);
    }).catch( e => {
        console.log(e);
    })
};

function search(target) {
    gapi.client.init({
        'apiKey': 'AIzaSyBcIy-FVMVCEuVfhcNlDC6gOMr6VWmW-sc',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then( () => {
        return gapi.client.youtube.search.list({
            'maxResults': '10',
            'part': 'snippet',
            'q': `${target}`,
            'type': ''
        });
    }).then( resp => {
        videosWrapper.innerHTML = '';
        resp.result.items.forEach( item => {
            createCardSearch(item);
        });
        sliceTitle('.videos__item-descr', 70);
    })
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    gapi.load('client', () => {
        search(document.querySelector('.search > input').value)
    });
    document.querySelector('.search > input').value = '';
});

more.addEventListener('click', () => {
    more.remove();
    gapi.load('client', loadYoutubeData);
})

function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        let text = item.textContent.trim();

        if ( text.length < count ) {
            return;
        } else {
            const str = text.slice(0,count + 1) + "...";
            item.textContent = str;
        }
    });
};

sliceTitle('.videos__item-descr', 70);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards) {
    cards.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            let dataId = item.getAttribute('data-url');
            loadVideo(dataId);
            openModal();
        });
    });
}

bindModal(videos);

function bindNewModal(card) {
    card.addEventListener('click', (event) => {
        event.preventDefault();
        let dataId = card.getAttribute('data-url');
        loadVideo(dataId);
        openModal();
    });
};

modal.addEventListener('click', (event) => {
    if ( !event.target.classList.contains('modal__body') ) {
        closeModal();
    }
});

function createVideoPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(()=> {
        player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE'
      }); 
    }, 300);
};

createVideoPlayer();

function loadVideo(videoId) {
    player.loadVideoById({
        'videoId': `${videoId}`
    });
}