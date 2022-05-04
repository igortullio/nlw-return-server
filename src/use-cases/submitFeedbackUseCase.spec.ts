import { SubmitFeedbackUseCase } from './submitFeedbackUseCase'

const createFeedbackSpy = jest.fn()
const sendEmailbackSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendEmailbackSpy })

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendEmailbackSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit a feedback without commet', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit a feedback with invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow()
  })
})
