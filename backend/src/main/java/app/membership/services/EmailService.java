package app.membership.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.Resource;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private ResourceLoader resourceLoader;
    
    public void sendVerifyMail(String emailTo, String verifyLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress("benedictdev@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, emailTo);
            message.setSubject("Verify email address");
            
            String htmlTemplate = loadTemplate();
            htmlTemplate = htmlTemplate.replace("verifyLink", verifyLink);
            
            message.setContent(htmlTemplate, "text/html; charset=utf-8");
            
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Error sending verification email to {}", emailTo, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
    
    private String loadTemplate() {
        try {
            Resource resource = resourceLoader.getResource("classpath:templates/verifyEmailTemplate.html");
            return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("Error loading email template", e);
            throw new RuntimeException("Failed to load email template", e);
        }
    }
}