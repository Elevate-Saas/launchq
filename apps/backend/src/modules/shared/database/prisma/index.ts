import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super();
    this.addMiddleware();
  }

  private addMiddleware() {
    this.$extends({
      query: {
        $allModels: {
          $allOperations: async ({ operation, args, query }) => {
            // Apply filter only to find operations with a `where` clause
            if (['findUnique', 'findFirst', 'findMany'].includes(operation)) {
              if (args && 'where' in args && typeof args.where === 'object') {
                // Add the global `deletedAt` filter
                if (!args.where) {
                  args.where = {};
                }

                if (args && typeof args.where === 'object') {
                  // Check if `deletedAt` is a valid field for this model's `where` input
                  if ('deletedAt' in args.where) {
                    (args.where as any).deletedAt = { equals: null };
                  }
                }
              }
            }

            // Proceed with the original query
            return query(args);
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Disconnected from the database');
    } catch (error) {
      this.logger.error(
        `Failed to disconnect from the database: ${error.message}`,
      );
    }
  }
}
