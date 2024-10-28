import { Router } from "express"
const router= Router()

router.get('/', (req, res) => {
    // Array de imágenes
    const images = [
        { src: 'img/image3.png', alt: 'Imagen 1' },
        { src: 'img/image2.png', alt: 'Imagen 2' },
        { src: 'img/ofertaPC.png', alt: 'Imagen 3' }
    ];

    const masVendidos = [
        { src: 'img/masVendidos/monitorV.png', alt: 'Monitor Samsung', categoria: 'Monitor',name: 'Monitor 24" Samsung LS24C310EALXPE', id: '017673', price: '388' },
        { src: 'img/masVendidos/adaptadorV.png', alt: 'Adaptador UGREEN', categoria: 'Accesorio', name: 'Adaptador UGREEN (15600) USB-C 9 in 1', id: '017672', price: '149' },
        { src: 'img/masVendidos/fuenteV.png', alt: 'Fuente DeepCool', categoria: 'Accesorio', name: 'Fuente 650W DeepCool PF650', id: '017903', price: '207' },
        { src: 'img/masVendidos/sillaV.png', alt: 'Silla Gaming Cougar', categoria: 'Sillas', name: 'Silla Gaming Cougar Explore Black/Orange', id: '013559', price: '833' },
        { src: 'img/masVendidos/adaptadorV.png', alt: 'Adaptador UGREEN', categoria: 'Accesorio', name: 'Adaptador UGREEN (15600) USB-C 9 in 1', id: '017672', price: '149' },
        { src: 'img/masVendidos/fuenteV.png', alt: 'Fuente DeepCool', categoria: 'Accesorio', name: 'Fuente 650W DeepCool PF650', id: '017903', price: '207' },
        { src: 'img/masVendidos/sillaV.png', alt: 'Silla Gaming Cougar', categoria: 'sillas', name: 'Silla Gaming Cougar Explore Black/Orange', id: '013559', price: '833' },
        { src: 'img/masVendidos/impresoraV.png', alt: 'Impresora HP', categoria: 'Accesorio', name: 'Impresora Multifuncional HP Smart Tank 750', id: '014273', price: '1,160' }
    ];

    // Renderizamos la vista y enviamos las imágenes
    res.render('index', {
        title: 'Computer Gamer',
        images: images,
        masVendidos: masVendidos
    });
})

router.get('/about', (req, res) => res.render('about',{title:'Sobre Nosotros'}))
router.get('/catalogo',(req,res)=>res.render('catalogo',{title: 'Catalogo'}))
router.get('/register',(req,res)=>res.render('register',{title: 'Registrarse'}))

export default router