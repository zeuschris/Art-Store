const products = [
    {
        id: '1',
        name: 'Taza con diseño de gato',
        description: 'Taza blanca con un colorido diseño de gato.',
        image: '/img/image-1.png',
        category: 'tazas',
        price: '7.900',
        stock: 10,
    },
    {
        id: '2',
        name: 'Taza de bosques y carretera', 
        description: 'Taza con diseño de un bosque y carretera al atardecer.',
        image: '/img/image-2.png',
        category: 'tazas',
        price: '8.500',
        stock: 15,
    },
    {
        id: '3',
        name: 'Taza de arboles y atardecer', 
        description: 'Taza con diseño de árboles y atardecer.',
        image: '/img/image-3.png',
        category: 'tazas',
        price: '9.200',
        stock: 7,
    },
    {
        id: '4',
        name: 'Taza de la playa', 
        description: 'Taza con diseño de una playa paradisíaca.',
        image: '/img/image-4.png',
        category: 'tazas',
        price: '9.800',
        stock: 9,
    },
    {
        id: '5',
        name: 'Taza de krishna', 
        description: 'Taza con diseño del iluminado Krishna.',
        image: '/img/image-5.png',
        category: 'tazas',
        price: '10.255',
        stock: 11,
    },
    {
        id: '6',
        name: 'Taza de gato negro', 
        description: 'Taza con diseño de gato negro y ojos.',
        image: '/img/image-6.png',
        category: 'tazas',
        price: '9.900',
        stock: 6,
    },
    {
        id: '7',
        name: 'Remera Arte Pop',
        description: 'Remera con estampado de arte pop colorido.',
        image: '/img/image-7.png',
        category: 'remeras',
        price: '25.500',
        stock: 20,
    },
    {
        id: '8',
        name: 'Remera de britney',
        description: 'Remera con diseño de Britney Spears icónica.',
        image: '/img/image-8.png',
        category: 'remeras',
        price: '26.999',
        stock: 15,
    },
    {
        id: '9',
        name: 'Remera vans vintage',
        description: 'Remera con logo vintage de la marca Vans.',
        image: '/img/image-9.png',
        category: 'remeras',
        price: '24.000',
        stock: 12,
    },
    {
        id: '10',
        name: 'Gorra Nike Blanca',
        description: 'Gorra blanca de la marca Nike con logo bordado.',
        image: '/img/image-10.png',
        category: 'gorras',
        price: '15.750',
        stock: 8,
    },
    {
        id: '11',
        name: 'Gorra Adidas Negra', 
        description: 'Gorra negra de la marca Adidas con diseño clásico.',
        image: '/img/image-11.png',
        category: 'gorras', 
        price: '16.000',
        stock: 5,
    },
    {
        id: '12',
        name: 'Gorra Quick Silver Azul', 
        description: 'Gorra azul de la marca Quick Silver con estilo moderno.',
        image: '/img/image-12.png',
        category: 'gorras', 
        price: '17.000',
        stock: 10,
    },
    {
        id: '13',
        name: 'Gorra Lacoste Verde', 
        description: 'Gorra verde de la marca Lacoste con logo distintivo.',
        image: '/img/image-13.png',
        category: 'gorras', 
        price: '68.000',
        stock: 4,
    },
     {
        id: '14',
        name: 'Gorra Polo Ralph Lauren Blanca',
        description: 'Gorra blanca de la marca Polo Ralph Lauren con diseño elegante.',
        image: '/img/image-14.png',
        category: 'gorras',
        price: '72.000',
        stock: 31,
    },
    {
        id: '15',
        name: 'Sweater personalizado programación',
        description: 'Sweater con diseño personalizado relacionado con programación.',
        image: '/img/image-15.png',
        category: 'sweaters',
        price: '40.999',
        stock: 7,
    },
    {
        id: '16',
        name: 'Sweater arte digital',
        description: 'Sweater con diseño de arte digital colorido.',
        image: '/img/image-16.png',
        category: 'sweaters',
        price: '42.000',
        stock: 9,
    },
    {
        id: '17',
        name: 'Sweater Logo Nasa',
        description: 'Sweater con el logo de la Nasa estampado.',
        image: '/img/image-17.png',
        category: 'sweaters',
        price: '39.599',
        stock: 30,
    },
    {
        id: '18',
        name: 'Sweater Planetas',
        description: 'Sweater con diseño de planetas del sistema solar.',
        image: '/img/image-18.png',
        category: 'sweaters',
        price: '41.000',
        stock: 5,
    },
    {
        id: '19',
        name: 'Sweater Lacoste Blanco',
        description: 'Sweater blanco con logo de Lacoste bordado.',
        image: '/img/image-19.png',
        category: 'sweaters',
        price: '55.769',
        stock: 2,
    },
    {
        id: '20',
        name: 'Sweater Polo Club',
        description: 'Sweater con diseño de Polo Club elegante.',
        image: '/img/image-20.png',
        category: 'sweaters',
        price: '60.000',
        stock: 22,
    },
    {
        id: '21',
        name: 'Gorra Gucci Original',
        description: 'Gorra Gucci blanca con diseño lujoso.',
        image: '/img/image-21.png',
        category: 'gorras',
        price: '311.999',
        stock: 2,
    },
]   

let error = false

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading...')
        setTimeout(() => {
            error ? reject('Error: fetching products') : resolve(products)
        },1000)
    })
}

export const getProductById = (id) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            let product = products.find(prod => prod.id === id)
            error ? reject('Error: fetching product by id') : resolve(product)
        }, 1000)
    })
}

