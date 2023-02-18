import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createCollumInLotAndProduct1675128185775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'status',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
