
const checkUserFields = ({email, password, role,first_name, last_name}) => {
    if (!email || !password || !role || !first_name || !last_name) {
        return true
    } else {
        return false
    }
}

module.exports = {checkUserFields}