exports.registerEmailParams = (email, token) => {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Email verification link",
    html: `<html><h1>Vefiry your email address</h1><p>Please use the following link to complete your registration:</p><p>${process.env.CLIENT_URL}/auth/activate/${token}</p></html>`,
  };
};

exports.forgotPasswordParams = (email, token) => {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    ReplyToAddresses: [email],
    subject: "Password Reset Link",
    html: `<html><h1>Reset password Link</h1><p>Please use the following link reset your password:</p><p>${process.env.CLIENT_URL}/auth/activate/password/reset/${token}</p></html>`,
  };
};
