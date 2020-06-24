export const emailService = {
    getEmails,
}


emails = [
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { from: 'jason', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
]

function getEmails() {
    Promise.resolve(emails)
}