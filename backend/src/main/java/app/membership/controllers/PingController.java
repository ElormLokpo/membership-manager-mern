package app.membership.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/membership")
public class PingController {

    @GetMapping("ping")
    public ResponseEntity<String> pingServer() {
        return ResponseEntity.ok("Ping server successful.");
    }

}
