using System.Net.Mail;
using System.Net;
using System.Reflection;
using System.Text;

namespace EmailServices
{
    public class EmailHandler
    {
        public EmailHandler(){}
        public static void Send(string UserName, string Pass, string Email, string phone, Guid id)
        {
            try
            {
                var ngayHD = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

                EmailConfigs _email = new EmailConfigs();
                var StringBody = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), @"EmailTemplate\Goc.html");
                var bodyEmail = File.ReadAllText(StringBody);
                var _passMail = _email.Password;
                var _port = 587;
                var _smtpAddress = "smtp.gmail.com";
                var _enableSSL = true;
                var from = _email.Email;


                var link = $"http://admin.myduyen.vn/Account/Confirm?UserName={UserName}&id={id}";


                var body = bodyEmail
                            .Replace("@ngayHD", ngayHD)
                            .Replace("@taikhoan", UserName.ToString())
                            .Replace("@matkhau", Pass.ToString())
                            .Replace("@phone", phone.ToString())
                            .Replace("@email", Email.ToString())
                            .Replace("@link", link.ToString());
                MailMessage mail = new MailMessage();

                mail.From = new MailAddress(from);
                mail.To.Add(Email);
                mail.Subject = $"Xác thực tài khoản {UserName}";
                mail.Body = body;
                mail.IsBodyHtml = true;
                mail.BodyEncoding = UTF8Encoding.UTF8;


                SmtpClient smtp = new SmtpClient(_smtpAddress, _port);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.EnableSsl = _enableSSL;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(from, _passMail);

                smtp.Timeout = 60000;
                smtp.Send(mail);
            }
            catch (Exception ex) { }

        }
    }
}
