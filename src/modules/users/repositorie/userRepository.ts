import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "../dto/createUser.dto";
import { updateUser } from "../dto/updatedUser.dto";
import { Users } from "../entites/user.entity";
import UserRepositoryInterface from "../interface/IUserRepository";

export default class UserRepository implements UserRepositoryInterface{
    constructor(
        @InjectRepository(Users)
        private repository:Repository<Users>
    ){}
async create(data: createUserDto): Promise<Users> {
   
    const createUser =this.repository.create()
    createUser.address = data.address
    createUser.birth_day = this.convertData(data.birth_day)
    createUser.document = data.document
    createUser.lastName = data.name
    createUser.name = data.lastName
    createUser.subscriber = data.subscriber


    try {
        await this.repository.save(createUser)
        return createUser
    } catch (error) {
        throw new Error(error.message)
    }
}

async delete(id: string): Promise<void> {
    const user = await this.repository.findBy({id:id})
    if (!user && !user[0].id) {
        throw Error("Usuario nao encontrado")
    }
    await this.repository.remove(user)
}

async update(id: string, updateData: updateUser):Promise<Users> {
        const user = await this.repository.findOne({where:{id:id}})
    if (!user && !user.id) {
        throw Error("Usuario nao encontrado")
    }

    user.lastName = updateData.lastName
    user.name = updateData.name
    user.birth_day = this.convertData(updateData.birthDay)
    user.address = updateData.address
    user.subscriber = updateData.subscriber

    this.repository.save(user)
    return user

    // const userUpdated = await this.repository.update(user[0].id,updateData)
}

list(): Promise<Users[]> {
    return this.repository.find()
}

 async findByDocument(document: string): Promise<boolean> {
    const user =  await this.repository.findOne({where:{document:document}})
    if (user) {
        return true
    }    
    return false
}

async findById(id: string): Promise<Users> {
    return await this.repository.findOne({where:{id:id}})
}

convertData(data: string):Date{
    const dateSplit = data.split('/')
    const dataFormtada = dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2]
    const stringDateToDate = new Date(dataFormtada)

    return stringDateToDate
}
}