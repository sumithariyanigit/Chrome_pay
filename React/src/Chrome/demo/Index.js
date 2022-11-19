import React from 'react';
const sendmail = require('nodemailer');
 
sendmail({
    from: 'no-reply@yourdomain.com',
    to: 'test@qq.com, test@sohu.com, test@163.com ',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
});

function Index() {
    return (
        <div>jk send email to your otp </div>

        );
    }
    
    export default Index;