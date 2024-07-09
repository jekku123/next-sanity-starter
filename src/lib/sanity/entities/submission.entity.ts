import { z } from "zod";

export default class SubmissionEntity {
  private id?: string;
  private name: string;
  private email: string;
  private message: string;
  private userId: string;
  private createdAt?: string;

  constructor({
    id,
    name,
    email,
    message,
    userId,
    createdAt,
  }: {
    id?: string;
    name: string;
    email: string;
    message: string;
    userId: string;
    createdAt?: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.userId = userId;
    this.createdAt = createdAt;

    this.validate();
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getMessage() {
    return this.message;
  }

  public getUserId() {
    return this.userId;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public updateMessage(message: string) {
    this.message = message;
    this.validate();
  }

  private validate() {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().min(6),
      userId: z.string().min(1),
    });

    try {
      schema.parse(this);
    } catch (error) {
      console.error("SubmissionEntity validation error:", error);
      throw new Error("Invalid submission");
    }
  }
}
