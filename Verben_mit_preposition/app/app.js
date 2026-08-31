import {Filter} from './filter.js';
import {Render} from './render.js';

export class App{
    constructor(){
        this.data = [];
        this.init()
    }
    async init(){
        try {
            const response = await fetch('./data/data.json');
            this.data = await response.json();
            const render = new Render(this.data);
            const filter = new Filter(this.data, (data) => render.renderList(data));
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }
}