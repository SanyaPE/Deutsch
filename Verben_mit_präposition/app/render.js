export class Render {
    constructor(data) {
        this.data = data;
        this.tbody = document.getElementById('listBody');
        this.tableElement = document.getElementById('verbsTable');
        this.noResultsBlock = document.getElementById('noResultsBlock');
    }

    renderList(data) {
        const items = data || this.data;
        this.tbody.innerHTML = '';
        if (items.length === 0) {
            this.tableElement.style.display = 'none';
            this.noResultsBlock.style.display = 'block';
            return;
        }
        this.tableElement.style.display = 'table';
        this.noResultsBlock.style.display = 'none';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = '<td class="verb-col">' + item.verb + '</td>' +
                '<td class="formula-col">' + item.verb_preposition + '</td>' +
                '<td><div>' + item.translation + '</div><div class="semantic-text">' + item.semantic_group.join(', ') + '</div></td>' +
                '<td><div class="example-block"><div class="example-de">' + item.example_de + '</div><div class="example-ru">' + item.example_ru + '</div></div></td>' +
                '<td><span class="badge badge-level">' + item.level + '</span>' +
                (item.is_reflexive_verb ? '<span class="badge badge-refl">sich</span>' : '') + '</td>';
            this.tbody.appendChild(row);
        });
    }
}