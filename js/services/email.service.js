import { utilsService as utilService, utilsService } from './utils.service.js'

export const emailService = {
    getEmails,
    getEmailById,
    deleteEmail,
    composeNewEmail,
    countReadEmails,
    updateEmail,
    getImgContainerColor
}

var gEmails = [
    { id: '12HJ5', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '14JKI', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '255FF', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '12MK0', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '689NJ', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '45JUK', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: '5JKI5', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: 'KL95J', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: 'MK5IS', from: 'Jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1551133930594 },

]

function getEmails() {
    return Promise.resolve(gEmails)
}

function getEmailsFromPromise() {
    var emailList = [];
    if (utilService.loadFromStorage('emails')) {
        console.log('check')
        emailList = utilService.loadFromStorage('emails');
        return emailList;
    } else {
        console.log('check2')
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
        isStarred: false,
        sentAt: new Date()
    }
    var emailList = getEmailsFromPromise()
    emailList.unshift(newEmail)
    utilsService.storeToStorage('emails', emailList)
}

function countReadEmails() {
    var emailList = getEmailsFromPromise()
    var readEmails = []
    emailList.find((email) => {
        if (email.isRead) readEmails.push(email);
    })
    var unreadEmailsCount = emailList.length - readEmails.length
    return { readEmailsCount: readEmails.length, unreadEmailsCount }
}

function updateEmail(emailId, key, value) {
    var email = getEmailById(emailId);
    email[key] = value;
    var emailList = getEmailsFromPromise();
    var emailIdx = emailList.findIndex((email) => email.id === emailId);
    emailList.splice(emailIdx, 1, email)
    utilsService.storeToStorage('emails', emailList)

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