module.exports = {
    validationErr: function (error) {
        let result = [];
        let keys = Object.keys(error.errors)

        for (let i = 0; i < keys.length; i++) {
            result.push(error.errors[keys[i]].message);
        }
        return result;
    }
}