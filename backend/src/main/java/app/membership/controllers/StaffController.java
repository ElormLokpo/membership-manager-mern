package app.membership.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import app.membership.dtos.DataResponseDto;
import app.membership.dtos.GetResponseDto;
import app.membership.dtos.staffDto.CreateStaffDto;
import app.membership.models.UserModel;
import app.membership.services.StaffService;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/membership/admin")
@PreAuthorize("hasRole('ADMIN')")
public class StaffController {

    public StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping("staff/all")
    public ResponseEntity<GetResponseDto> getAllStaff(
            @RequestParam(value = "sortBy", defaultValue = "fullname", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) Integer pageNo) {

        return ResponseEntity.ok(GetResponseDto.builder()
                .success(true)
                .message("Staff query successful")
                .data(staffService.getAllStaff(sortBy, sortDir, pageSize, pageNo))
                .pageNo(pageNo)
                .pageSize(pageSize)
                .build());
    }

    @GetMapping("staff/{id}")
    public ResponseEntity<DataResponseDto> getStaff(
            @PathVariable UUID id) {

        return ResponseEntity.ok(DataResponseDto.builder()
                .success(true)
                .message("Staff query successful")
                .data(staffService.getStaff(id))
                .build());
    }

    @PostMapping("staff/add")
    public ResponseEntity<DataResponseDto> addStaff(
            @RequestBody CreateStaffDto staff) {

        return ResponseEntity.ok(DataResponseDto.builder()
                .success(true)
                .message("Staff added successfully")
                .data(staffService.addStaff(staff))
                .build());
    }

    @PatchMapping("staff/update")
    public ResponseEntity<DataResponseDto> updateStaff(
            @RequestBody UserModel staff) {

        return ResponseEntity.ok(DataResponseDto.builder()
                .success(true)
                .message("Staff update successful")
                .data(staffService.updateStaff(staff))
                .build());
    }

    @DeleteMapping("staff/delete/{id}")
    public ResponseEntity<DataResponseDto> deleteStaff(
            @PathVariable UUID id) {

        return ResponseEntity.ok(DataResponseDto.builder()
                .success(true)
                .message("Staff delete successful")
                .data(staffService.deleteStaff(id))
                .build());
    }

}
