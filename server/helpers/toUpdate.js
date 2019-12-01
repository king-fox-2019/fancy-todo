const toUpdate = (fields, data) => {
    let dataChanged = {}

    for (let key in data) {
        fields.forEach(field => {
            if (field === key) {
                dataChanged[key] = data[key]
            }
        })
    }

    return dataChanged
}

module.exports = toUpdate