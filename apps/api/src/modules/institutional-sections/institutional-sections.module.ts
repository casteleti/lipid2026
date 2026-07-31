import { Module } from '@nestjs/common';
import { InstitutionalSectionsController } from './institutional-sections.controller';
import { InstitutionalSectionsService } from './institutional-sections.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InstitutionalSectionsController],
  providers: [InstitutionalSectionsService],
})
export class InstitutionalSectionsModule {}
