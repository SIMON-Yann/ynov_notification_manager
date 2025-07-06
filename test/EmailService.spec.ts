import {describe, it, expect, jest, afterEach} from '@jest/globals'
import EmailService from '../src/EmailService'
import UserService from '../src/UserService'

describe('EmailService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('#send', () => {
    it('Should send an email if user exists', async () => {
      //fixtures
      jest.useFakeTimers();
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      const userService = {
        getUserEmail: jest.fn().mockReturnValue("pierre@gmail.com"),
      } as any as jest.Mocked<UserService>;

      const emailService = new EmailService(userService);

      //test
      // call the method to create the timeout before advancing the timer
      const sent = emailService.send("pierre","body")
      // advance timer to avoid faked network delay
      jest.advanceTimersByTime(10001);
      // wait for response after advancing the time
      await sent;
      expect(log).toHaveBeenCalledWith('Email sent to pierre@gmail.com with body: body')
    })
    it('should not send an email if user does not exist', async () => {
      //fixtures
      jest.useFakeTimers();
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      const userService = {
        getUserEmail: jest.fn().mockReturnValue(null),
      } as any as jest.Mocked<UserService>;

      const emailService = new EmailService(userService);

      //test
      try {
        // call the method to create the timeout before advancing the timer
        const sent = emailService.send("pierre","body")
        // advance timer to avoid faked network delay
        jest.advanceTimersByTime(10001);
        // wait for response after advancing the time
        await sent;
      } catch (e) {}
      expect(log).not.toHaveBeenCalled();

    })
    it('should return a failure if user does not exist', async () => {
      //fixtures
      jest.useFakeTimers();
      const userService = {
        getUserEmail: jest.fn().mockReturnValue(null),
      } as any as jest.Mocked<UserService>;

      const emailService = new EmailService(userService);
      
      //test
      let hasFailed = false;
      try {
        // call the method to create the timeout before advancing the timer
        const sent = emailService.send("userId","body")
        // advance timer to avoid faked network delay
        jest.advanceTimersByTime(10001);
        // wait for response after advancing the time
        await sent;
      } catch (e) {
        //assertion
        hasFailed = true;
        expect(e).toBeDefined()
      }
      expect(hasFailed).toBeTruthy()
    })
  })
})
