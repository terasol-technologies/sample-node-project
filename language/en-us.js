/*
    Language Resource EN-US
    Created : 2021 by War
*/

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {

    /* Error Messages */
    errors: {
        dbConnection: 'Snap! our database server got lost!',
        dbInsert: 'I think you did not paid attention to details!',
        dbUpdate: 'You need to keep check on what you want!',
        dbDelete: 'Do you really know what you were trying to do?',
        dbSelect: 'May be you are looking for right thing but in wrong space!',

        alreadyExist: 'I am already have similar record, guess you are duplicating!',
        notFound: 'Are you sure you are looking for right information?',
        childFound: 'I am having multiple information for this record, you need to force it?',

        wrongPassword: 'Are you trying to break into system, cause your passcode mismatch?',
        wrongEmail: "Wrong email.",
        userVerifyFailure: 'Are you sure that is the OTP you have received!',

        validationError: 'You forgot to provide me correct details!'
    },

    /* Route Messages */
    routes: {
        accessDenied: 'You are not authorized to view this space!',
        blank: 'The space you were trying to access is in nebula!'
    },

    /* Success Messages */
    success: {
        /* Admin */
        adminCreate: 'New admin account is ready!',
        adminUpdate: 'Admin details has been updated!'
    }
}
