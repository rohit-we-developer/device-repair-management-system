# import smtplib
# import os
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText


# SMTP_SERVER = os.getenv("SMTP_SERVER")
# SMTP_PORT = int(os.getenv("SMTP_PORT"))
# SMTP_EMAIL = os.getenv("SMTP_EMAIL")
# SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# # ✅ SIMPLE & STABLE (LOCALHOST)
# BASE_URL = "http://127.0.0.1:8000"


# # 🔥 COMMON SEND FUNCTION
# def send_email(to_email: str, subject: str, html_content: str):

#     msg = MIMEMultipart("alternative")

#     msg["From"] = SMTP_EMAIL
#     msg["To"] = to_email
#     msg["Subject"] = subject

#     msg.attach(MIMEText(html_content, "html"))

#     try:
#         server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
#         server.starttls()
#         server.login(SMTP_EMAIL, SMTP_PASSWORD)
#         server.sendmail(SMTP_EMAIL, to_email, msg.as_string())
#         server.quit()

#         print("✅ EMAIL SENT SUCCESS")

#     except Exception as e:
#         print("❌ EMAIL ERROR:", e)


# # 📧 VERIFY EMAIL
# def send_verification_email(to_email: str, token: str):

#     link = f"{BASE_URL}/users/verify-email?token={token}"

#     html = f"""
#     <div style="font-family: Arial; padding: 20px;">
#         <h2>Verify Your Account 🚀</h2>

#         <p>Click below to verify your email:</p>

#         <a href="{link}" 
#            style="display:inline-block;
#            padding:12px 20px;
#            background:#28a745;
#            color:white;
#            text-decoration:none;
#            border-radius:6px;">
#            Verify Email
#         </a>

#         <p style="margin-top:20px;">Or copy this link:</p>
#         <p>{link}</p>

#         <p style="margin-top:20px; color:gray;">
#             If you didn’t register, ignore this email.
#         </p>
#     </div>
#     """

#     send_email(to_email, "Verify your account", html)

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# ✅ FRONTEND URL (IMPORTANT FIX)
BASE_URL = "http://localhost:3000"


# 🔥 COMMON SEND FUNCTION
def send_email(to_email: str, subject: str, html_content: str):

    msg = MIMEMultipart("alternative")

    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(html_content, "html"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.sendmail(SMTP_EMAIL, to_email, msg.as_string())
        server.quit()

        print("✅ EMAIL SENT SUCCESS")

    except Exception as e:
        print("❌ EMAIL ERROR:", e)


# 📧 VERIFY EMAIL
def send_verification_email(to_email: str, token: str):

    # 🔥 IMPORTANT CHANGE → FRONTEND ROUTE
    link = f"{BASE_URL}/verify-email?token={token}"

    html = f"""
    <div style="font-family: Arial; padding: 30px; background:#f4f6f9;">
        <div style="max-width:500px; margin:auto; background:white; padding:25px; border-radius:12px; text-align:center;">
            
            <h2 style="color:#333;">Welcome to LapCare Hub 🚀</h2>

            <p style="color:#555;">
                Verify your email to activate your account
            </p>

            <a href="{link}" 
               style="display:inline-block;
               margin-top:20px;
               padding:12px 22px;
               background:#facc15;
               color:black;
               text-decoration:none;
               border-radius:8px;
               font-weight:bold;">
               Verify Email
            </a>

            <p style="margin-top:20px; font-size:12px; color:gray;">
                If the button doesn't work, copy this link:
            </p>

            <p style="font-size:12px; word-break:break-all;">
                {link}
            </p>

            <p style="margin-top:20px; font-size:12px; color:gray;">
                If you didn’t register, ignore this email.
            </p>
        </div>
    </div>
    """

    send_email(to_email, "Verify your account - LapCare Hub", html)