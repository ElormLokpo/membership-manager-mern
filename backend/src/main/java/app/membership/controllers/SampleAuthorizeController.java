package app.membership.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/membership")
public class SampleAuthorizeController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("admin")
    public ResponseEntity<String> getSampleAdmin() {
        return ResponseEntity.ok("Authorization for admin check.");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FRONTDESK')")
    @GetMapping("frontdesk")
    public ResponseEntity<String> getSampleFrontdesk() {
        return ResponseEntity.ok("Authorization for frontdesk check.");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FRONTDESK','MEMBER')")
    @GetMapping("member")
    public ResponseEntity<String> getSampleMember() {
        return ResponseEntity.ok("Authorization for member check.");
    }

}
