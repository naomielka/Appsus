import { utilsService as utilService, utilsService } from './utils.service.js'

export const emailService = {
    getEmails,
    getEmailById,
    deleteEmail,
    composeNewEmail,
    countReadEmails,
    updateEmail,
    getEmailsFromPromise,
    loadEmails
}

var gEmails = [
    { id: '12HJ5', from: 'Jason', subject: 'Wassap?', body: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '14JKI', from: 'may', subject: 'How are you??', body: 'Head over to our Learning Area JavaScript topic if you want to learn JavaScript but have no previous experience of JavaScript or programming. The complete modules available there are as follows:', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '255FF', from: 'amit', subject: 'Wassap?', body: `JavaScript building blocks
    Continues our coverage of JavaScript's key fundamental features, turning our attention to commonly-encountered types of code blocks such as conditional statements, loops, functions, and events.`, isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '12MK0', from: 'ellah', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '689NJ', from: 'tal', subject: `'Wassap?'`, body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '45JUK', from: 'oren', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '5JKI5', from: 'hila', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: 'KL95J', from: 'taia', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },
    { id: 'MK5IS', from: 'idan', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isSentFromMe: false, isDeleted: false, sentAt: 1551133930594 },

]
var gDeletedEmails = []

function getEmails(key = 'emails') {
    if (key === 'emails') return Promise.resolve(gEmails)
    else return Promise.resolve(gDeletedEmails)
}

// function getDeletedEmails() {
//     return Promise.resolve(gDeletedEmails)
// }

function getEmailsFromPromise(key) {
    var emailList = [];
    if (utilService.loadFromStorage(key)) {
        emailList = utilService.loadFromStorage(key);
        return emailList;
    } else {
        getEmails()
            .then((emails) => {
                emailList = emails;
                utilService.storeToStorage(key, emails);
                return emailList;
            })
    }

}

function loadEmails(key) {
    var emailList = [];
    if (utilService.loadFromStorage(key)) {
        emailList = utilService.loadFromStorage(key);
        return Promise.resolve(emailList)
    } else {
        getEmails()
            .then((emails) => {
                emailList = emails;
                utilService.storeToStorage(key, emails);
                return emailList;
            })
    }

}

function getEmailById(emailId) {
    var emailList = getEmailsFromPromise('emails')
    var email = emailList.find(email => email.id === emailId)
    if (!email) {
        emailList = getEmailsFromPromise('deletedEmails')
        email = emailList.find(email => email.id === emailId)
    }
    return email;
}

function deleteEmail(emailId, isPermenent = false) {
    if (isPermenent === true) {
        var emailList = getEmailsFromPromise('deletedEmails')
        var emailIdx = emailList.findIndex((email) => email.id === emailId);
        emailList.splice(emailIdx, 1)
        console.log(emailIdx)
        utilsService.storeToStorage('deletedEmails', emailList)
    } else {
        var emailList = getEmailsFromPromise('emails')
        var emailIdx = emailList.findIndex((email) => email.id === emailId);
        console.log(emailIdx)
        var deletedEmail = emailList.find((email) => email.id === emailId);
        gDeletedEmails.unshift(deletedEmail)
        emailList.splice(emailIdx, 1)
        utilsService.storeToStorage('emails', emailList)
        utilsService.storeToStorage('deletedEmails', gDeletedEmails)
    }
}

function composeNewEmail(to, subject, body) {
    var newEmail = {
        id: utilsService.getRandomId(),
        from: 'Me',
        subject: subject,
        body: body,
        isRead: false,
        isStarred: false,
        isSentFromMe: true,
        isDeleted: false,
        sentAt: new Date()
    }
    var emailList = getEmailsFromPromise('emails')
    emailList.unshift(newEmail)
    utilsService.storeToStorage('emails', emailList)
}

function countReadEmails() {
    var emailList = getEmailsFromPromise('emails')
    var readEmails = []
    emailList.find((email) => {
        if (email.isRead) readEmails.push(email);
    })
    var unreadEmailsCount = emailList.length - readEmails.length
    return { readEmailsCount: readEmails.length, unreadEmailsCount }
}

function updateEmail(emailId, key, value, isDeleted) {
    var email = getEmailById(emailId, isDeleted);
    email[key] = value;
    var emailList = getEmailsFromPromise('emails');
    var emailIdx = emailList.findIndex((email) => email.id === emailId);
    emailList.splice(emailIdx, 1, email)
    utilsService.storeToStorage('emails', emailList)

}