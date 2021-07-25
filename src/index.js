import './sass/main.scss';
import GalleryApiService from './gallery-api';
import articlesTpl from './template.hbs';
import { Notify } from 'notiflix';
const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryHolder: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    
}

const galleryApiService = new GalleryApiService()

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden')


function onSearch(e) {
    e.preventDefault();
    
    galleryApiService.query = e.currentTarget.elements.searchQuery.value
    if (galleryApiService.query === '') {
       clearArticlesContainer()
      Notify.info('Sorry, there are no images matching your search query. Please try again');  
    } else {
        
        
        galleryApiService.resetPage()
   
        galleryApiService.fetchArticles().then(hits => {
 clearArticlesContainer()
            appendArticlesMarkup(hits)
            refs.loadMoreBtn.classList.remove('is-hidden')
           
        })
    }
       

}

function onLoadMore() {
    refs.loadMoreBtn.classList.add('is-hidden')
   galleryApiService.fetchArticles().then(hits => {

            appendArticlesMarkup(hits)
       refs.loadMoreBtn.classList.remove('is-hidden')
       
        })
}

function appendArticlesMarkup(hits) {
    refs.galleryHolder.insertAdjacentHTML('beforeend', articlesTpl(hits))
}

function clearArticlesContainer() {
    refs.galleryHolder.innerHTML = ''
}




