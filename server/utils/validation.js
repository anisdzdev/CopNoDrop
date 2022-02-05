const validateFilters = (filters) => {
    return (typeof(filters.category) === "undefined" || typeof(filters.category) === "string")
        && (typeof(filters.query) === "undefined" || typeof(filters.query) === "string")
        && (typeof(filters.onSale) === "undefined" || typeof(filters.onSale) === "boolean"
            || (typeof(filters.onSale) === "string" && ["true","false"].includes(filters.onSale)))
}

exports.validateFilters = validateFilters;