timerClock.textContent = 60;

function recordRuText() {
    someText.textContent = arrTextsRu[getRandom(0, arrTextsRu.length - 1)];
    getSpans();
    ruStorage();
    storageLoad();
    ruText.classList.add('blueColor');
    engText.classList.remove('blueColor');
    right_title.textContent = 'Правильно: ';
    wrong_title.textContent = 'Неправильно: ';
    total_wrong_title.textContent = 'Всего ошибок: ';
    record_title.textContent = 'Рекорд: ';
    time_title.textContent = 'Время: ';
    clear_store_title.textContent = 'Сброс результатов ';
    change_text_title.textContent = 'Другой текст';
}
function recordEnText() {
    someText.textContent = arrTextsEng[getRandom(0, arrTextsEng.length - 1)];
    getSpans();
    engStorage();
    storageLoad();
    ruText.classList.remove('blueColor');
    engText.classList.add('blueColor');
    right_title.textContent = 'Right: ';
    wrong_title.textContent = 'Wrong: ';
    total_wrong_title.textContent = 'Total wrong: ';
    record_title.textContent = 'Record: ';
    time_title.textContent = 'Time: ';
    clear_store_title.textContent = 'Clear store ';
    change_text_title.textContent = 'other text';
}
ruText.addEventListener('click', recordRuText);
engText.addEventListener('click', recordEnText);



function loadPage() {
    if (localStorage.getItem('lang') == 'ru') {
        recordRuText();
    }
    else if (localStorage.getItem('lang') == 'en') {
        recordEnText();
    }
    else {
        someText.textContent = arrTextsEng[getRandom(0, arrTextsEng.length - 1)];
        engStorage()
        engText.classList.add('blueColor');
    }
    getSpans();

    body.style.backgroundImage = localStorage.getItem('bg_path');

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnStart.focus();
    })

}
loadPage();



function getSpans() {
    let str = '';
    for (let i = 0; i < someText.textContent.length; i++) {
        str += `<span>${someText.textContent[i]}</span>`;
    }
    someText.innerHTML = str;
    spans = someText.querySelectorAll('span');
    for (let el of spans) {
        el.style.userSelect = 'none';
    }
}


function resPage() {
    location.reload()
};

restart.addEventListener('click', resPage);
changeText.addEventListener('click', resPage);

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let count = 0;
let wr = 0;
function onlineCursor(e) {
    if (e.key != 'Shift' && e.key != 'Alt' && e.key != 'Tab' && e.key != 'CapsLock' && e.key != 'ContextMenu' && e.key != 'Control' && e.key != 'Enter' && e.key != 'ArrowDown' && e.key != 'ArrowUp' && e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
        if (e.key == 'Backspace') {
            count--;
            if (count <= 0) count = 0;
            spans[count].style.background = 'inherit';
            spans[count].style.color = '#000';
            // spans[count].style.textDecoration = 'none';
        }
        else if (e.key != someText.textContent[count]) {
            spans[count].style.color = 'red';
            spans[count].style.backgroundColor = '#ebf4fa';
            spans[count].style.textDecoration = 'underline';
            // spans[count].classList.add('sup');

            if (someText.textContent[count] == ' ') {
                // spans[count].style.backgroundColor = 'red';
            }
            count++;
            wr++;
            totalWrong.textContent = wr;

        }
        else {
            spans[count].style.backgroundColor = '#ebf4fa';
            spans[count].style.color = 'blue';
            count++;
        }
    }
}

// ; (function settime() {
//     setTime.addEventListener('keydown', function (e) {
//         if (e.key == 'Enter') {
//             if (setTime.value != '') {
//                 if (setTime.value.search(/\d/g) != -1) {
//                     time = +setTime.value;
//                     timerClock.textContent = time;
//                 }
//             }
//         }
//     })
// })();

btnStart.addEventListener('click', function startTimer() {
    valInput.addEventListener('keydown', onlineCursor)
    if (time == undefined) {
        time = 60;
    }
    timeG.style.color = 'blue';
    valInput.value = '';
    valInput.disabled = false;
    btnStart.style.display = 'none';
    restart.style.display = 'block';
    changeText.disabled = true;
    engText.disabled = true;
    ruText.disabled = true;
    valInput.focus();
    let interval = setInterval(function () {
        timerClock.textContent = --time;

        if (time <= 10) {
            timeG.style.color = 'red';
        }
        if (time <= 0) {
            clearInterval(interval);
            valInput.disabled = true;
            changeText.disabled = false;
            engText.disabled = false;
            ruText.disabled = false;
            let strSomeTextSlice = someText.textContent.slice(0, valInput.value.length);
            for (let i = 0; i < strSomeTextSlice.length; i++) {
                if (strSomeTextSlice[i] != valInput.value[i]) {
                    wrong.textContent++;
                }
            }
            right.textContent = valInput.value.length - wrong.textContent;
            totalWrong.textContent += ` (${(wr / count * 100).toFixed(1)}%)`
            storageRecord();



            if (right.textContent <= 100) {
                funcComment(arrCommentsBad)
                setTimeout(() => comment.innerHTML = '', 4000)
            }
            else if (right.textContent > 100 && right.textContent <= 150) {
                funcComment(arrCommentsNorm, 'blue');
                setTimeout(() => comment.innerHTML = '', 4000)
            }
            else if (right.textContent > 150 && right.textContent <= 200) {
                funcComment(arrCommentsGood, 'blue')
                setTimeout(() => comment.innerHTML = '', 4000)
            }
            else if (right.textContent > 200) {
                funcComment(arrCommentsBest, '#d503ff')
                setTimeout(() => comment.innerHTML = '', 4000)
            }
        }
    }, 1000)
})



function funcComment(arrComments, commentColor) {
    let int = setTimeout(() => {
        comment.innerHTML = arrComments[getRandom(0, arrComments.length - 1)];
        comment.style.color = commentColor;
    }, 1500)
}


// background

change_BG.addEventListener('click', function () {
    let countBG = 0;
    countBG = +localStorage.getItem('countBG');
    countBG++;
    if (countBG > arrBG.length-1) {
        countBG = 0;
    }
    localStorage.setItem('bg_path', arrBG[countBG]);
    localStorage.setItem('countBG', countBG)
    body.style.backgroundImage = arrBG[countBG];
});