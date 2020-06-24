import { utilsService as utilService } from './utils.service.js'

export const emailService = {
    getEmails,
    getEmailById
}

var gEmails = [
    { id: '12HJ5', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '14JKI', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '255FF', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '12MK0', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '689NJ', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '45JUK', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: '5JKI5', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'KL95J', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'MK5IS', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },

]

function getEmails() {
    return Promise.resolve(gEmails)
}

function getEmailById(emailId) {
    var emailList = [];
    if (utilService.loadFromStorage('emails')) {
        emailList = utilService.loadFromStorage('emails');
    } else {
        getEmails()
            .then((emails) => {
                emailList = emails;
                utilService.saveToStorage('emails', emails);
            })
    }
    var email = emailList.find(email => email.id === emailId)
    return email;
}