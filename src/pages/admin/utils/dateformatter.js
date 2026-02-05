import dayjs from 'dayjs'
function DateFormat(date){
    return dayjs(date).format('DD MMM YY, hh:mm A');
}

export default DateFormat;