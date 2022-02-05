const validateFilters = (filters) => {
    return typeof(filters.category) === "undefined" || typeof(filters.category) === "string"
        && typeof(filters.search) === "undefined" || typeof(filters.search) === "string"
        && typeof(filters.saleOnly) === "undefined" || typeof(filters.saleOnly) === "boolean"
}

exports.validateFilters = validateFilters;