import {describe, it, expect} from '@jest/globals'
import UserService from '../src/UserService'

describe('UserService', () => {
  describe('#getUserPhoneNumber()', () => {
    it('Should return the correct phone number', () => {
      const userService = new UserService();
      userService.addUser({
        id: '123',
        name: 'John Doe',
        phone: '555-1234',
        settings: {
          notificationEnabled: true,
          notificationByEmail: true,
          notificationBySms: true,
          notificationFrequency: 'immediate'
        },
        errors: []
      })
      expect(userService.getUserPhoneNumber('123')).toBe('555-1234');
    })
    it('Should return null if user doesn\'t exist', () => {
      const userService = new UserService();
      expect(userService.getUserPhoneNumber('123')).toBe(null);
    })
    it('Should return null if user didn\'t set his phone number', () => {
      const userService = new UserService();

      userService.addUser({
        id: '123',
        name: 'John Doe',
        settings: {
          notificationEnabled: true,
          notificationByEmail: true,
          notificationBySms: true,
          notificationFrequency: 'immediate'
        },
        errors: []
      })
      expect(userService.getUserPhoneNumber('123')).toBe(null);
    })
  })
  describe('#getUserEmail()', () => {
    it('Should return the correct email', () => {
      const userService = new UserService();
      userService.addUser({
        id: '123',
        name: 'John Doe',
        email: 'fakeEmail',
        settings: {
          notificationEnabled: true,
          notificationByEmail: true,
          notificationBySms: true,
          notificationFrequency: 'immediate'
        },
        errors: []
      })
      expect(userService.getUserEmail('123')).toBe('fakeEmail');
    })
    it('Should return null if user doesn\'t exist', () => {
      const userService = new UserService();
      expect(userService.getUserEmail('123')).toBe(null);
    })
    it('Should return null if user didn\'t set his email', () => {

      const userService = new UserService();

      userService.addUser({
        id: '123',
        name: 'John Doe',
        settings: {
          notificationEnabled: true,
          notificationByEmail: true,
          notificationBySms: true,
          notificationFrequency: 'immediate'
        },
        errors: []
      })
      expect(userService.getUserEmail('123')).toBe(null);
    })
  })
  describe('#getUserSettings()', () => {
    it('Should return the correct settings', () => {
      const userService = new UserService();
      userService.addUser({
        id: '123',
        name: 'John Doe',
        phone: '555-1234',
        settings: {
          notificationEnabled: true,
          notificationByEmail: true,
          notificationBySms: true,
          notificationFrequency: 'immediate'
        },
        errors: []
      })
      expect(userService.getUserSettings('123')).toEqual({
        notificationEnabled: true,
        notificationByEmail: true,
        notificationBySms: true,
        notificationFrequency: 'immediate'
      });
    })
    it('Should return default settings if user doesn\'t exist', () => {
      const userService = new UserService();
      expect(userService.getUserSettings('123')).toEqual({
        "notificationEnabled": true,
        "notificationByEmail": true,
        "notificationBySms": false,
        "notificationFrequency": "immediate"
      });
    })
    it('Should return default settings if user didn\'t set his settings', () => {
      const userService = new UserService();
      userService.addUser({
        id: '123',
        name: 'John Doe',
        errors: []
      })
      expect(userService.getUserSettings('123')).toEqual({
        notificationEnabled: true,
        notificationByEmail: true,
        notificationBySms: false,
        notificationFrequency: 'immediate'
      });
    })
  })
  describe('#cannotSendNotification()', () => {
    it('should add an error to the user list of error if user exists', () => {
      const userService = new UserService();
      const user = {
        id: '123',
        name: 'John Doe',
        errors: []
      };
      userService.addUser(user);

      userService.cannotSendNotification({userId: '123', error: 'new error'})

      expect(user.errors).toHaveLength(1)
      expect(user.errors[0]).toBe('new error');
    })
  })
})
