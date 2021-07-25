import axios from "axios";

export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = '';
    }
    async fetchArticles() {
        
        const baseUrl = 'https://pixabay.com/api/'
        const key = '22597300-51a9bfff07e627635843c3062'
        const url = `${baseUrl}?key=${key}&q=${this.searchQuery}&image_type=photo&orintation=horizontal&safesearch=true&page=${this.page}&per_page=40`
        const response = await axios.get(url);
            // .then(response => response.json())
            

                this.incrementPage();
               
                return response.data;
               
    
        
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


