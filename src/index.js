import './sass/main.scss';
import GalleryApiService from './gallery-api';
import { Notify } from 'notiflix';
const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryHolder: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    
}

const galleryApiService = new GalleryApiService()

refs.searchForm.addEventListener('submit', onSearch);
function onSearch(e) {
    e.preventDefault();
   galleryApiService.query = e.currentTarget.elements.searchQuery.value
   
    galleryApiService.fetchArticles()

    

     

}
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
   galleryApiService.fetchArticles() 
}




