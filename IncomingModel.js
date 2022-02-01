module.exports = class Incoming {
    constructor(id, date, income, account_id) {
        this.id = id;
        this.date = date;
        this.income = new Number(income).valueOf();
        this.account_id = account_id;
    }

    validateFields() {
        if (!this.date) {
            this.error = 'Informe uma data';
            return;
        }

        if (!this.income) {
            this.error = 'Informe um valor';
            return;
        }

        if (parseFloat(this.income) < 0) {
            this.error = 'Valor inválido';
            return;
        }

        if (!this.account_id) {
            this.error = 'Receita sem vinculo com usuário. Faça login novamente';
            return;
        }

        if (this.date.length > 10 || 2000 > parseInt(this.date.substring(0, 4)) || parseInt(this.date.substring(0, 4) > 2200)) {
            this.error = 'Data inválida';
            return;
        }
    }
}