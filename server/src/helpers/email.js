exports.registerEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                          <html>
                              <h1>Vefiry your email address</h1>
                              <p>Please use the following link to complete your registration:</p>
                              <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                          </html>
                      `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete your registration",
      },
    },
  };
};

exports.forgotPasswordParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                          <html>
                              <h1>Reset password Link</h1>
                              <p>Please use the following link reset your password:</p>
                              <p>${process.env.CLIENT_URL}/auth/activate/password/reset/${token}</p>
                          </html>
                      `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset your password",
      },
    },
  };
};
