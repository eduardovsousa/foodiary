import type { z } from 'zod/mini';

const SCHEMA_METADATA_KEY = 'custom:schema';

export function Schema(schema: z.ZodMiniType): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target);
  };
}

export function getSchema(target: any): z.ZodMiniType | undefined {
  return Reflect.getMetadata(SCHEMA_METADATA_KEY, target.constructor);
}
