"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '2834fd36e90635',
        pass: '491f186b01ac21',
    },
});
class NodeMailerMailAdapter {
    async sendMail({ subject, body }) {
        await transport.sendMail({
            from: 'Equipe Feedback <oi@feedback.com>',
            to: 'Igor Túllio <igortullio@hotmail.com>',
            subject,
            html: body,
        });
    }
}
exports.NodeMailerMailAdapter = NodeMailerMailAdapter;
