export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        const url = 'https://pixabay.com/api/'
        const key = '22597300-51a9bfff07e627635843c3062'
        fetch(`${url}?key=${key}&q=${this.searchQuery}&image_type=photo&orintation=horizontal&safesearch=true&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
                this.incrementPage();
                console.log(data)
            });
    }

    incrementPage(){
    this.page +=1
    }
    resetPage() {
        this.page = 1
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


