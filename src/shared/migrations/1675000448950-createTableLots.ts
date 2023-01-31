import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableLots1675000448950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lots',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'numberLot',
            type: 'int',
          },
          {
            name: 'dateValidate',
            type: 'timestamp',
          },
          {
            name: 'dateFabrication',
            type: 'timestamp',
          },
          {
            name: 'qtdeItems',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lots');
  }
}
