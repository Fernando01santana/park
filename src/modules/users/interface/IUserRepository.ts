import { createUserDto } from "../dto/createUser.dto"
import { updateUser } from "../dto/updatedUser.dto"
import { Users } from "../entites/user.entity"

export default  interface UserRepositoryInterface{
    create(createUser: createUserDto): Promise<Users>
    list():Promise<Users[]>
    delete(id:string):Promise<void>
    update(id:string,updateData:updateUser):Promise<Users>
    findByDocument(document:string):Promise<boolean>
    findById(id:string):Promise<Users>
}