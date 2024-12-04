import smtplib
from email.mime.text import MIMEText

def send_email(subject, body, to_email):
    from_email = 'your_email@example.com'
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email

    with smtplib.SMTP('smtp.example.com', 587) as server:
        server.starttls()
        server.login(from_email, 'your_password')
        server.sendmail(from_email, to_email, msg.as_string())

# Example usage
send_email('Price Drop Alert', 'The price has dropped!', 'recipient@example.com')
