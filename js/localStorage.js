function storageRecord() {
    if (localStorage.getItem('lang') == 'en' && (+right.textContent > localStorage.getItem('recordEn'))) {
        recordLang('recordEn');
    }
    else if (localStorage.getItem('lang') == 'ru' && +right.textContent > localStorage.getItem('recordRu')) {
        recordLang('recordRu');
    }
}

function recordLang(recLang) {
    localStorage.setItem(recLang, right.textContent);
    record.textContent = localStorage.getItem(recLang);
    newRecord.innerHTML = 'NEW RECORD!';
    setTimeout(() => newRecord.innerHTML = '', 1000)
}


function storageLoad() {
    if (localStorage.getItem('lang') == 'ru') {
        record.textContent = localStorage.getItem('recordRu')
    }
    else if (localStorage.getItem('lang') == 'en') {
        record.textContent = localStorage.getItem('recordEn');
    }

    
}
storageLoad()


clearStorage.addEventListener('click', () => {
    localStorage.clear();
    location.reload()
})

function ruStorage() {
    localStorage.setItem('lang', 'ru');
}
function engStorage() {
    localStorage.setItem('lang', 'en')
}
