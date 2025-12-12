const formatPriceDisplay = (price) => {
    return parseFloat(price || 0).toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default formatPriceDisplay