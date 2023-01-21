import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTableUser1674095021623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy:"uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "lastname",
                        type: "varchar",
                    },
                    {
                        name: "birth_day",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "document",
                        type: "varchar",
                    },
                    {
                        name: "address",
                        type: "varchar",
                    },
                    {
                        name: "subscriber",
                        type: "boolean",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users")
    }

}
