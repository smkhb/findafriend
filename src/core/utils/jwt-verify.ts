import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    rep.status(401).send({
      error: "Unauthorized",
      message: "Invalid or expired token",
    });
  }
}
