import { Service } from "typedi";
import * as uuid from "uuid";

@Service()
export class TokenMockRepository {
    public tokens: { [key: string]: string } = {};

    public async issueToken(accountId: string) {
        const token = uuid.v4();
        this.tokens[token] = accountId;
        return token;
    }

    public async getAccountIdFromToken(token: string) {
        return this.tokens[token];
    }

}