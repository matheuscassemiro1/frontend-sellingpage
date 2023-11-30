export interface Produto {
    id: number,
    nome: string,
    url: string,
    valor: number,
    quantidade: number
}

export const produtos: Produto[] = [
    { id: 1, nome: 'Heineken', url: 'https://cdn.awsli.com.br/2500x2500/2371/2371659/produto/169355378/304ad436dd.jpg', valor: 15, quantidade: 1 },
    { id: 2, nome: 'Eisenbahn', url: 'https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/403-cerveja-eisenbahn-pilsen-long-neck-355-ml.jpg?s=7087598ea4f819385fe6e4e3509265f8', valor: 18, quantidade: 1 },
    { id: 3, nome: 'Coca Cola', url: 'https://thepetitpizzaria.com.br/gramado/wp-content/uploads/2021/06/Pet-2-Litros-Coca-Cola-PNG.png', valor: 11, quantidade: 1 },
    { id: 4, nome: 'Heineken', url: 'https://cdn.awsli.com.br/2500x2500/2371/2371659/produto/169355378/304ad436dd.jpg', valor: 15, quantidade: 1 },
    { id: 5, nome: 'Eisenbahn', url: 'https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/403-cerveja-eisenbahn-pilsen-long-neck-355-ml.jpg?s=7087598ea4f819385fe6e4e3509265f8', valor: 18, quantidade: 1 },
]