import { MailAdapter } from '../adapters/mailAdapter'
import { FeedbacksRepository } from '../repositories/feedbacksRepository'

type SubmitFeedbackUseCaseRequest = {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(private feedbackRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<h2>Novo feedback</h2>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Screenshot: ${screenshot}</p>`,
        `</div>`,
      ].join('\n'),
    })

    return feedback
  }
}
