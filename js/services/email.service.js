import { utilsService as utilService, utilsService } from './utils.service.js'

export const emailService = {
    getEmails,
    getEmailById,
    deleteEmail,
    composeNewEmail,
    countReadEmails,
    updateEmail
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

function getEmailsFromPromise() {
    var emailList = [];
    if (utilService.loadFromStorage('emails')) {
        emailList = utilService.loadFromStorage('emails');
        return emailList;
    } else {
        getEmails()
            .then((emails) => {
                emailList = emails;
                utilService.storeToStorage('emails', emails);
                return emailList;
            })
    }

}

function getEmailById(emailId) {
    var emailList = getEmailsFromPromise()
    var email = emailList.find(email => email.id === emailId)
    return email;
}

function deleteEmail(emailId) {
    var emailList = getEmailsFromPromise()
    var emailIdx = emailList.findIndex((email) => email.id === emailId);
    emailList.splice(emailIdx, 1)
    utilsService.storeToStorage('emails', emailList)
}

function composeNewEmail(to, subject, body) {
    var newEmail = {
        id: utilsService.getRandomId(),
        from: 'Me',
        subject: subject,
        body: body,
        isRead: false,
        sentAt: new Date()
    }
    var emailList = getEmailsFromPromise()
    emailList.unshift(newEmail)
    utilsService.storeToStorage('emails', emailList)
}

function countReadEmails() {
    var emailList = getEmailsFromPromise()
    console.log(emailList)
    var readEmails = []
    emailList.find((email) => {
        if (email.isRead) readEmails.push(email);
    })
    return readEmails.length

}

function updateEmail(emailId, key, value) {
    var email = getEmailById(emailId);
    email[key] = value;
    var emailList = getEmailsFromPromise();
    var emailIdx = emailList.findIndex((email) => email.id === emailId);
    emailList.splice(emailIdx, 1, email)
    utilsService.storeToStorage('emails', emailList)

}