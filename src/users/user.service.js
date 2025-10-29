class UserService {
    getPublicProfile = async (data) => {
        return {
            _id: data._id,
            username: data.username,
            email: data.email,
            status: data.status
        }
    }
}

const userSvc = new UserService;

module.exports = userSvc