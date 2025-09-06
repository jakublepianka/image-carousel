const container = document.querySelector('.container');
const imageFrame = document.querySelector('.image-frame');
const leftButton = container.querySelector('#button-left');
const rightButton = container.querySelector('#button-right');
const navContainer = container.querySelector('.nav-container');
const navCircles = navContainer.querySelectorAll('.nav-circle');

const fns = (function(){

    const intervals = [];

    function createImageArray(){
        const arr = [];
        
        for (let i = 1; i <= 5; i++) {
            const image = document.createElement('img');
            image.classList.add('carousel-image');
            image.src = `./images/${i}.jpg`;
            image.id = i;
            arr.push(image);
        }

        return arr;
    }

    function toNext(){
        const currentImage = imageFrame.children[0];
        const imageArray = createImageArray();

        for (let i = 0 ; i < imageArray.length; i++){
            if(currentImage.id === imageArray[i].id && i !== imageArray.length - 1){
                imageFrame.replaceChild(imageArray[i+1], currentImage);
            } else if (currentImage.id === imageArray.length.toString()) {
                imageFrame.replaceChildren()
                imageFrame.appendChild(imageArray[0]);
            }
        }
        intervals.forEach(clearInterval);
        intervalToNext();
    }

    function toPrevious(){
        const currentImage = imageFrame.children[0];
        const imageArray = createImageArray();

        for (let i = imageArray.length - 1 ; i >= 0 ; i--){
            if(currentImage.id === imageArray[i].id && i !== 0){
                imageFrame.replaceChild(imageArray[i-1], currentImage);
            } else if (currentImage.id === '1') {
                imageFrame.replaceChildren()
                imageFrame.appendChild(imageArray[4]);
            }
        }
        intervals.forEach(clearInterval);
        intervalToNext();
    }

    function loadNextImageBtn(){
        rightButton.addEventListener("click", () => {
            toNext();
            markNavBtn();
        });
    }

    function loadPreviousImageBtn(){
        leftButton.addEventListener("click", () => {
            toPrevious();
            markNavBtn();
        });        
    }

    function chooseImage(btnId) {
        const imageArray = createImageArray();
        const chosenIndex = imageArray.findIndex(img => img.id === btnId);

        imageFrame.replaceChildren();
        imageFrame.appendChild(imageArray[chosenIndex]);
        
        intervals.forEach(clearInterval);
        intervalToNext();
    }

    function markNavBtn() {
        const currentImage = imageFrame.children[0];
        navCircles.forEach(btn => {
            btn.style.backgroundColor = 'white';
            if (currentImage.id === btn.id) {
                btn.style.backgroundColor = 'blue';
            }
        })
    }

    function loadNavBtns(){
        navCircles.forEach((btn, index) => {
            btn.id = index + 1;
            btn.addEventListener("click", () => {
                chooseImage(btn.id);
                markNavBtn();
            });
        }); 
    }

    function intervalToNext(){
        intervals.push(setInterval(() => {
            toNext();
            markNavBtn();
        }, 5000));
    }


    return {
        intervalToNext,
        markNavBtn,
        createImageArray,
        loadNextImageBtn,
        loadPreviousImageBtn,
        loadNavBtns
    }
})();

fns.loadNextImageBtn();
fns.loadPreviousImageBtn();
fns.loadNavBtns();

imageFrame.appendChild(fns.createImageArray()[0]);
fns.markNavBtn();
console.log(fns.intervalToNext());
