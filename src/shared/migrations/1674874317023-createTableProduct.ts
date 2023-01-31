import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableProduct1674874317023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'barCode',
            type: 'varchar',
          },
          {
            name: 'typeProduct',
            type: 'enum',
            enum: ['FRESH', 'PROCESSED', 'DRINKS', 'ELETRONIC', 'TOY'],
            isNullable: true,
          },
          {
            name: 'stockId',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ProductStock',
        columnNames: ['stockId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stock',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
