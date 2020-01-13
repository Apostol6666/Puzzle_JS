window.onload = function start() {
    let place = document.querySelector('.partspuzzle');
    let placeres = document.querySelector('.resultpuzzle');
    place.addEventListener('drop', drop);

    let koor_top = 0;

    for (let j=0; j < 6; j++) {
        let koor_left = 0;
        for (let i=0; i < 9; i++) {
            let partp = document.createElement('div');

            partp.className = "part";
            partp.classList.add(i+j*9);
            partp.draggable = "true";
            partp.addEventListener('dragstart', dragstart);

            partp.addEventListener("mouseover", function(){light(event)}, false);
            partp.addEventListener("mouseout", function(){lightoff(event)}, false);
            let koor = ' top ' + koor_top + 'px' + ' left ' + koor_left + 'px';

            partp.style.backgroundPosition = koor;
            place.appendChild(partp);

            let partnull = document.createElement('div');
            partnull.className = "partnull";
            partnull.classList.add(i+j*9);

            partnull.addEventListener('dragover', dragover);
            partnull.addEventListener('drop', drop);

            placeres.appendChild(partnull);

            let pos_top = Math.random() * (480 - 0) + 1;
            pos_top = Math.floor(pos_top);

            let pos_left = Math.random() * (600 - 0) + 1;
            pos_left = Math.floor(pos_left);

            partp.style.top = pos_top;
            partp.style.left = pos_left;

            takepart(partp);
            koor_left -= 50;
        }
        koor_top -= 50;
    }
}

function dragover() {
    if (event.target.classList[0]==="part") {
        return true;
    }
    event.preventDefault();
}

function drop() {
    event.preventDefault();
    let imageplace = event.dataTransfer.getData("text/html");
    let blocks = document.querySelectorAll('.part')

    let blockim;
    for (block of blocks) {
        if (block.classList.contains(imageplace)==true) {
            blockim = block;
        }
    } 

    blockim.style.position = 'inherit';
    event.target.appendChild(blockim);
}

function dragstart() {
    event.dataTransfer.setData("text/html", event.target.classList[1]);
}

function takepart(part) {

    part.onmousedown = function(e) { 
    part.style.position = 'absolute';
    moveAt(e);

    part.style.zIndex = 1000; 

    function moveAt(e) {
        part.style.left = e.pageX - part.offsetWidth / 2 + 'px';
        part.style.top = e.pageY - part.offsetHeight / 2 + 'px';
    }
 
    document.onmousemove = function(e) {
        moveAt(e);
    }

    part.onmouseup = function() {
        document.onmousemove = null;
        part.onmouseup = null;
        except();
    }
    }
} 

function except() {
    let nullparts = document.querySelectorAll('partnull');

    let count =0;
    for (nullpart of nullparts) {
        let puzzlenum = nullpart.firstChild.classList[1];
        if (nullpart.classList[1] == puzzlenum) {
            count++;
        }
    }
   
    if (count==54) {
        winwin();
    }
}

function winwin() {
    let work = document.querySelector('.workspace');
    let winokno = document.createElement('div');
    winokno.className = 'win';
    work.after(winokno);
    let winpick = document.createElement('div');
    winpick.className = 'winpick';
    winokno.appendChild(winpick);
    let winbutt = document.createElement('div');
    winbutt.className = 'againbutt';
    winpick.after(winbutt);
    winbutt.textContent = 'AGAIN';
    winbutt.addEventListener('click', function() {location.reload()}, false);
    clean();
}

function clean() {
    let blocks = document.querySelectorAll('.part');
    for (let block of blocks) {
        block.remove();
    }
}

function light(event) {
    event.target.style.mozBoxShadow = '0 0 16px #494241';
    event.target.style.webkitBoxShadow = '0 0 16px #494241';
    event.target.style.boxShadow = '0 0 16px #494241';
} 

function lightoff(event) {
    event.target.style.backgroundColor = '';
    event.target.style.mozBoxShadow = '';
    event.target.style.webkitBoxShadow = '';
    event.target.style.boxShadow = '';
} 

