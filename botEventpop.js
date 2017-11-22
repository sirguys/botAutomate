var page = require('webpage').create()
var ontime = require('ontime')

ontime({
    cycle: '12:00:00' // กำหนดเวลาที่ต้องการไปจองในวันนั้น
}, function (ot) {
    console.time('Start');
    page.onLoadFinished = ready
    var step = 'open'
    page.settings.userAgent = 'Chrome/59.0.3071.115';
    page.viewportSize = {width:1024, height:900};
    page.open('https://www.eventpop.me/users/sign_in')

    function ready(status) {
        if (step == 'open') { //login
            step = 'fillSign_in'
            console.log('~~~~~~~~~~~~~~ login... - กำลังเข้าสู่ระบบ ~~~~~~~~~~~~~~');
            page.evaluate(function() {
                document.getElementById('user_email').value = "sarawut@kodkeaw.com" // email ในการ Login
                document.getElementById('user_password').value = "sirguys" // password ในการ Login
                document.getElementsByClassName("btn-primary")[0].click()
            })
        } else if (step == 'fillSign_in') {
            step = 'openEventUrl'
            console.log('~~~~~~~~~~~~~~ login succes!! - เข้าสู่ระบบสำเร็จ กำลังไปหน้ากดจองตั๋ว ~~~~~~~~~~~~~~');
            page.open("https://www.eventpop.me/e/2189-react-bangkok-meetup-2-1-0") // url ของ event ที่ต้องการจอง
            // ticket_types=[5992]
        } else if (step == 'openEventUrl') {
            step = 'succes'
            console.log('~~~~~~~~~~~~~~ Waiting... - กำลังกดจองตั๋ว ~~~~~~~~~~~~~~');
            page.evaluate(function() {
                $('#ticket_types_5992_quantity').val('1').change(); //ในกรณีที่ Event ไม่ได้ตั้ง defult selection ของ ticket ไว้
                document.getElementById('submit-order').click()
            })
            page.render('_clickBuyTickets.png')
        } else if (step == 'succes') {
            console.log('~~~~~~~~~~~~~~ จองตั๋วได้แล้วเรียบร้อย!!! ~~~~~~~~~~~~~~');
            page.render('_whenClickBuyTickets.png')
            phantom.exit()
        }
    }
    console.timeEnd('End');
    ot.done()
    return
})

// USE run: phantomjs botEventpop.js
