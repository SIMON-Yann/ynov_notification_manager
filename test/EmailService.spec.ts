import {describe, it, expect, jest} from '@jest/globals'
import EmailService from '../src/EmailService'
import UserService from '../src/UserService'

describe('EmailService', () => {
  describe('#send', () => {
    it('Should send an email if user exists', async () => {
    })
    it('should not send an email if user does not exist', async () => {
    })
    it('should return a failure if user does not exist', async () => {
      //fixtures
      jest.useFakeTimers();
      const userService = {
        send: jest.fn().mockReturnValue(null),
      } as any as jest.Mocked<UserService>;

      const emailService = new EmailService(userService);
      
      //test
      let hasFailed = false;
      try {
        const sent = emailService.send("userId","body")
        jest.advanceTimersByTime(10001);
        await sent;
      } catch (e) {
        hasFailed = true;
        expect(e).toBeDefined()
      }
      expect(hasFailed).toBeTruthy()
      
    })
  })
})
