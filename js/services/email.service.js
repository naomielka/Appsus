import { utilsService as utilService, utilsService } from './utils.service.js'

export const emailService = {
    getEmails,
    getEmailById,
    deleteEmail,
    composeNewEmail,
    countReadEmails,
    updateEmail,
    getImgContainerColor,
    getEmailsFromPromise
}

var gEmails = [
    { id: '12HJ5', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '14JKI', from: 'may', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '255FF', from: 'amit', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '12MK0', from: 'ellah', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '689NJ', from: 'tal', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '45JUK', from: 'oren', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: '5JKI5', from: 'hila', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: 'KL95J', from: 'taia', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },
    { id: 'MK5IS', from: 'idan', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, isDeleted: false, sentAt: 1551133930594 },

]
var gDeletedEmails = []

function getEmails(key = 'emails') {
    if (key === 'emails') return Promise.resolve(gEmails)
    else return Promise.resolve(gDeletedEmails)
}


function getEmailsFromPromise(key) {
    var emailList = [];
    if (utilService.loadFromStorage(key)) {
        emailList = utilService.loadFromStorage(key);
        return Promise.resolve(emailList);
    } else {
        return getEmails(key)
            .then((emails) => {
                emailList = emails;
                utilService.storeToStorage(key, emails);
                return emailList;
            })
    }

}

function getEmailById(emailId) {
    return getEmailsFromPromise('emails')
        .then((emailList) => {
            var email = emailList.find(email => email.id === emailId)
            if (!email) {
                return getEmailsFromPromise('deletedEmails').then((emailList) => {
                    email = emailList.find(email => email.id === emailId)
                })
            }
            return email;
        })
}

function deleteEmail(emailId, isPermenent = false) {
    if (isPermenent === true) {
        getEmailsFromPromise('deletedEmails')
            .then((emailList) => {
                var emailIdx = emailList.findIndex((email) => email.id === emailId);
                emailList.splice(emailIdx, 1)
                utilsService.storeToStorage('deletedEmails', emailList)
            })
    } else {
        getEmailsFromPromise('emails')
            .then((emailList) => {
                var emailIdx = emailList.findIndex((email) => email.id === emailId);
                var deletedEmail = emailList.find((email) => email.id === emailId);
                gDeletedEmails.unshift(deletedEmail)
                emailList.splice(emailIdx, 1)
                utilsService.storeToStorage('emails', emailList)
                utilsService.storeToStorage('deletedEmails', gDeletedEmails)
            })
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
        isDeleted: false,
        sentAt: new Date()
    }
    getEmailsFromPromise('emails').then((emailList) => {
        emailList.unshift(newEmail)
        utilsService.storeToStorage('emails', emailList)
    })
}

function countReadEmails() {
    return getEmailsFromPromise('emails').then((emailList) => {
        var readEmails = []
        emailList.find((email) => {
            if (email.isRead) readEmails.push(email);
        })
        var unreadEmailsCount = emailList.length - readEmails.length
        return { readEmailsCount: readEmails.length, unreadEmailsCount }
    })
}

function updateEmail(emailId, key, value, isDeleted = false) {
    getEmailById(emailId, isDeleted)
        .then((email) => {
            email[key] = value;
            if (isDeleted) {
                getEmailsFromPromise('deletedEmails')
                    .then((emailList) => {
                        var emailIdx = emailList.findIndex((email) => email.id === emailId);
                        emailList.splice(emailIdx, 1, email)
                        utilsService.storeToStorage('deletedEmails', emailList)
                    })
            } else {
                getEmailsFromPromise('emails')
                    .then((emailList) => {
                        var emailIdx = emailList.findIndex((email) => email.id === emailId);
                        emailList.splice(emailIdx, 1, email)
                        utilsService.storeToStorage('emails', emailList)
                    })

            }
        });

}

function getImgContainerColor() {
    var colors = [
        '#ff0000', '#00ff00', '#0000ff',
        '#ff3333', '#ffff00', '#ff6600'
    ];
    var randomColor = colors[Math.floor(
        Math.random() * colors.length)];

    var elDiv = document.querySelector('.img-container');
    elDiv.style.backgroundColor = randomColor;
}