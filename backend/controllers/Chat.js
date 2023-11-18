module.exports.createChat = async (req , res) => {
    try {
        console.log(req.user.id , "user id")
    } catch (error) {
        console.log(error)
    }
}
