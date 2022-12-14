class UserService {
    constructor(){
        this.users = [{
            id: 1,
            nombreCompleto: 'Juan Pablo',
            correo: 'avilanjuanpablo@gmail.com',
            encryptedPassword: 'blahblahblah'
        }];
        //this.db = pool;
        //this.db.on('error', (err)=> console.error(err))
    }
    async findAll(){
        return this.users
    }

    async findById(id){
        return this.users.find(user => user.id === id)
    }

    async createUser(){

    }
}

module.exports = UserService