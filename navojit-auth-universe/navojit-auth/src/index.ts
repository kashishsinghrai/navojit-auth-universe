export * from "./core/auth";
export * from "./core/providers";
export * from "./adapters/express";
export * from "./adapters/nextjs";
export * from "./adapters/fastify";
export * from "./adapters/drizzle";

// Export the Mongoose Adapter here to preserve backwards compatibility
export class MongooseAdapter {
  constructor(private model: any) {}
  async findUserByEmail(email: string): Promise<any> {
    return await this.model.findOne({ email });
  }
  async findUserById(id: string): Promise<any> {
    return await this.model.findById(id);
  }
  async createUser(data: any): Promise<any> {
    return await new this.model(data).save();
  }
}
