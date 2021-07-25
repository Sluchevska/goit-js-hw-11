import './sass/main.scss';
import GalleryApiService from './gallery-api';
import articlesTpl from './template.hbs';
import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox'
const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryHolder: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    
    
    
}


const galleryApiService = new GalleryApiService()
 var lightbox = new SimpleLightbox('.photo-card a');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden')
// refs.loadMoreBtn.disabled = false;
   

async function onSearch(e) {
    e.preventDefault();
           


    galleryApiService.query = e.currentTarget.elements.searchQuery.value
    const result = await galleryApiService.fetchArticles()
    
    console.log(result)
    if (galleryApiService.query.trim() === '') {

        clearArticlesContainer()
      Notify.info('Sorry, there are no images matching your search query. Please try again');  
    } else {
        
        galleryApiService.resetPage()
        Notify.success(`Hooray! We found ${result.totalHits} images.`);
        clearArticlesContainer()
        refs.loadMoreBtn.classList.remove('is-hidden')
        appendArticlesMarkup(result.hits)
        // SimpleLightbox.refresh()
        
    }

}

async function onLoadMore() {
    refs.loadMoreBtn.classList.add('is-hidden')
    const result = await galleryApiService.fetchArticles()
    const allDivs = refs.galleryHolder.querySelectorAll('.photo-card')
    console.log(allDivs.length)

    if (allDivs.length >= result.totalHits) {
        Notify.failure("We're sorry, but you've reached the end of search results");
        console.log(result.hits.length) 
    } else 

        appendArticlesMarkup(result.hits)
    refs.loadMoreBtn.classList.remove('is-hidden')
    
  
}

function appendArticlesMarkup(hits) {
    refs.galleryHolder.insertAdjacentHTML('beforeend', articlesTpl(hits))
  
}

function clearArticlesContainer() {
    refs.galleryHolder.innerHTML = ''
}




