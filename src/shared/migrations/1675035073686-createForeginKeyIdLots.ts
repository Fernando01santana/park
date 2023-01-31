import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createForeginKeyIdLots1675035073686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'stock',
      new TableForeignKey({
        name: 'stockLot',
        columnNames: ['lotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lots',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stock', 'lotId');
  }
}
