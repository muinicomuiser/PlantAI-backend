export const PROMOCIONES_RELATIONS: string[] = [
    'tipoPromocion',
    'tipoDescuento',
    'tipoSeleccionProducto'
]

export const PROMOCIONES_PRODUCTO_RELATION: string[] = [
    ...PROMOCIONES_RELATIONS,
    'productos',
    'productos.categoria',
    'productos.planta',
    'productos.accesorio',
    'productos.macetero',
    'productos.imagenes',
    'productos.insumo',
    'productos.planta.color',
    'productos.planta.fotoPeriodo',
    'productos.planta.tipoRiego',
    'productos.planta.habitoCrecimiento',
    'productos.planta.entorno',
    'productos.planta.toleranciaTemperatura',
    'productos.planta.iluminacion',
    'productos.planta.tamano',
    'productos.accesorio.color',
    'productos.accesorio.tipoAccesorio',
    'productos.accesorio.marca',
    'productos.insumo.tipoInsumo',
    'productos.insumo.marca',
    'productos.macetero.tipoMacetero',
    'productos.macetero.marca',
]