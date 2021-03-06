const cardRepository = require('../repository/CardRepository');

module.exports = class Expense {
    constructor(id, amount, date, description, parcel, status, category_id, card_id, account_id) {
        this.id = id;
        this.amount = new Number(amount).valueOf();
        this.date = date;
        this.description = description;
        this.parcel = parcel;
        this.status = status;
        this.category_id = category_id;
        this.card_id = card_id;
        this.account_id = account_id;
    }

    validateFields() {

        if (!this.amount) {
            this.error = 'Informe um valor';
            return;
        }

        if (parseFloat(this.amount) < 0) {
            this.error = 'Valor inválido';
            return;
        }

        if (!this.date) {
            this.error = 'Informe uma data';
            return;
        }

        if (!this.parcel) {
            this.error = 'Informe a parcela';
            return;
        }

        if (!this.category_id) {
            this.error = 'Informe uma categoria';
            return;
        }

        if (!this.account_id) {
            this.error = 'Nenhuma conta vinculada a despesa';
            return;
        }

        if (this.date.length > 10 || 2000 > parseInt(this.date.substring(0, 4)) || 2200 < parseInt(this.date.substring(0, 4))) {
            this.error = 'Data inválida';
            return;
        }
       
    }

    async validateBalance() {
        if (this.card_id > 0) {
            let card = await cardRepository.getCardById(this.account_id, this.card_id);;
            if (this.amount > (card.limitt - card.current_value)) {
                this.error = "Cartão com limite insuficiente";
                return;
            }
        }
    }
}