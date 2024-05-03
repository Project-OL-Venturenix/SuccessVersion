package com.vtxlab.projectol.backend_oscar.payload.response.user;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.vtxlab.projectol.backend_oscar.entity.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String firstName;
  private String lastName;
  private String mobile;
  private String email;
  private String userName;
  private String password;
  private String company;
  private String title;
  private Integer py_experience;
  private Integer jv_experience;
  private Integer js_experience;
  private Integer cs_experience;
  private Integer sa_experience;
  private String status;
  private Set<Role> roles = new HashSet<>();
  private LocalDateTime createdDate;
  private Integer createdBy;
  private LocalDateTime updatedDate;
  private Integer updatedBy;
}
