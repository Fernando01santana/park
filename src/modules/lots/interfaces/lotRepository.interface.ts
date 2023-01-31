import { CreateLotDto } from '../dto/createLot.dto';
import { Lots } from '../entities/lot.entity';

export default interface LotRepositoryInterface {
  create(createLot: CreateLotDto): Promise<Lots>;
  list(): Promise<Lots[]>;
  remove(is: string): Promise<void>;
}
