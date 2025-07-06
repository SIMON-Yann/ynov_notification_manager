import {describe, it, expect, jest, afterEach} from '@jest/globals'
import SmsService from '../src/SmsService'
import UserService from '../src/UserService'

describe('SmsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('#send', () => {
    it('Should send an email if user exists', async () => {
      //fixtures
      jest.useFakeTimers();
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      const userService = {
        getUserPhoneNumber: jest.fn().mockReturnValue("07 07 07 07 07"),
      } as any as jest.Mocked<UserService>;

      const emailService = new SmsService(userService);

      //test
      // call the method to create the timeout before advancing the timer
      const sent = emailService.send("pierre","message")
      // advance timer to avoid faked network delay
      jest.advanceTimersByTime(10001);
      // wait for response after advancing the time
      await sent;
      expect(log).toHaveBeenCalledWith('SMS sent to 07 07 07 07 07 with message: message')
    })
    it('should not send an email if user does not exist', async () => {
      //fixtures
      jest.useFakeTimers();
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      const userService = {
        getUserPhoneNumber: jest.fn().mockReturnValue(null),
      } as any as jest.Mocked<UserService>;

      const emailService = new SmsService(userService);

      //test
      try {
        // call the method to create the timeout before advancing the timer
        const sent = emailService.send("pierre","message")
        // advance timer to avoid faked network delay
        jest.advanceTimersByTime(10001);
        // wait for response after advancing the time
        await sent;
      } catch (e) {}
      expect(log).not.toHaveBeenCalled();

    })
    it('should return a failure if user does not have phone number', async () => {
      //fixtures
      jest.useFakeTimers();
      const userService = {
        getUserPhoneNumber: jest.fn().mockReturnValue(null),
      } as any as jest.Mocked<UserService>;

      const emailService = new SmsService(userService);
      
      //test
      let hasFailed = false;
      try {
        // call the method to create the timeout before advancing the timer
        const sent = emailService.send("userId","message")
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
