import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class insertColumEmail1674328015044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users',
        new TableColumn({
            name: 'email',
            isUnique:true,
            type: 'varchar',
        }),)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users','email')
    }

}
