export class Filter {
    constructor(data, renderCallback) {
        this.data = data;
        this.renderCallback = renderCallback;
        this.searchInput = document.getElementById('searchWord');
        this.levelSelect = document.getElementById('filterLevel');
        this.reflexiveSelect = document.getElementById('filterReflexive');
        this.semanticSelect = document.getElementById('filterSemantic');
        this.prepSelect = document.getElementById('filterPrep');
        
        this.init();
    }
    
    init() {
        this.initFilters();
        this.bindEvents();
        this.filterData();
    }
    
    initFilters() {
        const semantics = new Set();
        const prepositions = new Set();
        this.data.forEach(item => {
            item.semantic_group.forEach(g => semantics.add(g));
            if(item.preposition) {
                item.preposition.forEach(p => prepositions.add(p));
            }
        });
        Array.from(semantics).sort().forEach(sem => {
            const opt = document.createElement('option');
            opt.value = sem;
            opt.textContent = sem;
            this.semanticSelect.appendChild(opt);
        });
        Array.from(prepositions).sort().forEach(prep => {
            const opt = document.createElement('option');
            opt.value = prep;
            opt.textContent = prep;
            this.prepSelect.appendChild(opt);
        });
    }
    
    filterData() {
        const searchVal = this.searchInput.value.toLowerCase().trim();
        const levelVal = this.levelSelect.value;
        const reflexiveVal = this.reflexiveSelect.value;
        const semanticVal = this.semanticSelect.value;
        const prepVal = this.prepSelect.value;
        const filtered = this.data.filter(item => {
            const ms = item.verb.toLowerCase().includes(searchVal) || item.translation.toLowerCase().includes(searchVal) || item.verb_preposition.toLowerCase().includes(searchVal);
            const ml = levelVal === 'all' || item.level === levelVal;
            let mr = true;
            if (reflexiveVal === 'reflexive') mr = item.is_reflexive_verb === true;
            if (reflexiveVal === 'normal') mr = item.is_reflexive_verb === false;
            const mg = semanticVal === 'all' || item.semantic_group.includes(semanticVal);
            const mp = prepVal === 'all' || (item.preposition && item.preposition.includes(prepVal));
            return ms && ml && mr && mg && mp;
        });
        filtered.sort((a, b) => a.verb.localeCompare(b.verb));
        this.renderCallback(filtered);
    }
    
    bindEvents() {
        [this.searchInput, this.levelSelect, this.reflexiveSelect, this.semanticSelect, this.prepSelect].forEach(el => {
            el.addEventListener('input', () => this.filterData());
        });
    }
}