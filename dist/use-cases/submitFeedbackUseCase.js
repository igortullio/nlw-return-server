"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error('Type is required.');
        }
        if (!comment) {
            throw new Error('Comment is required.');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }
        const feedback = await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<h2>Novo feedback</h2>`,
                `<p>Tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<p>Screenshot:</p>` : '',
                screenshot ? `<img src="${screenshot}" />` : '',
                `</div>`,
            ].join('\n'),
        });
        return feedback;
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
