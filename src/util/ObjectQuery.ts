/**
 * Retorna o objeto do array com o ID correspondente.
 * @param id - ID a ser procurado
 * @param data - Array de objetos com campo `id`
 * @returns O objeto encontrado ou `undefined`
 */

class SearchByKey {
    static find(){

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
                throw new Error(`Invalid query type: ${type}`);
            }
        }
    }

    static search (value, data, type) {
        const classToCall = this.mappedTypes[type] || this.mappedTypes.default
        return classToCall.find(value, data); 
    }

}

export default ObjectQuery