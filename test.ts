/**
 * Retorna o objeto do array com o ID correspondente.
 * @param id - ID a ser procurado
 * @param data - Array de objetos com campo `id`
 * @returns O objeto encontrado ou `undefined`
 */

class SearchByKey {
    static find<T extends { key: string }>(key: string, data: T[]){

    }
}

class SearchByValue {
    static find<T extends { value: any }>(value: any, data: T[]){
        const dataQuery = data.map((items, idx) => ({ items, idx }))
        .filter(obj => Object.values(obj.items).includes(value))
        .map(qry => qry.items)

        return dataQuery
    }
}

class ObjectQuery {
    static mappedTypes = {
        value: SearchByValue,
        key: SearchByKey,
        default: {
            validade: (type) => {
                throw new Error(`Invalid validation type: ${type}`);
            }
        }
    }

    static search (value, data, type) {
        const classToCall = this.mappedTypes[type] || this.mappedTypes.default
        return classToCall.find(value, data); 
    }

}



    const DB = {
        clients: [
            {
                id: 154,
                name: 'Magnetti Marelli',
                cnpj: '64.822.024/0001-09',
                cpf: null,
                phone: '3198465-4556',
                addres: 'Rua Fake, 123 - Belo Horizinte/MG'
            }
        ],
        services: [
            {
                id: 155,
                clientID: 15,
                start: "07/07/2025 09:12:30",
                estimatedTime: "5 days",
                end: "11/07/2025 14:43:21",
                status: "finished", //started | inProgress | finished | cancelled
                employees: [
                    12,
                    26
                ]
            }
        ]
    }


    ObjectQuery.search(154, DB.clients, 'value')