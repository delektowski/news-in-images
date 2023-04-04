import {ImgData} from "../../models/ImageData.model";

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}
let daysBefore = 0;
let observer:IntersectionObserver = new IntersectionObserver(intersectionObserverCallback, options);
function intersectionObserverCallback(entries: any[]): void {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getDailyNewsImages();
    }
  });
}

function getDailyNewsImages(): void {
    const currentLocation = window.location.href
    daysBefore++
    const body = {daysBefore}
    fetch(`${currentLocation}days-before`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(response => {
        if (daysBefore > 31) {
            return;
        }
        if (response.length > 0) {
            addDailyNewsImages(response)
        } else {
            getDailyNewsImages()
        }
    }).catch(err => {
        console.log("Error: ", err)
    })
}

function setImage(imageData: ImgData): HTMLAnchorElement {
  const anchorTag = document.createElement("a");
  const imageContainer = document.createElement("div");
  const image = document.createElement("img");
  const imageTitle = document.createElement("p");
  const newsSrcContainer = document.createElement("div");
  const newsSrcText = document.createElement("p");
  const newsSrcFlag = document.createElement("span");
  anchorTag.href = imageData.link;
  anchorTag.target = "_blank";
  imageContainer.classList.add("image-container");
  image.src = imageData.imgSrc;
  image.alt = "ai generated image";
  image.classList.add("image-painting");
  imageTitle.innerText = imageData.title;
  imageTitle.classList.add("img-title");
  newsSrcContainer.classList.add("news-src");
  newsSrcFlag.classList.add("fi", `fi-${imageData.country}`);
  newsSrcText.innerText = imageData.newsProvider;
  newsSrcContainer.append(newsSrcFlag);
  newsSrcContainer.append(newsSrcText);
  imageContainer.append(image);
  imageContainer.append(imageTitle);
  imageContainer.append(newsSrcContainer);
  anchorTag.append(imageContainer);

  return anchorTag;
}

function addDailyNewsImages(imagesData: ImgData[]): void {
  let fragment: DocumentFragment = new DocumentFragment();
  const mainContainer: Element | null = document.querySelector(".main-container");
  const imagesContainer: HTMLDivElement = document.createElement("div");
  imagesContainer.classList.add("images-container");

  imagesData.forEach((imageData:ImgData): void => {
    imagesContainer.append(setImage(imageData));
  });
  fragment.append(imagesContainer);
  mainContainer?.appendChild(fragment);

  handleLazyLoadingImagesContainer();
}

function handleLazyLoadingImagesContainer(): void {
    const imagesContainers: NodeListOf<Element> = document.querySelectorAll(".images-container")
    let currentObserver: Element = imagesContainers[imagesContainers.length - 1]
    let previousObserver: Element = imagesContainers[imagesContainers.length - 2]
    observer.observe(currentObserver)
    previousObserver && observer.unobserve(previousObserver)
}

handleLazyLoadingImagesContainer();
