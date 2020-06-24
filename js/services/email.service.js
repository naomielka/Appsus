import { utilsService } from './utils.service.js'

export const emailService = {
    getEmails,
}

var testEmails = [
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: null, from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },

]

function getEmails() {
    testEmails.forEach((email) => { if (!email.id) { email.id = utilsService.getRandomId() } })
    return Promise.resolve(testEmails)
}