import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class insertCollumAcessLevel1674405611423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'acessLevel',
        type: 'enum',
        enum: ['CLIENT', 'MANAGER', 'EMPLOYEER', 'ADMIN'],
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'acessLevel');
  }
}
