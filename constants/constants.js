const ADD_APPLICATION_FORM_STEPS = ['Student Information', 'Parent Information', 'Education History', 'Emergency Contact', 'Review and Submit']

const ADD_APPLICATION_FORM_ELEMENTS = [
    {
        name: 'Heading',
        icon: 'fa fa-header'
    },
    {
        name: 'Address',
        icon: 'fa fa-map-marker'
    },
    {
        name: 'Full Name',
        icon: 'fa fa-address-card'
    },
    {
        name: 'Phone Number',
        icon: 'fa fa-phone'
    },
    {
        name: 'Email Address',
        icon: 'fa fa-envelope-o'
    },
    {
        name: 'Time',
        icon: 'fa fa-clock-o'
    },
    {
        name: 'Date',
        icon: 'fa fa-calendar-o'
    },
    {
        name: 'Integer',
        icon: 'fa fa-list-ol'
    },
    {
        name: 'Decimal',
        icon: 'fa fa-list-ol'
    },
    {
        name: 'Long Text',
        icon: 'fa fa-align-left'
    },
    {
        name: 'Short Text',
        icon: 'fa fa-minus'
    },
    {
        name: 'Multiple Choice',
        icon: 'feather icon-check-square'
    },
    {
        name: 'Single Choice',
        icon: 'feather icon-disc'
    },
    {
        name: 'File Upload',
        icon: 'fa fa-upload'
    },
    {
        name: 'Dropdown',
        icon: 'fa fa-arrow-circle-down'
    },
    {
        name: 'Scale Rating',
        icon: 'fa fa-signal'
    },
    {
        name: 'Signature',
        icon: 'fa fa-ils'
    }
]

const COLORS_PALETTE = [
    '#fb0874', // pink
    '#7cfc00', // lawn green
    '#4839eb', // blue
    '#1b874b', // green
    '#009688', // premium green
    '#ff5722', // orange
    '#fca311', // dark yellow
    '#d90429', // dark red
    '#344e41', // dark green
    '#03045e', // dark blue
    '#2a0800' // darkish brown
]

const APPLICATION_PREVIEW_DROPDOWN_OPTIONS = [
    'Under Review',
    'Approve and invoice',
    'Approve and record payment',
    'Waiting list',
    'Withdraw',
    'Reject',
    'Send Email'
]

const PI_CLASS_CHECK_FAILURE = 'Picked item class check fails'
const PI_ROOM_CHECK_FAILURE = 'Picked item room check fails'
const PI_TEACHER_CHECK_FAILURE = 'Picked item teacher check fails'
const TI_CLASS_CHECK_FAILURE = 'Target item class check fails'
const TI_ROOM_CHECK_FAILURE = 'Target item room check fails'
const TI_TEACHER_CHECK_FAILURE = 'Target item teacher check fails'

export {
    ADD_APPLICATION_FORM_STEPS,
    ADD_APPLICATION_FORM_ELEMENTS,
    APPLICATION_PREVIEW_DROPDOWN_OPTIONS,
    COLORS_PALETTE,
    PI_CLASS_CHECK_FAILURE,
    PI_ROOM_CHECK_FAILURE,
    TI_CLASS_CHECK_FAILURE,
    TI_ROOM_CHECK_FAILURE,
    PI_TEACHER_CHECK_FAILURE,
    TI_TEACHER_CHECK_FAILURE
}
