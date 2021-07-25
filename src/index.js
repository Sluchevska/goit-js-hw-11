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

function onSearch(e) {
    e.preventDefault();
   galleryApiService.query = e.currentTarget.elements.searchQuery.value
   galleryApiService.resetPage()
    galleryApiService.fetchArticles().then(appendArticlesMarkup)
        // .then(hits => console.log(hits))

}


function onLoadMore() {
   galleryApiService.fetchArticles().then(appendArticlesMarkup)
}

function appendArticlesMarkup(hits) {
    refs.galleryHolder.insertAdjacentHTML('beforeend', articlesTpl(hits))
}




