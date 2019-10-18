import { BodyParam, ContentType, Controller, Ctx, Get, Param, Post } from "routing-controllers";
import { Inject } from "typedi";

import { BankingService } from "app/services/BankingService";
import { Context } from "koa";
import * as _ from "lodash";

import * as DepositWithdraw from "app/views/DepositWithdraw";
import * as ErrorPage from "app/views/ErrorPage";
import * as Index from "app/views/Index";
import * as Login from "app/views/Login";
import * as Transfer from "app/views/Transfer";

@Controller("/")
export class BankController {

    @Inject(() => BankingService)
    private bankingService: BankingService;

    @Get()
    @ContentType("text/html")
    public async index(@Ctx() context: Context) {
        try {
            const account = await this.bankingService.validateToken(context.cookies.get("token"));
            return Index.render(await this.bankingService.getAccountWithTransaction(account.accountId));
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default:
                    console.log(err);
                    return ErrorPage.render("Unexpected error");
            }
        }
    }

    @Get("login")
    @ContentType("text/html")
    public loginPage() {
        return Login.render();
    }

    @Post("login")
    @ContentType("text/html")
    public async login(
        @BodyParam("accountId") accountId: string,
        @BodyParam("passcode") passcode: string,
        @Ctx() context: Context
    ) {
        const token = await this.bankingService.login(accountId, passcode);
        context.cookies.set("token", token);
        context.redirect("/");
        return context;
    }

    @Get("logout")
    @ContentType("text/html")
    public logout(@Ctx() context: Context) {
        context.cookies.set("token", "");
        context.redirect("/login");
        return context;
    }

    @Get("deposit")
    @ContentType("text/html")
    public async depositPage(@Ctx() context: Context) {
        try {
            await this.bankingService.validateToken(context.cookies.get("token"));
            return DepositWithdraw.render("Deposit");
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 500; return ErrorPage.render("Unexpected error");
            }
        }
    }

    @Post("deposit")
    @ContentType("text/html")
    public async deposit(
        @BodyParam("amount") amount: number,
        @Ctx() context: Context
    ) {
        try {
            await this.bankingService.deposit(context.cookies.get("token"), amount);
            context.redirect("/");
            return context;
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 500; return DepositWithdraw.render("Deposit", err);
            }
        }
    }

    @Get("withdraw")
    @ContentType("text/html")
    public async withdrawPage(@Ctx() context: Context) {
        try {
            await this.bankingService.validateToken(context.cookies.get("token"));
            return DepositWithdraw.render("Withdraw");
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 500; return ErrorPage.render("Unexpected error");
            }
        }
    }

    @Post("withdraw")
    @ContentType("text/html")
    public async withdraw(
        @BodyParam("amount") amount: number,
        @Ctx() context: Context
    ) {
        try {
            this.bankingService.withdraw(context.cookies.get("token"), amount);
            context.redirect("/");
            return context;
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 500; return DepositWithdraw.render("Withdraw", err);
            }
        }
    }

    @Get("transfer")
    @ContentType("text/html")
    public async transferPage(@Ctx() context: Context) {
        try {
            await this.bankingService.validateToken(context.cookies.get("token"));
            return Transfer.render();
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 500; return ErrorPage.render("Unexpected error");
            }
        }
    }

    @Post("transfer")
    @ContentType("text/html")
    public async transfer(
        @BodyParam("amount") amount: number,
        @BodyParam("toAccount") toAccount: string,
        @Ctx() context: Context
    ) {
        try {
            await this.bankingService.transfer(context.cookies.get("token"), toAccount, amount);
            context.redirect("/");
            return context;
        } catch (err) {
            switch (err.status) {
                case 401: context.redirect("/login"); return context;
                default: context.status = 409; return Transfer.render(err);
            }
        }
    }
}